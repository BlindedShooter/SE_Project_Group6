from django.urls import path
from . import views

app_name = 'restaurants'

urlpatterns = [
    path('<int:pk>/', views.RestaurantDetailRetrieveView, name='detail'),
    path('<int:pk>/menus/', views.RestaurantMenuListRetrieveView, name='menu-list'),
    path('<int:pk>/order/', views.RestaurantOrderCreateView, name='order')
]
