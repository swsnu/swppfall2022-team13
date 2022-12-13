# backend/Dockerfile
FROM snuspl/swpp:practice11

VOLUME /app
WORKDIR /app

COPY . .

RUN pip install django-cors-headers
RUN pip install djangorestframework
RUN pip install django_crontab

# Environment variables for django deployment
ENV DEBUG=False
ENV SECRET_KEY=anythinganythinganythinganythinganythinganythinganythinganythinganythinganythinganythinganythinganythinganythinganythinganythinganythinganything
ENV SECURE_HSTS_SECONDS=31536000
# ENV SECURE_SSL_REDIRECT=True    
ENV SESSION_COOKIE_SECURE=True
ENV CSRF_COOKIE_SECURE=True
ENV SECURE_HSTS_INCLUDE_SUBDOMAINS=True
ENV SECURE_HSTS_PRELOAD=True

ENTRYPOINT sh ./run_backend.sh