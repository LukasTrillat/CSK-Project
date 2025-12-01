from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from usuarios.models import Hijo

# -- Views -- #

@login_required(login_url='/usuarios/ingresar') # Protege la vista automáticamente
def seleccionar_hijo(request, hijo_id):
    # Verificamos que el hijo pertenezca al padre logueado por seguridad
    hijo = get_object_or_404(Hijo, id=hijo_id, padre__user=request.user)
    
    # Guardamos el ID del hijo en la sesión (esto está bien mantenerlo así)
    request.session['hijo_id'] = hijo.id
    return redirect('mapa_juegos')

@login_required(login_url='/usuarios/ingresar')
def mapa_juegos(request):
    # 1. Ya sabemos que hay padre logueado gracias a @login_required
    
    # 2. Verificamos si ya seleccionó un hijo en la sesión
    id_hijo_en_sesion = request.session.get('hijo_id')
    
    if id_hijo_en_sesion:
        # Buscamos al hijo, asegurándonos que sea de este padre
        hijo = Hijo.objects.filter(id=id_hijo_en_sesion, padre__user=request.user).first()
        
        if hijo:
            # Si todo está bien, mostramos el mapa
            return render(request, "mapa_juegos.html", {"hijo_logueado" : hijo})

    # 3. Si no hay hijo seleccionado (o el ID era inválido), mostramos la selección
    # Accedemos a los hijos a través del perfil padre del usuario
    try:
        perfil_padre = request.user.perfil_padre
        hijos = perfil_padre.hijos.all()
        return render(request, "seleccionar_hijo.html", {"usuario_logueado": perfil_padre, 'hijos': hijos})
    except:
        # Si el usuario es admin pero no tiene perfil de padre creado
        return redirect('inicio')