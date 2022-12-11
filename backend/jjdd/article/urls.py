from django.urls import path
from article import views

urlpatterns = [
    path('', views.article, name='article'),
    path('<int:article_id>/', views.article_detail, name='article_detail'),
    path('related/<int:article_id>/', views.related_articles, name='related_articles')
]
