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

# File system manangement
import os

import joblib
import requests
from time import time
import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.model_selection import KFold
import lightgbm as lgb

 
 # One-hot encoding for categorical columns with get_dummies
def one_hot_encoder(df, nan_as_category = True):
    original_columns = list(df.columns)
    categorical_columns = [col for col in df.columns if ((df[col].dtype == 'object') or (df[col].dtype == 'bool'))]
    df = pd.get_dummies(df, columns= categorical_columns, dummy_na= nan_as_category)
    new_columns = [c for c in df.columns if c not in original_columns]
    return df, new_columns

    
class appTrainTransformer_Lei(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, X, y=None):
        # DAYS_EMPLOYED_anom
        X['DAYS_EMPLOYED_anom'] = (X['DAYS_EMPLOYED'] == 365243)
        X['DAYS_EMPLOYED'].replace(365243, np.nan, inplace = True)

        # Some simple new features (percentages)
        X['DAYS_EMPLOYED_PERC'] = X['DAYS_EMPLOYED'] / X['DAYS_BIRTH']
        X['INCOME_CREDIT_PERC'] = X['AMT_INCOME_TOTAL'] / X['AMT_CREDIT']
        X['INCOME_PER_PERSON'] = X['AMT_INCOME_TOTAL'] / X['CNT_FAM_MEMBERS']
        X['ANNUITY_INCOME_PERC'] = X['AMT_ANNUITY'] / X['AMT_INCOME_TOTAL']
        X['PAYMENT_RATE'] = X['AMT_ANNUITY'] / X['AMT_CREDIT']
        X.replace([np.inf, -np.inf], np.nan, inplace=True)
        return X

class dropTransformer_Lei(BaseEstimator, TransformerMixin):
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
        X_copy.replace([np.inf, -np.inf], np.nan, inplace=True)
        return X_copy

class bureauTransformer_Lei(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, bureauinfo, bbinfo, y=None):
        # app_train treatment
        bb_copy, bb_cat = one_hot_encoder(bbinfo, True)
        bureau_copy, bureau_cat = one_hot_encoder(bureauinfo, True)

        # bb Treatment
        bb_aggregations = {'MONTHS_BALANCE': ['min', 'max', 'size']}
        for col in bb_cat:
            bb_aggregations[col] = ['mean']
        bb_agg = bb_copy.groupby('SK_ID_BUREAU').agg(bb_aggregations)
        bb_agg.columns = pd.Index([e[0] + "_" + e[1].upper() for e in bb_agg.columns.tolist()])
        bureau_copy = bureau_copy.join(bb_agg, how='left', on='SK_ID_BUREAU')
        bureau_copy.drop(['SK_ID_BUREAU'], axis=1, inplace= True)

        ## bureau Treatment
        # Bureau and bureau_balance numeric features
        num_aggregations = {
            'DAYS_CREDIT': ['min', 'max', 'mean', 'var'],
            'DAYS_CREDIT_ENDDATE': ['min', 'max', 'mean'],
            'DAYS_CREDIT_UPDATE': ['mean'],
            'CREDIT_DAY_OVERDUE': ['max', 'mean'],
            'AMT_CREDIT_MAX_OVERDUE': ['mean'],
            'AMT_CREDIT_SUM': ['max', 'mean', 'sum'],
            'AMT_CREDIT_SUM_DEBT': ['max', 'mean', 'sum'],
            'AMT_CREDIT_SUM_OVERDUE': ['mean'],
            'AMT_CREDIT_SUM_LIMIT': ['mean', 'sum'],
            'AMT_ANNUITY': ['max', 'mean'],
            'CNT_CREDIT_PROLONG': ['sum'],
            'MONTHS_BALANCE_MIN': ['min'],
            'MONTHS_BALANCE_MAX': ['max'],
            'MONTHS_BALANCE_SIZE': ['mean', 'sum']
        }

        # Bureau and bureau_balance categorical features
        cat_aggregations = {}
        for cat in bureau_cat: 
            cat_aggregations[cat] = ['mean']
        for cat in bb_cat: 
            cat_aggregations[cat + "_MEAN"] = ['mean']

        bureau_agg = bureau_copy.groupby('SK_ID_CURR').agg({**num_aggregations, **cat_aggregations})
        bureau_agg.columns = pd.Index(['BURO_' + e[0] + "_" + e[1].upper() for e in bureau_agg.columns.tolist()])

        # Bureau: Active credits - using only numerical aggregations
        active = bureau_copy[bureau_copy['CREDIT_ACTIVE_Active'] == 1]
        active_agg = active.groupby('SK_ID_CURR').agg(num_aggregations)
        active_agg.columns = pd.Index(['ACTIVE_' + e[0] + "_" + e[1].upper() for e in active_agg.columns.tolist()])
        bureau_agg = bureau_agg.join(active_agg, how='left', on='SK_ID_CURR')


        # Bureau: Closed credits - using only numerical aggregations
        closed = bureau_copy[bureau_copy['CREDIT_ACTIVE_Closed'] == 1]
        closed_agg = closed.groupby('SK_ID_CURR').agg(num_aggregations)
        closed_agg.columns = pd.Index(['CLOSED_' + e[0] + "_" + e[1].upper() for e in closed_agg.columns.tolist()])
        bureau_agg = bureau_agg.join(closed_agg, how='left', on='SK_ID_CURR')

        return bureau_agg

