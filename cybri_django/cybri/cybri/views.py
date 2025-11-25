from django.shortcuts import render, HttpResponse

#Create views here

def inicio(request):
    return render(request, "inicio.html")

