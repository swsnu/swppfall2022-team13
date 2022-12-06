from django.urls import path
from comment import views

urlpatterns = [
    path('', views.comment, name='comment'),
    path('<int:comment_id>/', views.comment_detail, name='comment_detail'),
]
