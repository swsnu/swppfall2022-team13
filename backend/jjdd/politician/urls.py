from django.urls import path
from politician import views

urlpatterns = [
    path('politician/', views.politician, name='politician'),
    path('politician/<int:politician_id>/', views.politician_detail, name='politician_detail'),
]
