from django.contrib import admin
from .models import Categoria, Inventario, Producto

admin.site.register(Categoria)
admin.site.register(Producto)
admin.site.register(Inventario)