from django.urls import path
from juegos import views

urlpatterns = [
    path('', views.mapa_juegos, name='mapa_juegos'),
    path('seleccionar/<int:hijo_id>', views.seleccionar_hijo, name="seleccionar_hijo")
]