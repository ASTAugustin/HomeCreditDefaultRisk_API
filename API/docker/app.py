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

pipeline = None
clf = None

app = Flask(__name__)

@app.route("/", methods=['POST'])
def call():
    # global pipeline
    # global clf

    # bureau = pd.read_csv('./bureau.csv')
    # bb = pd.read_csv('./bureau_balance.csv')
    # prev = pd.read_csv('./previous_application.csv')
    # cc = pd.read_csv('./credit_card_balance.csv')
    # ins = pd.read_csv('./installments_payments.csv')
    # pos = pd.read_csv('./POS_CASH_balance.csv')

    # pipeline = joblib.load('./preprocess_model.joblib')
    # clf = joblib.load('./clf.joblib')

    # payload = request.json # 直接读到的是dictionary
    # x = (type(payload).__name__ == 'dict')
    # pdpayload = pd.DataFrame.from_dict([payload])
    # data = pipeline.transform(pdpayload)
    # Y = clf.predict_proba(data)
    return jsonify({'predict': 0}) #jsonify({'predict': Y[0][1]})


if __name__ == "__main__":
    app.run(port="8080")
