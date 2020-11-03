from flask import Flask, request, jsonify
import numpy as np
import joblib
import pandas as pd 
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, MinMaxScaler, MaxAbsScaler, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer as Imputer
from sklearn.linear_model import LogisticRegression

pipeline = None

app = Flask(__name__)

@app.route("/", methods=['POST'])
def call():
    global pipeline

    pipeline = joblib.load('./sklearn_model.joblib')
    payload = request.json # 直接读到的是dictionary
    x = (type(payload).__name__ == 'dict')
    pdpayload = pd.DataFrame.from_dict([payload])
    Y = pipeline.predict_proba(pdpayload)
    return jsonify({'predict': Y[0][0]})


if __name__ == "__main__":
    app.run(port="8080")
