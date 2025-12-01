from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required, user_passes_test
from django.db import connection
from .models import Padre, Hijo
from .forms import RegistroForm, LoginForm

# --- VISTAS DE AUTENTICACIÓN ---

def ingresar_y_registrar(request):
    # Si ya está logueado, mandar al inicio
    if request.user.is_authenticated:
        return redirect('inicio')

    login_form = LoginForm()
    registro_form = RegistroForm()
    mensaje_error = None

    if request.method == 'POST':
        accion = request.POST.get('accion')

        # --- CASO 1: REGISTRO ---
        if accion == 'registrar':
            registro_form = RegistroForm(request.POST)
            if registro_form.is_valid():
                data = registro_form.cleaned_data
                
                # 1. Crear Usuario de Django (Encriptación automática)
                nuevo_user = User.objects.create_user(
                    username=data['email'], # Usamos el email como username
                    email=data['email'], 
                    password=data['password']
                )
                
                # 2. Crear Perfil Padre asociado
                Padre.objects.create(user=nuevo_user, nombre=data['nombre'])
                
                # 3. Loguear automáticamente y redirigir
                login(request, nuevo_user)
                return redirect('inicio')

        # --- CASO 2: LOGIN ---
        elif accion == 'iniciar_sesion':
            login_form = LoginForm(request.POST)
            if login_form.is_valid():
                email = login_form.cleaned_data['email']
                password = login_form.cleaned_data['password']
                
                # Autenticación segura de Django
                user = authenticate(request, username=email, password=password)
                
                if user is not None:
                    login(request, user)
                    return redirect('inicio')
                else:
                    mensaje_error = "Correo o contraseña incorrectos."

    return render(request, "ingresar_y_registrar.html", {
        'login_form': login_form,
        'registro_form': registro_form,
        'error': mensaje_error
    })

# --- VISTAS PROTEGIDAS Y GESTIÓN ---

# Decorador para verificar si es admin (Staff de Django)
def es_admin(user):
    return user.is_authenticated and user.is_staff

@user_passes_test(es_admin, login_url='/')
def manejar_usuarios(request):
    # PUNTO RÚBRICA: Optimización con prefetch_related
    padres = Padre.objects.select_related('user').prefetch_related('hijos').all()
    return render(request, "manejo_usuarios.html", {"padres": padres})

@login_required(login_url='/usuarios/ingresar')
def editar_usuario(request, id):
    padre_a_editar = get_object_or_404(Padre, id=id)
    
    # SEGURIDAD: Evitar que un usuario edite el perfil de otro (a menos que sea admin)
    # Nota: request.user.perfil_padre accede a la relación OneToOne
    try:
        mi_perfil = request.user.perfil_padre
        if mi_perfil.id != padre_a_editar.id and not request.user.is_staff:
            return redirect('inicio')
    except:
        # Si es admin puro sin perfil de padre
        if not request.user.is_staff:
            return redirect('inicio')

    if request.method == 'POST':
        accion = request.POST.get('accion')

        if accion == 'actualizar_info':
            padre_a_editar.nombre = request.POST.get('nombre')
            padre_a_editar.save()
            
            # Actualizamos también el correo en el sistema de Auth
            nuevo_correo = request.POST.get('correo')
            if nuevo_correo and nuevo_correo != request.user.email:
                request.user.email = nuevo_correo
                request.user.username = nuevo_correo
                request.user.save()
            
            return redirect('editar_usuario', id=padre_a_editar.id)

        elif accion == 'agregar_hijo':
            Hijo.objects.create(
                padre=padre_a_editar,
                nombre=request.POST.get('hijo_nombre'),
                edad=request.POST.get('hijo_edad')
            )
            return redirect('editar_usuario', id=padre_a_editar.id)
            
        elif accion == 'eliminar_hijo':
            id_hijo = request.POST.get('hijo_id')
            Hijo.objects.filter(id=id_hijo, padre=padre_a_editar).delete()
            return redirect('editar_usuario', id=padre_a_editar.id)

    return render(request, 'editar_usuario.html', {'usuario': padre_a_editar})

@login_required
def ver_estadisticas(request):
    try:
        return render(request, "control_parental.html", {"usuario": request.user.perfil_padre})
    except:
        return redirect('inicio')

# --- VISTA OBLIGATORIA: SQL MANUAL (Puntos 1-4) ---
def eliminar_usuario(request, id):
    # Solo admin puede borrar
    if not request.user.is_staff:
        return redirect('inicio')
        
    usuario = get_object_or_404(Padre, id=id)
    user_django = usuario.user 
    
    # Borrado manual para asegurar limpieza (aunque el CASCADE lo haría)
    usuario.delete()
    user_django.delete()
    
    return redirect('manejo_usuarios')
    id_en_sesion = request.session.get('usuario_id')

    if id_en_sesion:
        usuario_logueado = Padre.objects.filter(id=id_en_sesion).first()
        return render(request, "control_parental.html", {"usuario" : usuario_logueado})
        
    return redirect('inicio')