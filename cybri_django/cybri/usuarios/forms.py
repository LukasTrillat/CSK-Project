from django import forms
from django.contrib.auth.models import User
from .models import Padre

# -- Formulario de registro -- #
class RegistroForm(forms.Form):
    nombre = forms.CharField(
        label="Nombre",
        widget=forms.TextInput(attrs={'placeholder': 'Nombre Completo', 'class': 'input-field'})
    )
    email = forms.EmailField(
        label="Correo Electrónico",
        widget=forms.EmailInput(attrs={'placeholder': 'Email', 'class': 'input-field'})
    )
    password = forms.CharField(
        label="Contraseña",
        widget=forms.PasswordInput(attrs={'placeholder': 'Contraseña', 'class': 'input-field'})
    )

    # Validación personalizada para evitar correos repetidos
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Este correo ya está registrado.")
        return email

# -- Formulario de login -- #
class LoginForm(forms.Form):
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'placeholder': 'Email', 'class': 'input-field'})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Contraseña', 'class': 'input-field'})
    )