class previousTransformer_Lei(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, previnfo, y=None):

        prev, cat_cols = one_hot_encoder(previnfo, nan_as_category= True)
        # Days 365.243 values -> nan
        prev['DAYS_FIRST_DRAWING'].replace(365243, np.nan, inplace= True)
        prev['DAYS_FIRST_DUE'].replace(365243, np.nan, inplace= True)
        prev['DAYS_LAST_DUE_1ST_VERSION'].replace(365243, np.nan, inplace= True)
        prev['DAYS_LAST_DUE'].replace(365243, np.nan, inplace= True)
        prev['DAYS_TERMINATION'].replace(365243, np.nan, inplace= True)

        # Add feature: value ask / value received percentage
        prev['APP_CREDIT_PERC'] = prev['AMT_APPLICATION'] / prev['AMT_CREDIT']
        # Previous applications numeric features
        num_aggregations = {
            'AMT_ANNUITY': ['min', 'max', 'mean'],
            'AMT_APPLICATION': ['min', 'max', 'mean'],
            'AMT_CREDIT': ['min', 'max', 'mean'],
            'APP_CREDIT_PERC': ['min', 'max', 'mean', 'var'],
            'AMT_DOWN_PAYMENT': ['min', 'max', 'mean'],
            'AMT_GOODS_PRICE': ['min', 'max', 'mean'],
            'HOUR_APPR_PROCESS_START': ['min', 'max', 'mean'],
            'RATE_DOWN_PAYMENT': ['min', 'max', 'mean'],
            'DAYS_DECISION': ['min', 'max', 'mean'],
            'CNT_PAYMENT': ['mean', 'sum'],
        }
        # Previous applications categorical features
        cat_aggregations = {}
        for cat in cat_cols:
            cat_aggregations[cat] = ['mean']
        
        prev_agg = prev.groupby('SK_ID_CURR').agg({**num_aggregations, **cat_aggregations})
        prev_agg.columns = pd.Index(['PREV_' + e[0] + "_" + e[1].upper() for e in prev_agg.columns.tolist()])
        # Previous Applications: Approved Applications - only numerical features
        approved = prev[prev['NAME_CONTRACT_STATUS_Approved'] == 1]
        approved_agg = approved.groupby('SK_ID_CURR').agg(num_aggregations)
        approved_agg.columns = pd.Index(['APPROVED_' + e[0] + "_" + e[1].upper() for e in approved_agg.columns.tolist()])
        prev_agg = prev_agg.join(approved_agg, how='left', on='SK_ID_CURR')
        # Previous Applications: Refused Applications - only numerical features
        refused = prev[prev['NAME_CONTRACT_STATUS_Refused'] == 1]
        refused_agg = refused.groupby('SK_ID_CURR').agg(num_aggregations)
        refused_agg.columns = pd.Index(['REFUSED_' + e[0] + "_" + e[1].upper() for e in refused_agg.columns.tolist()])
        prev_agg = prev_agg.join(refused_agg, how='left', on='SK_ID_CURR')

        return prev_agg

