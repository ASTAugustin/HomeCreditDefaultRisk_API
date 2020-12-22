#Feature engineering script -- Donglin Chen
# %%
# numpy and pandas for data manipulation
import numpy as np
import pandas as pd 

# sklearn preprocessing for dealing with categorical variables
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import MinMaxScaler, MaxAbsScaler, StandardScaler
from sklearn.impute import SimpleImputer as Imputer
from sklearn.linear_model import LogisticRegression
from sklearn.base import BaseEstimator, TransformerMixin

# File system manangement
import os

import joblib
import requests
from time import time
import gc

from sklearn.model_selection import KFold
from sklearn.model_selection import train_test_split
import lightgbm as lgb
# One-hot encoding for categorical columns with get_dummies
def one_hot_encoder_DL(df, nan_as_category = True):
    original_columns = list(df.columns)
    categorical_columns = [col for col in df.columns if ((df[col].dtype == 'object') or (df[col].dtype == 'bool'))]
    df = pd.get_dummies(df, columns= categorical_columns, dummy_na= nan_as_category)
    new_columns = [c for c in df.columns if c not in original_columns]
    return df, new_columns

# Function to calculate correlations with the target for a dataframe
def target_corrs_DL(df):

    # List of correlations
    corrs = []

    # Iterate through the columns 
    for col in df.columns:
        print(col)
        # Skip the target column
        if col != 'TARGET':
            # Calculate correlation with the target
            corr = df['TARGET'].corr(df[col])

            # Append the list as a tuple
            corrs.append((col, corr))
            
    # Sort by absolute magnitude of correlations
    corrs = sorted(corrs, key = lambda x: abs(x[1]), reverse = True)
    
    return corrs

def count_categorical_DL(df, group_var, df_name):
    # Select the categorical columns
    categorical = pd.get_dummies(df.select_dtypes('object'))

    # Make sure to put the identifying id on the column
    categorical[group_var] = df[group_var]

    # Groupby the group var and calculate the sum and mean
    categorical = categorical.groupby(group_var).agg(['sum', 'mean'])
    
    column_names = []
    
    # Iterate through the columns in level 0
    for var in categorical.columns.levels[0]:
        # Iterate through the stats in level 1
        for stat in ['count', 'count_norm']:
            # Make a new column name
            column_names.append('%s_%s_%s' % (df_name, var, stat))
    
    categorical.columns = column_names
    
    return categorical

def agg_categorical_DL(df, parent_var, df_name):
    # Select the categorical columns
    categorical = pd.get_dummies(df.select_dtypes('object'))

    # Make sure to put the identifying id on the column
    categorical[parent_var] = df[parent_var]

    # Groupby the group var and calculate the sum and mean
    categorical = categorical.groupby(parent_var).agg(['sum', 'count', 'mean'])
    
    column_names = []
    
    # Iterate through the columns in level 0
    for var in categorical.columns.levels[0]:
        # Iterate through the stats in level 1
        for stat in ['sum', 'count', 'mean']:
            # Make a new column name
            column_names.append('%s_%s_%s' % (df_name, var, stat))
    
    categorical.columns = column_names
    
    # Remove duplicate columns by values
    _, idx = np.unique(categorical, axis = 1, return_index = True)
    categorical = categorical.iloc[:, idx]
    
    return categorical


def agg_numeric_DL(df, parent_var, df_name):
    # Remove id variables other than grouping variable
    for col in df:
        if col != parent_var and 'SK_ID' in col:
            df = df.drop(columns = col)
            
    # Only want the numeric variables
    parent_ids = df[parent_var].copy()
    numeric_df = df.select_dtypes('number').copy()
    numeric_df[parent_var] = parent_ids

    # Group by the specified variable and calculate the statistics
    agg = numeric_df.groupby(parent_var).agg(['count', 'mean', 'max', 'min', 'sum'])

    # Need to create new column names
    columns = []

    # Iterate through the variables names
    for var in agg.columns.levels[0]:
        if var != parent_var:
            # Iterate through the stat names
            for stat in agg.columns.levels[1]:
                # Make a new column name for the variable and stat
                columns.append('%s_%s_%s' % (df_name, var, stat))
    
    agg.columns = columns
    
    # Remove the columns with all redundant values
    _, idx = np.unique(agg, axis = 1, return_index=True)
    agg = agg.iloc[:, idx]
    
    return agg


