from django.urls import path
from usuarios import views

urlpatterns = [
    path('', views.ver_usuarios, name='manejo_usuarios'),
    path('ingresar', views.ingresar_y_registrar, name='ingresar_y_registrar_usuarios'),
    path('<int:id>', views.editar_usuario, name="editar_usuario"),
    path('eliminar/<int:id>', views.eliminar_usuario, name="eliminar_usuario")
]