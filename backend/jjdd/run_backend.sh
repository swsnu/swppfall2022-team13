#!/bin/bash

# 컨테이너 켜질 때마다 아래의 커맨드들을 실행시킨다.
python manage.py makemigrations 
python manage.py migrate
sudo mkdir -p /log # for `uwsgi` logging 
uwsgi --ini uwsgi/uwsgi.ini