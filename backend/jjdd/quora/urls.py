from django.urls import path
from quora import views

urlpatterns = [
    path('', views.quora, name='quora'),
    path('<int:quora_id>/', views.quora_detail, name='quora_detail'),
]
