from django.shortcuts import render, HttpResponse, redirect
from usuarios.models import Padre

# -- Views -- #

def inicio(request):
    # -- Eliminar la sesion del hijo -- #
    request.session.pop('hijo_id', None)

    # -- Si existe un usuario logueado, pasarlo como contexto -- #
    id_en_sesion = request.session.get('usuario_id')
    usuario_logueado = None
    if id_en_sesion:
        usuario_logueado = Padre.objects.filter(id=id_en_sesion).first()

    return render(request, "inicio.html", {'usuario_logueado': usuario_logueado})

def cerrar_sesion(request):
    # -- Terminar la sesion por completo -- #
    request.session.flush()
    return redirect('inicio')