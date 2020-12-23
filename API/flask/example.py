from flask import Flask, request, jsonify
import numpy as np
import joblib
import pandas as pd 

app=Flask(__name__)


@app.route("/", methods=['POST'])
def call():
  payload = request.json 
  x = (type(payload).__name__ == 'dict')
  print(payload)
  return jsonify({'predict': 0})
if __name__=='__main__':
  app.run(host="0.0.0.0", port=8080)