from django.db import models
from django.contrib.auth import get_user_model
import uuid


User = get_user_model()


class Notifications(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, 
                             related_name='user_notifications', 
                             null=True, blank=False)
    

    title = models.CharField(max_length=100)
    type = models.CharField(max_length=50, null=True, blank=True, db_index=True)
    message = models.TextField(null=True, blank=True)
    read = models.BooleanField(default=False)
    send_at = models.DateTimeField(auto_now_add=True, db_index=True)
    