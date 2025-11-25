from django.shortcuts import render, HttpResponse, get_object_or_404,redirect
from .models import Padre, Hijo

# -- Views -- #

def ver_usuarios(request):

    # Fetch all fathers and prefetch their children to avoid N+1 query problems
    padres = Padre.objects.prefetch_related('hijos').all()

    # --     
    return render(request, "manejo_usuarios.html", {
        "padres": padres
    })


def editar_usuario(request, id):
    usuario = get_object_or_404(Padre, id=id)

    # -- Si se recibe informacion -- #
    if request.method == 'POST':
        accion = request.POST.get('accion')

        # -- Actualizar datos del padre -- #
        if accion == 'actualizar_info':
            usuario.nombre = request.POST.get('nombre')
            usuario.correo = request.POST.get('correo')
            usuario.save()

            return redirect('editar_usuario', id=usuario.id)

        # -- Agregar un hijo -- #
        elif accion == 'agregar_hijo':
            nombre_hijo = request.POST.get('hijo_nombre')
            edad_hijo = request.POST.get('hijo_edad')
            
            Hijo.objects.create(
                padre=usuario,
                nombre=nombre_hijo,
                edad=edad_hijo
            )
            return redirect('editar_usuario', id=usuario.id)

    else:
        context = {'usuario': usuario}
        return render(request, 'editar_usuario.html', context)


def eliminar_usuario(request, id):
    usuario = get_object_or_404(Padre, id=id)
    usuario.delete()
    return redirect(ver_usuarios)


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