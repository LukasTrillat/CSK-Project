from django.contrib import admin
from .models import Padre, Hijo


# Configuración para ver a los Hijos dentro del Padre en el admin
class HijoInline(admin.TabularInline):
    model = Hijo
    extra = 1

@admin.register(Padre)
class PadreAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'usuario_correo', 'cantidad_hijos')
    inlines = [HijoInline] # Esto permite agregar hijos directamente desde la pantalla del Padre

    # Métodos auxiliares para mostrar info relacionada
    def usuario_correo(self, obj):
        return obj.user.email
    
    def cantidad_hijos(self, obj):
        return obj.hijos.count()
    
admin.site.register(Hijo)