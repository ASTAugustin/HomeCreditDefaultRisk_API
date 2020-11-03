FROM python:3.7-slim
WORKDIR /usr/src/app
RUN pip install -i http://pypi.douban.com/simple/ --trusted-host=pypi.douban.com/simple flask gunicorn scikit-learn numpy pandas simplejson
COPY app.py .
COPY sklearn_model.pickle .
COPY sklearn_model.joblib .
EXPOSE 8080
CMD [ "gunicorn", "-w", "4", "-b", ":8080", "app:app" ]