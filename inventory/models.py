from core_project.models_base import BaseModel
from django.db import models


class Category(BaseModel):
  name = models.CharField(max_length=100, unique=True)
  slug = models.SlugField(unique=True)
  display_order = models.IntegerField(default=0)

  def __str__(self):
    return self.name


class Product(BaseModel):
  category = models.ForeignKey(
      Category, on_delete=models.SET_NULL, null=True, related_name='products'
  )
  name = models.CharField(max_length=200)
  sku = models.CharField(max_length=50, unique=True)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  stock_quantity = models.PositiveIntegerField(default=0)
  weight_kg = models.FloatField(help_text='Peso en kilogramos')
  is_available = models.BooleanField(default=True)

  def __str__(self):
    return self.name


class ProductAttribute(BaseModel):
  product = models.ForeignKey(
      Product, on_delete=models.CASCADE, related_name='attributes'
  )
  key_name = models.CharField(max_length=50)  # Ej. "Color", "Voltaje"
  value = models.CharField(max_length=100)  # Ej. "Rojo", "120V"