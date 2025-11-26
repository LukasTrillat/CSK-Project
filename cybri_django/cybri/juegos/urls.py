from django.urls import path
from juegos import views

urlpattenrs = [
    path('', views.seleccionar_hijo, name='seleccionar_hijo')
]