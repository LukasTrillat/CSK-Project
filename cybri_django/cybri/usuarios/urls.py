from django.urls import path
from usuarios import views

urlpatterns = [
    path('', views.ver_usuarios, name='ver_usuarios')
]