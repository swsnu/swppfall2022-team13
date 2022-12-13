from django.urls import path
from politician import views

urlpatterns = [
    path('', views.politician, name='politician'),
    path('<int:politician_id>/', views.politician_detail, name='politician_detail'),
    path('like/<int:user_id>/', views.like_politicians, name='like_politicians'),
    path('isPolitician/', views.is_politician, name='is_politician'),
]