def aggregate_client_DL(df, group_vars, df_names):
    # Aggregate the numeric columns
    df_agg = agg_numeric_DL(df, parent_var = group_vars[0], df_name = df_names[0])
    
    # If there are categorical variables
    if any(df.dtypes == 'object'):
    
        # Count the categorical columns
        df_counts = agg_categorical_DL(df, parent_var = group_vars[0], df_name = df_names[0])

        # Merge the numeric and categorical
        df_by_loan = df_counts.merge(df_agg, on = group_vars[0], how = 'outer')

        gc.enable()
        del df_agg, df_counts
        gc.collect()

        # Merge to get the client id in dataframe
        df_by_loan = df_by_loan.merge(df[[group_vars[0], group_vars[1]]], on = group_vars[0], how = 'left')

        # Remove the loan id
        df_by_loan = df_by_loan.drop(columns = [group_vars[0]])

        # Aggregate numeric stats by column
        df_by_client = agg_numeric_DL(df_by_loan, parent_var = group_vars[1], df_name = df_names[1])

        
    # No categorical variables
    else:
        # Merge to get the client id in dataframe
        df_by_loan = df_agg.merge(df[[group_vars[0], group_vars[1]]], on = group_vars[0], how = 'left')
        
        gc.enable()
        del df_agg
        gc.collect()
        
        # Remove the loan id
        df_by_loan = df_by_loan.drop(columns = [group_vars[0]])
        
        # Aggregate numeric stats by column
        df_by_client = agg_numeric_DL(df_by_loan, parent_var = group_vars[1], df_name = df_names[1])
        
    # Memory management
    gc.enable()
    del df, df_by_loan
    gc.collect()

    return df_by_client


# %%
def identify_zero_importance_features_DL(train, train_labels, iterations = 2):
    # Initialize an empty array to hold feature importances
    feature_importances = np.zeros(train.shape[1])

    # Create the model with several hyperparameters
    model = lgb.LGBMClassifier(objective='binary', boosting_type = 'goss', n_estimators = 10000, class_weight = 'balanced')
    
    # Fit the model multiple times to avoid overfitting
    for i in range(iterations):

        # Split into training and validation set
        train_features, valid_features, train_y, valid_y = train_test_split(train, train_labels, test_size = 0.25, random_state = i)

        # Train using early stopping
        model.fit(train_features, train_y, early_stopping_rounds=100, eval_set = [(valid_features, valid_y)], eval_metric = 'auc', verbose = 200)

        # Record the feature importances
        feature_importances += model.feature_importances_ / iterations
    
    zero_features = list(np.where(feature_importances==0.0)[0])
    # print('\nThere are %d features with 0.0 importance' % len(zero_features))
    
    return zero_features, feature_importances

# zero_features = [1, 12, 15, 17, 22, 24, 71, 74, 79, 81, 82, 83, 84, 86, 87, 88, 89, 92, 94, 96, 97, 98, 99, 119, 120, 123, 143, 160, 161, 164, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 178, 179, 184, 185, 186, 187, 188, 189, 190, 191, 192, 196, 197, 200, 201, 202, 203, 218, 224, 225, 226, 227, 229, 235, 237, 240, 241, 242, 243, 244, 245, 277, 280, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 303, 304, 305, 307, 308, 309, 310, 311, 313, 314, 315, 317, 318, 319, 320, 321, 323, 325, 326, 327, 328, 329, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 351, 352, 353, 354, 355, 357, 359, 360, 361, 362, 363, 365, 367, 368, 370, 371, 373, 375, 376, 377, 379, 381, 385, 386, 391, 392, 393, 394, 395, 397, 401, 403, 405, 406, 407, 411, 413, 418, 419, 421, 423, 429, 430, 431, 435, 442, 457, 458, 463, 464, 467, 473, 475, 479, 500, 502, 503, 508, 511, 513, 514, 519, 520, 521, 523, 551, 558, 565, 566, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 613, 614, 615, 616, 617, 618, 619, 620, 623, 627, 628, 629, 630, 631, 641, 642, 647, 650, 665, 683, 697, 700, 701, 707, 708, 712, 733, 764, 765, 767, 769, 780, 783, 788, 792, 796, 838, 839, 843, 854, 855, 867, 870, 872, 873, 874, 877, 878, 879, 881, 882, 883, 885, 888, 889, 893, 900, 901, 902, 907, 909, 910, 913, 915, 918, 920, 921, 923, 924, 925, 927, 928, 931, 932, 934, 935, 937, 940, 942, 943, 944, 945, 946, 947, 948, 949, 950, 952, 953, 955, 956, 957, 958, 959, 961, 964, 966, 967, 969, 971, 972, 974, 978, 979, 981, 982, 983, 984, 986, 987, 989, 990, 991, 992, 994, 997, 998, 1000, 1002, 1003, 1004, 1007, 1008, 1009, 1010, 1012, 1013, 1014, 1015]

class dropZeroImportanceTransformer_DL(BaseEstimator, TransformerMixin):
    def __init__(self, zero_import):
        self.zero_import = zero_import
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, X_copy, y=None):
        X_copy = np.delete(X_copy,self.zero_import, axis=1)
        return X_copy


