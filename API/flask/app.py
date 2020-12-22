from flask import Flask, request, jsonify
import numpy as np
import joblib
import pandas as pd 
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, MinMaxScaler, MaxAbsScaler, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer as Imputer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import KFold
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.linear_model import LogisticRegressionCV
import lightgbm as lgb
from util_Lei import appTrainTransformer_Lei, dropTransformer_Lei, bureauTransformer_Lei, previousTransformer_Lei, posTransformer_Lei, installmentsTransformer_Lei, ccTransformer_Lei, kfoldlgb 
from util_DL import appTrainTransformer_DL, dropTransformer_DL, bureauTransformer_DL, bbTransformer_DL, previousTransformer_DL, posTransformer_DL, installmentsTransformer_DL, ccTransformer_DL, kfoldlgb_DL, dropZeroImportanceTransformer_DL
from util_LF import appTrainTransformer_Lefei, dropTransformer_Lefei, bureauTransformer_Lefei, previousTransformer_Lefei, posTransformer_Lefei, installmentsTransformer_Lefei, ccTransformer_Lefei, kfoldlgb_Lefei

import time

bureau = pd.read_csv('./API/flask/input/bureau.csv')
bb = pd.read_csv('./API/flask/input/bureau_balance.csv')
prev = pd.read_csv('./API/flask/input/previous_application.csv')
cc = pd.read_csv('./API/flask/input/credit_card_balance.csv')
ins = pd.read_csv('./API/flask/input/installments_payments.csv')
pos = pd.read_csv('./API/flask/input/POS_CASH_balance.csv')

pipeline_Lei = joblib.load('./API/flask/files/preprocess_Lei.joblib')
clf_Lei = joblib.load('./API/flask/files/clf_Lei.joblib')

pipeline_DL = joblib.load('./API/flask/files/preprocess_DL.joblib')
clf_DL = joblib.load('./API/flask/files/clf_DL.joblib')

pipeline_LF = joblib.load('./API/flask/files/preprocess_Lefei.joblib')
clf_LF = joblib.load('./API/flask/files/clf_Lefei.joblib')


clf_model2 = joblib.load('./API/flask/files/clf_model2.joblib')

bur_Lei = bureauTransformer_Lei().transform(bureau, bb)
pre_Lei = previousTransformer_Lei().transform(prev)
pos_Lei = posTransformer_Lei().transform(pos)
cc_Lei = ccTransformer_Lei().transform(cc)
ins_Lei = installmentsTransformer_Lei().transform(ins)

bur_DL = bureauTransformer_DL().transform(bureau)
bb_DL = bbTransformer_DL().transform(bureau, bb)
pre_DL = previousTransformer_DL().transform(prev)
pos_DL = posTransformer_DL().transform(pos)
cc_DL = ccTransformer_DL().transform(cc)
ins_DL = installmentsTransformer_DL().transform(ins)

bur_LF = bureauTransformer_Lefei().transform(bureau, bb)
pre_LF = previousTransformer_Lefei().transform(prev)
pos_LF = posTransformer_Lefei().transform(pos)
cc_LF = ccTransformer_Lefei().transform(cc)
ins_LF = installmentsTransformer_Lefei().transform(ins)

def join_Lei(X):
    X = X.join(bur_Lei, how='left', on='SK_ID_CURR')
    X = X.join(pre_Lei, how='left', on='SK_ID_CURR')
    X = X.join(pos_Lei, how='left', on='SK_ID_CURR')
    X = X.join(cc_Lei, how='left', on='SK_ID_CURR')
    X = X.join(ins_Lei, how='left', on='SK_ID_CURR')
    return X

def join_DL(X):
    X = X.join(bur_DL, how='left', on='SK_ID_CURR')
    X = X.join(bb_DL, how='left', on='SK_ID_CURR')
    X = X.join(pre_DL, how='left', on='SK_ID_CURR')
    X = X.join(pos_DL, how='left', on='SK_ID_CURR')
    X = X.join(cc_DL, how='left', on='SK_ID_CURR')
    X = X.join(ins_DL, how='left', on='SK_ID_CURR')
    return X

def join_LF(X):
    X = X.join(bur_LF, how='left', on='SK_ID_CURR')
    X = X.join(pre_LF, how='left', on='SK_ID_CURR')
    X = X.join(pos_LF, how='left', on='SK_ID_CURR')
    X = X.join(cc_LF, how='left', on='SK_ID_CURR')
    X = X.join(ins_LF, how='left', on='SK_ID_CURR')
    return X

app = Flask(__name__)

@app.route("/", methods=['POST'])
def call():

    payload = request.json # 直接读到的是dictionary
    x = (type(payload).__name__ == 'dict')

    x_Lei = join_Lei(pd.DataFrame.from_dict([payload]))
    x_DL = join_DL(pd.DataFrame.from_dict([payload]))
    x_LF = join_LF(pd.DataFrame.from_dict([payload]))

    model1_Lei = clf_Lei.predict_proba(pipeline_Lei.transform(x_Lei))[0][1]
    model1_DL = clf_DL.predict_proba(pipeline_DL.transform(x_DL))[0][1] 
    model1_LF = clf_LF.predict_proba(pipeline_LF.transform(x_LF))[0][1] 

    feature = pd.DataFrame.from_dict([payload])[['SK_ID_CURR']]
    feature['feature_lei'] = model1_Lei
    feature['feature_dl'] = model1_DL
    feature['feature_lf'] = model1_LF
    feature.drop(['SK_ID_CURR'], axis= 1, inplace = True)

    Y = clf_model2.predict_proba(feature)
    return jsonify({'predict': Y[0][1]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)