FROM python:3.9-slim-buster
RUN apt-get update -y && apt-get update \
    && apt-get install -y --no-install-recommends curl gcc g++ gnupg unixodbc-dev
WORKDIR /backend-app
COPY requirements.txt /backend-app/
RUN pip install -r requirements.txt --no-cache-dir
COPY  /backend /backend-app/
EXPOSE 5000
CMD ["flask", "run", "--host", "0.0.0.0"]
