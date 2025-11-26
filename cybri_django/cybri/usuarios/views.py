from django.shortcuts import render, HttpResponse, get_object_or_404,redirect
from .models import Padre, Hijo

# -- Views -- #

def manejar_usuarios(request):


    # -- Revisar si el usuario es un administrador -- #
    id_en_sesion = request.session.get('usuario_id')

    if id_en_sesion:
        usuario_logueado = Padre.objects.filter(id=id_en_sesion).first()
        if usuario_logueado.admin == True:

            # Fetch all fathers and prefetch their children to avoid N+1 query problems
            padres = Padre.objects.prefetch_related('hijos').all()

            return render(request, "manejo_usuarios.html", {"padres": padres})
 
    return redirect('inicio')



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
        
        # -- Eliminar un hijo -- #
        elif accion == 'eliminar_hijo':
            id_hijo_a_borrar = request.POST.get('hijo_id')
            Hijo.objects.filter(id=id_hijo_a_borrar).delete()
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

        try:
        # -- Encuentra un usuario con el correo ingresado -- #
            usuario = Padre.objects.get(correo=request.POST.get('email'))

            # -- Verifica que la contraseña coincida -- #
            if usuario.contraseña == request.POST.get('password'):
                request.session['usuario_id'] = usuario.id
                return redirect('inicio')
            else:
                return render(request, "ingresar_y_registrar.html", {"error": "Contraseña incorrecta"})
        
        except Padre.DoesNotExist:
            return render(request, "ingresar_y_registrar.html", {"error": "Ese correo no está registrado"})
    else:
        return render(request, 'ingresar_y_registrar.html')
        

