from django.urls import path
from article import views

urlpatterns = [
    # path('token/', views.token, name='token'), -> user로 뺄 예정
    path('article/', views.articles, name='articles'),
    path('article/<int:article_id>/', views.article_detail, name='article_detail'),
]
