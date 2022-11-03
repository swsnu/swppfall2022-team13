from django.urls import path
from article import views

urlpatterns = [
    path('article/', views.articles, name='articles'),
    path('article/<int:article_id>/', views.article_detail, name='article_detail'),
]
