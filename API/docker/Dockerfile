FROM python:3.7-slim
WORKDIR /usr/src/app
RUN pip install -i http://pypi.douban.com/simple/ --trusted-host=pypi.douban.com/simple flask gunicorn scikit-learn numpy pandas wheel lightgbm joblib
COPY preprocess_model.joblib .
COPY clf.joblib .
COPY app.py .
COPY bureau.csv . 
COPY bureau_balance.csv .
COPY previous_application.csv .
COPY credit_card_balance.csv .
COPY installments_payments.csv .
COPY POS_CASH_balance.csv .
EXPOSE 8080
CMD [ "gunicorn", "-w", "4", "-b", ":8080", "app:app" ]