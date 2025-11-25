from django.db import models

# Create your models here.

class Padre(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, null=False)
    rut = models.CharField(max_length=10, null=False)
    correo = models.CharField(max_length=60, null=False)
    contraseña = models.CharField(max_length=20, null= False)

# class Niño(models.Model):
# PARA DESPUES