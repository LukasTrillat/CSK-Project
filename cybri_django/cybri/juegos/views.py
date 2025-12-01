from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from usuarios.models import Padre, Hijo

# -- Views -- #

def seleccionar_hijo(request, hijo_id):
    request.session['hijo_id'] = hijo_id
    return redirect('mapa_juegos')

def mapa_juegos(request):

    # -- Verificar que haya padre logueado -- #
    id_padre_en_sesion = request.session.get('usuario_id')
    if id_padre_en_sesion:

    # -- Verificar que haya un hijo seleccionado -- #
        id_hijo_en_sesion = request.session.get('hijo_id')
        
        # -- Si hay hijo seleccionado, llevar al mapa -- #
        if id_hijo_en_sesion:
            hijo = Hijo.objects.filter(id=id_hijo_en_sesion).first()
            return render(request, "mapa_juegos.html", {"hijo_logueado" : hijo})

        # -- Si no, seleccionar hijo -- #
        else:
            padre = Padre.objects.filter(id=id_padre_en_sesion).first()
            hijos = padre.hijos.all()
            return render(request, "seleccionar_hijo.html", {"usuario_logueado": padre, 'hijos': hijos})
    
    # -- Si no hay, volver al inicio -- #
    return redirect('inicio')