from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Notifications(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, 
                             related_name='user_notifications', 
                             null=True, blank=False)
    

    title = models.CharField(max_length=100)
    message = models.TextField(null=True, blank=True)
    read = models.BooleanField()
    send_at = models.DateTimeField(auto_now_add=True)
    