# %%
class appTrainTransformer_DL(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, X, y=None):
        # Anoms
        X['DAYS_EMPLOYED_anom'] = (X['DAYS_EMPLOYED'] == 365243)
        X['ORGANIZATION_TYPE_anom'] = (X['ORGANIZATION_TYPE'] == 'XNA')

        X['CODE_GENDER'].replace('XNA', np.nan, inplace=True)
        X['DAYS_EMPLOYED'].replace(365243, np.nan, inplace=True)
        X['NAME_FAMILY_STATUS'].replace('Unknown', np.nan, inplace=True)
        X['ORGANIZATION_TYPE'].replace('XNA', np.nan, inplace=True)
        X['DAYS_LAST_PHONE_CHANGE'].replace(0, np.nan, inplace=True)

        # Hand crafted features
        X['long_employment'] = (X['DAYS_EMPLOYED'] < -2000).astype(int)
        X['retirement_age'] = (X['DAYS_BIRTH'] < -14000).astype(int)

        X['annuity_income_percentage'] = X['AMT_ANNUITY'] / X['AMT_INCOME_TOTAL']
        X['car_to_birth_ratio'] = X['OWN_CAR_AGE'] / X['DAYS_BIRTH']
        X['car_to_employ_ratio'] = X['OWN_CAR_AGE'] / X['DAYS_EMPLOYED']
        X['children_ratio'] = X['CNT_CHILDREN'] / X['CNT_FAM_MEMBERS']
        X['credit_to_annuity_ratio'] = X['AMT_CREDIT'] / X['AMT_ANNUITY']
        X['credit_to_goods_ratio'] = X['AMT_CREDIT'] / X['AMT_GOODS_PRICE']
        X['credit_to_income_ratio'] = X['AMT_CREDIT'] / X['AMT_INCOME_TOTAL']
        X['days_employed_percentage'] = X['DAYS_EMPLOYED'] / X['DAYS_BIRTH']
        X['income_credit_percentage'] = X['AMT_INCOME_TOTAL'] / X['AMT_CREDIT']
        X['income_per_child'] = X['AMT_INCOME_TOTAL'] / (1 + X['CNT_CHILDREN'])
        X['income_per_person'] = X['AMT_INCOME_TOTAL'] / X['CNT_FAM_MEMBERS']
        X['payment_rate'] = X['AMT_ANNUITY'] / X['AMT_CREDIT']
        X['phone_to_birth_ratio'] = X['DAYS_LAST_PHONE_CHANGE'] / X['DAYS_BIRTH']
        X['phone_to_employ_ratio'] = X['DAYS_LAST_PHONE_CHANGE'] / X['DAYS_EMPLOYED']

        X['cnt_non_child'] = X['CNT_FAM_MEMBERS'] - X['CNT_CHILDREN']
        X['child_to_non_child_ratio'] = X['CNT_CHILDREN'] / X['cnt_non_child']
        X['income_per_non_child'] = X['AMT_INCOME_TOTAL'] / X['cnt_non_child']
        X['credit_per_person'] = X['AMT_CREDIT'] / X['CNT_FAM_MEMBERS']
        X['credit_per_child'] = X['AMT_CREDIT'] / (1 + X['CNT_CHILDREN'])
        X['credit_per_non_child'] = X['AMT_CREDIT'] / X['cnt_non_child']

        # External sources
        X['external_sources_weighted'] = X.EXT_SOURCE_1 * 2 + X.EXT_SOURCE_2 * 3 + X.EXT_SOURCE_3 * 4
        for function_name in ['min', 'max', 'sum', 'mean', 'nanmedian']:
            X['external_sources_{}'.format(function_name)] = eval('np.{}'.format(function_name))(X[['EXT_SOURCE_1', 'EXT_SOURCE_2', 'EXT_SOURCE_3']], axis=1)

        X.replace(np.inf, np.nan, inplace = True)
        X.replace(-np.inf, np.nan, inplace = True)

        return X


class dropTransformer_DL(BaseEstimator, TransformerMixin):
    def __init__(self, rate):
        self.rate = rate
        self.drop = []
        return None
 
    def fit(self, X, y=None):
        drop = []
        for col in X:
            if X[col].isna().sum() > self.rate * X.shape[0]:
                drop.append(col)
        self.drop = drop
        return self
 
    def transform(self, X_copy, y=None):
        X_copy.drop(self.drop, axis = 1, inplace = True)
        return X_copy


