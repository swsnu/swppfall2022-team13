from django.urls import path
from politician import views

urlpatterns = [
    path('', views.politician, name='politician'),
    path('<int:politician_id>/', views.politician_detail, name='politician_detail'),
]
