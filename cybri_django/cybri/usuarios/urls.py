from django.urls import path
from usuarios import views

urlpatterns = [
    path('', views.ver_usuarios, name='get_usuarios'),
    path('ingresar', views.ingresar_y_registrar, name='ingresar_y_registrar_usuarios'),
    path('<int:id>', views.ver_usuario_id, name="ver_usuario_id")
]