from core_project.models_base import BaseModel
from django.db import models
from orders.models import Order


class Warehouse(BaseModel):
  name = models.CharField(max_length=100)
  location_city = models.CharField(max_length=100)
  max_capacity_units = models.PositiveIntegerField()


class Shipment(BaseModel):
  order = models.OneToOneField(
      Order, on_delete=models.CASCADE, related_name='shipment'
  )
  warehouse = models.ForeignKey(Warehouse, on_delete=models.PROTECT)
  tracking_number = models.CharField(max_length=100, unique=True)
  shipping_cost = models.DecimalField(max_digits=8, decimal_places=2)
  dispatched_at = models.DateTimeField(null=True, blank=True)


class ShipmentUpdate(BaseModel):
  shipment = models.ForeignKey(
      Shipment, on_delete=models.CASCADE, related_name='updates'
  ) 
  status_message = models.CharField(max_length=255)
  latitude = models.FloatField(null=True, blank=True)
  longitude = models.FloatField(null=True, blank=True)