class posTransformer_Lei(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, posinfo, y=None):

        pos, cat_cols = one_hot_encoder(posinfo, True)
        # Features
        aggregations = {
            'MONTHS_BALANCE': ['max', 'mean', 'size'],
            'SK_DPD': ['max', 'mean'],
            'SK_DPD_DEF': ['max', 'mean']
        }
        for cat in cat_cols:
            aggregations[cat] = ['mean']
        
        pos_agg = pos.groupby('SK_ID_CURR').agg(aggregations)
        pos_agg.columns = pd.Index(['POS_' + e[0] + "_" + e[1].upper() for e in pos_agg.columns.tolist()])
        # Count pos cash accounts
        pos_agg['POS_COUNT'] = pos.groupby('SK_ID_CURR').size()

        return pos_agg
    
class installmentsTransformer_Lei(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, insinfo, y=None):
        ins, cat_cols = one_hot_encoder(insinfo, True)

        # Percentage and difference paid in each installment (amount paid and installment value)
        ins['PAYMENT_PERC'] = ins['AMT_PAYMENT'] / ins['AMT_INSTALMENT']
        ins['PAYMENT_DIFF'] = ins['AMT_INSTALMENT'] - ins['AMT_PAYMENT']
        # Days past due and days before due (no negative values)
        ins['DPD'] = ins['DAYS_ENTRY_PAYMENT'] - ins['DAYS_INSTALMENT']
        ins['DBD'] = ins['DAYS_INSTALMENT'] - ins['DAYS_ENTRY_PAYMENT']
        ins['DPD'] = ins['DPD'].apply(lambda x: x if x > 0 else 0)
        ins['DBD'] = ins['DBD'].apply(lambda x: x if x > 0 else 0)
        # Features: Perform aggregations
        aggregations = {
            'NUM_INSTALMENT_VERSION': ['nunique'],
            'DPD': ['max', 'mean', 'sum'],
            'DBD': ['max', 'mean', 'sum'],
            'PAYMENT_PERC': ['max', 'mean', 'sum', 'var'],
            'PAYMENT_DIFF': ['max', 'mean', 'sum', 'var'],
            'AMT_INSTALMENT': ['max', 'mean', 'sum'],
            'AMT_PAYMENT': ['min', 'max', 'mean', 'sum'],
            'DAYS_ENTRY_PAYMENT': ['max', 'mean', 'sum']
        }
        for cat in cat_cols:
            aggregations[cat] = ['mean']
        ins_agg = ins.groupby('SK_ID_CURR').agg(aggregations)
        ins_agg.columns = pd.Index(['INSTAL_' + e[0] + "_" + e[1].upper() for e in ins_agg.columns.tolist()])
        # Count installments accounts
        ins_agg['INSTAL_COUNT'] = ins.groupby('SK_ID_CURR').size()
        return ins_agg

class ccTransformer_Lei(BaseEstimator, TransformerMixin):
    def __init__(self):
        return None
 
    def fit(self, X, y=None):
        return self
 
    def transform(self, ccinfo, y=None):
        cc, cat_cols = one_hot_encoder(ccinfo, True)
        # General aggregations
        cc.drop(['SK_ID_PREV'], axis= 1, inplace = True)
        cc_agg = cc.groupby('SK_ID_CURR').agg(['min', 'max', 'mean', 'sum', 'var'])
        cc_agg.columns = pd.Index(['CC_' + e[0] + "_" + e[1].upper() for e in cc_agg.columns.tolist()])
        # Count credit card lines
        cc_agg['CC_COUNT'] = cc.groupby('SK_ID_CURR').size()
        return cc_agg

class kfoldlgb(BaseEstimator, TransformerMixin):
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
        feature['feature_lei'] = X_feature
        feature.to_csv('feature_lei.csv', index = False)
        return self
 
    def predict_proba(self, X, y=None):
        for i in range(self.k):
            tmp = self.clf[i].predict_proba(X)
            if i!=0:
                result = result + tmp/self.k
            else:
                result = tmp/self.k
        return result