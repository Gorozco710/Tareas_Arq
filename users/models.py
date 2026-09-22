from core_project.models_base import BaseModel
from django.db import models


class Role(BaseModel):
  name = models.CharField(max_length=50, unique=True)
  description = models.TextField(blank=True, null=True)
  is_active = models.BooleanField(default=True)

  def __str__(self):
    return self.name


class UserProfile(BaseModel):
  username = models.CharField(max_length=150, unique=True)
  email = models.EmailField(unique=True)
  birth_date = models.DateField(null=True, blank=True)
  reputation_score = models.FloatField(default=5.0)
  role = models.ForeignKey(Role, on_delete=models.PROTECT, related_name='users')

  def __str__(self):
    return self.username


class Address(BaseModel):
  user = models.ForeignKey(
      UserProfile, on_delete=models.CASCADE, related_name='addresses'
  )
  street = models.CharField(max_length=255)
  city = models.CharField(max_length=100)
  postal_code = models.CharField(max_length=20)
  is_default = models.BooleanField(default=False)

  def __str__(self):
    return f'{self.street}, {self.city}'

