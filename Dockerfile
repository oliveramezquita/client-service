FROM python:3.9-slim-buster
WORKDIR /backend
COPY requirements.txt /backend/
RUN pip install -r requirements.txt --no-cache-dir
COPY . /backend/
EXPOSE 5000
RUN cd backend
CMD ["flask", "run", "--host", "0.0.0.0"]