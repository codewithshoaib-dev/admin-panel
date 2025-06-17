from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class AuditLogs(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=120, db_index=True)
    details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
