FROM python:3.9

RUN pip install django

WORKDIR /app

COPY . /app

EXPOSE 8000

CMD python /app/manage.py runserver 0.0.0.0:8000
