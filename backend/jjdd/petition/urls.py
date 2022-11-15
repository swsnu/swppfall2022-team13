from django.urls import path
from article import views

urlpatterns = [
    path('', views.petition, name='petition'),
    path('<int:petition_id>/', views.petition_detail, name='petition_detail'),
]
