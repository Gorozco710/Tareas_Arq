import uuid
from django.db import models

class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    eliminado = models.BooleanField(default=False)
    fecha_eliminacion = models.DateTimeField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Categoria(BaseModel):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    activa = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class Producto(BaseModel):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='productos')
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField()
    precio = models.DecimalField(decimal_places=2, max_digits=10)
    peso = models.FloatField(default=0)
    disponible = models.BooleanField(default=True)
    fecha_lanzamiento = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Inventario(BaseModel):
    producto = models.OneToOneField(Producto, on_delete=models.CASCADE, related_name='inventario')
    cantidad = models.PositiveIntegerField(default=0)
    cantidad_minima = models.PositiveIntegerField(default=5)
    ultima_entrada = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Inventario de {self.producto.nombre}"