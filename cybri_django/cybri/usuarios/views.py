from django.shortcuts import render, HttpResponse, get_object_or_404,redirect
from .models import Padre

# -- Views -- #

def ver_usuarios(request):

    # Fetch all fathers and prefetch their children to avoid N+1 query problems
    padres = Padre.objects.prefetch_related('hijos').all()

    # --     
    return render(request, "manage_users.html", {
        "padres": padres
    })

def ver_usuario_id(request, id):

    usuario = get_object_or_404(Padre, id=id)


def ingresar_y_registrar(request):

    # -- Crear nuevo usuario -- #
    if request.method == 'POST' and request.POST.get('accion') == 'registrar':
        nuevo_usuario = Padre(
            nombre = request.POST.get('nombre'),
            correo = request.POST.get('email'),
            contraseña = request.POST.get('password')
        )

        nuevo_usuario.save()
        return redirect('/')

    # -- Iniciar Sesion -- #
    elif request.method== 'POST' and request.POST.get('accion') == 'iniciar_sesion':
        pass


    # -- Redirigir a la pagina de ingreso/registro -- #
    else:
        return render(request, "ingresar_y_registrar.html")