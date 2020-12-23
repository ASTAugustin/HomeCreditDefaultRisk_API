# HomeCreditDefaultRisk_API

This repository contains mainly three parts:
1. EDA contains our analysis on training data
2. Algo contains the algorithms of prediction, whose result is uploaded as final result on Kaggle
3. API is focused on the implementation of HTTP API

## EDA

We displayed the characteristic of our training data. The data is from: https://www.kaggle.com/c/home-credit-default-risk

## Algo

We worked on feature engineering separately, then we used similar classification model (LightGBM) with different hyper-parameters as Model1, and finally we did stacking (Model2) on our three different models. See ICT_Project_3_Architecture.PNG to better understand our algorithm. 

## API

Due to our limited ressource, we decided to start a local service directly on our own PCs by using flask. Our predictor on server follows the idea of stacking explained in 'Algo'. You can start the server by launching the app.py with the environment indicated in Env_Requirement.txt. (Some packages may not be necessary.) You can also find some results of performance tests in this folder.

## Our Group
Lefei Zhang, Donglin Chen, Bo LI, Lei TAN.