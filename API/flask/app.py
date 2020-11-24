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
import lightgbm as lgb
from util import appTrainTransformer, dropTransformer, bureauTransformer, previousTransformer, posTransformer, installmentsTransformer, ccTransformer, kfoldlgb
import time

pipeline = joblib.load('./API/flask/preprocess_model.joblib')
clf = joblib.load('./API/flask/clf.joblib')
bur = bureauTransformer().transform(pd.read_csv('./API/flask/input/bureau.csv'), pd.read_csv('./API/flask/input/bureau_balance.csv'))
pre = previousTransformer().transform(pd.read_csv('./API/flask/input/previous_application.csv'))
pos = posTransformer().transform(pd.read_csv('./API/flask/input/POS_CASH_balance.csv'))
cc = ccTransformer().transform(pd.read_csv('./API/flask/input/credit_card_balance.csv'))
ins = installmentsTransformer().transform(pd.read_csv('./API/flask/input/installments_payments.csv'))

def join(X):
    X = X.join(bur, how='left', on='SK_ID_CURR')
    X = X.join(pre, how='left', on='SK_ID_CURR')
    X = X.join(pos, how='left', on='SK_ID_CURR')
    X = X.join(cc, how='left', on='SK_ID_CURR')
    X = X.join(ins, how='left', on='SK_ID_CURR')
    return X

app = Flask(__name__)

@app.route("/", methods=['POST'])
def call():

    payload = request.json # 直接读到的是dictionary
    x = (type(payload).__name__ == 'dict')
    pdpayload = join(pd.DataFrame.from_dict([payload]))
    data = pipeline.transform(pdpayload)
    Y = clf.predict_proba(data)
    return jsonify({'predict': Y[0][1]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)