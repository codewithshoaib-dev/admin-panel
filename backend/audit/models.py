from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class AuditLogs(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
    action = models.CharField(max_length=120)
    details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
