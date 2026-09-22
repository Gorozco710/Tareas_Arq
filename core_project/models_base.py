import uuid
from django.db import models


class SoftDeleteManager(models.Manager):
  """Manager personalizado para filtrar automáticamente registros con soft delete."""

  def get_queryset(self):
    return super().get_queryset().filter(is_deleted=False)


class BaseModel(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  is_deleted = models.BooleanField(default=False)
  deleted_at = models.DateTimeField(null=True, blank=True)

  objects = SoftDeleteManager()  # Filtra los no eliminados
  all_objects = models.Manager()  # Incluye registros eliminados (histórico)

  class Meta:
    abstract = True