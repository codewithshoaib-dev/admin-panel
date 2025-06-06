from django.db import models



class Config(models.Model):
    key = models.CharField(max_length=255, unique=True)
    value = models.TextField()
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
