from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Padre(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil_padre')

    nombre = models.CharField(max_length=100, null=False)

    def __str__(self):
        return f"Perfil de {self.user.username}"

class Hijo(models.Model):
    id = models.AutoField(primary_key=True)
    padre = models.ForeignKey(Padre, on_delete=models.CASCADE, related_name='hijos')
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField(default=0)
    
    def __str__(self):
        return self.nombre