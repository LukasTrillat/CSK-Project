from django.shortcuts import render, redirect
from django.contrib.auth import logout

def inicio(request):
    # Limpiamos sesión de juego si existe
    if 'hijo_id' in request.session:
        del request.session['hijo_id']

    usuario_logueado = None
    
    # Verificamos si hay usuario de Django logueado
    if request.user.is_authenticated:
        try:
            # Intentamos obtener el perfil de padre
            usuario_logueado = request.user.perfil_padre
            # Agregamos atributo 'admin' temporalmente para compatibilidad con template
            usuario_logueado.admin = request.user.is_staff
        except:
            # Es un admin sin perfil de padre
            pass

    return render(request, "inicio.html", {'usuario_logueado': usuario_logueado})

def cerrar_sesion(request):
    logout(request)
    return redirect('inicio')