class bureauTransformer_DL(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, bureauinfo, y=None):
        #numeric
        bureau_agg = agg_numeric_DL(bureauinfo.drop(columns = ['SK_ID_BUREAU']), 'SK_ID_CURR', df_name = 'bureau')
        #categorial
        bureau_counts = count_categorical_DL(bureauinfo, 'SK_ID_CURR', df_name = 'bureau')
        bureau_res = bureau_agg.join(bureau_counts, how='left', on='SK_ID_CURR')

        return bureau_res


class bbTransformer_DL(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, bureauinfo, bbinfo, y=None):
        # Counts of each type of status for each previous loan
        bureau_balance_counts = count_categorical_DL(bbinfo, 'SK_ID_BUREAU', df_name = 'bureau_balance')
        bureau_balance_agg = agg_numeric_DL(bbinfo, 'SK_ID_BUREAU', df_name = 'bb')
        # Dataframe grouped by the loan 把上两个结果merge
        bureau_by_loan = bureau_balance_agg.merge(bureau_balance_counts, right_index = True, left_on = 'SK_ID_BUREAU', how = 'outer')

        # Merge to include the SK_ID_CURR
        bureau_by_loan = bureau_by_loan.merge(bureauinfo[['SK_ID_BUREAU', 'SK_ID_CURR']], on = 'SK_ID_BUREAU', how = 'left')
        bureau_balance_by_client = agg_numeric_DL(bureau_by_loan.drop(columns = ['SK_ID_BUREAU']), 'SK_ID_CURR', df_name = 'client')

        return bureau_balance_by_client 

#把app_train join上bureau和bb的结果共得到333features

class previousTransformer_DL(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, previnfo, y=None):
        '''
        prev, cat_cols = one_hot_encoder(previnfo, nan_as_category= True)
        # Days 365.243 values -> nan
        prev['DAYS_FIRST_DRAWING'].replace(365243, np.nan, inplace= True)
        prev['DAYS_FIRST_DUE'].replace(365243, np.nan, inplace= True)
        prev['DAYS_LAST_DUE_1ST_VERSION'].replace(365243, np.nan, inplace= True)
        prev['DAYS_LAST_DUE'].replace(365243, np.nan, inplace= True)
        prev['DAYS_TERMINATION'].replace(365243, np.nan, inplace= True)
        '''
        previous_agg = agg_numeric_DL(previnfo, 'SK_ID_CURR', 'previous')
        previous_counts = agg_categorical_DL(previnfo, 'SK_ID_CURR', 'previous')
        previous_res = previous_agg.join(previous_counts, how='left', on='SK_ID_CURR')

        return previous_res


class posTransformer_DL(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, posinfo, y=None):
        cash_by_client = aggregate_client_DL(posinfo, group_vars = ['SK_ID_PREV', 'SK_ID_CURR'], df_names = ['cash', 'client'])

        return cash_by_client #165features


class ccTransformer_DL(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, ccinfo, y=None):
        credit_by_client = aggregate_client_DL(ccinfo, group_vars = ['SK_ID_PREV', 'SK_ID_CURR'], df_names = ['credit', 'client'])
        return credit_by_client #381features


class installmentsTransformer_DL(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, insinfo, y=None):
        installments_by_client = aggregate_client_DL(insinfo, group_vars = ['SK_ID_PREV', 'SK_ID_CURR'], df_names = ['installments', 'client'])

        return installments_by_client #106个features

class kfoldlgb_DL(BaseEstimator, TransformerMixin):
    def __init__(self, k):
        self.k = k
        self.clf = []
        return None
 
    def fit(self, X, y=None):
        kf = KFold(n_splits=self.k)
        X_feature = np.zeros(y.shape[0])
        for train_index, test_index in kf.split(X):
            X_train, X_test = X[train_index], X[test_index]
            y_train, y_test = y[train_index], y[test_index]
            gbm = lgb.LGBMClassifier(
                nthread=4,
                n_estimators=10000,
                learning_rate=0.02,
                num_leaves=34,
                colsample_bytree=0.9497036,
                subsample=0.8715623,
                max_depth=8,
                reg_alpha=0.041545473,
                reg_lambda=0.0735294,
                min_split_gain=0.0222415,
                min_child_weight=39.3259775,
                silent=-1,
                verbose=-1, )
            gbm.fit(X_train, y_train, eval_set=[(X_train, y_train), (X_test, y_test)], eval_metric= 'auc', verbose= 50, early_stopping_rounds= 200)
            self.clf.append(gbm)
            X_feature[test_index] = gbm.predict_proba(X_test)[:, 1]

        feature = app_train[['SK_ID_CURR']]
        feature['feature_dl'] = X_feature
        feature.to_csv('feature_dl.csv', index = False)
        return self
 
    def predict_proba(self, X, y=None):
        for i in range(self.k):
            tmp = self.clf[i].predict_proba(X)
            if i!=0:
                result = result + tmp/self.k
            else:
                result = tmp/self.k
        return result