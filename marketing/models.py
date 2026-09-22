from core_project.models_base import BaseModel
from django.db import models
from inventory.models import Product
from users.models import UserProfile


class Campaign(BaseModel):
  title = models.CharField(max_length=150)
  discount_percentage = models.FloatField(
      help_text='Porcentaje de descuento ej. 15.5'
  )
  start_date = models.DateField()
  end_date = models.DateField()
  is_active = models.BooleanField(default=False)


class Coupon(BaseModel):
  code = models.CharField(max_length=30, unique=True)
  fixed_discount = models.DecimalField(max_digits=8, decimal_places=2)
  usage_limit = models.IntegerField(default=100)
  valid_until = models.DateTimeField()


class Review(BaseModel):
  product = models.ForeignKey(
      Product, on_delete=models.CASCADE, related_name='reviews'
  )
  user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
  rating = models.IntegerField(help_text='Calificación del 1 al 5')
  comment = models.TextField(blank=True)