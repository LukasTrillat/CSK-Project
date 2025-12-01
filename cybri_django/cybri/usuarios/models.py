from django.db import models

# Create your models here.

class Padre(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False)
    correo = models.CharField(max_length=60, null=False)
    contraseña = models.CharField(max_length=20, null= False, default='12345')
    admin = models.BooleanField(default=False, null=False)

    def __str__(self):
        return f"{self.nombre}"

class Hijo(models.Model):
    id = models.AutoField(primary_key=True)
    padre = models.ForeignKey(Padre, on_delete=models.CASCADE, related_name='hijos')
    nombre = models.CharField(max_length=100)
    edad = models.IntegerField(default=0)
    
    def __str__(self):
        return self.nombre