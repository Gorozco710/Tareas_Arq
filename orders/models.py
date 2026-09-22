from core_project.models_base import BaseModel
from django.db import models
from inventory.models import Product
from users.models import UserProfile


class Cart(BaseModel):
  user = models.OneToOneField(
      UserProfile, on_delete=models.CASCADE, related_name='cart'
  )
  session_token = models.CharField(max_length=255, blank=True, null=True)


class Order(BaseModel):
  STATUS_CHOICES = [
      ('PENDING', 'Pendiente'),
      ('PAID', 'Pagado'),
      ('SHIPPED', 'Enviado'),
      ('CANCELLED', 'Cancelado'),
  ]
  user = models.ForeignKey(
      UserProfile, on_delete=models.PROTECT, related_name='orders'
  )
  total_amount = models.DecimalField(max_digits=12, decimal_places=2)
  status = models.CharField(
      max_length=20, choices=STATUS_CHOICES, default='PENDING'
  )
  order_date = models.DateTimeField(auto_now_add=True)


class OrderItem(BaseModel):
  order = models.ForeignKey(
      Order, on_delete=models.CASCADE, related_name='items'
  )
  product = models.ForeignKey(Product, on_delete=models.PROTECT)
  quantity = models.PositiveIntegerField(default=1)
  unit_price = models.DecimalField(max_digits=10, decimal_places=2)