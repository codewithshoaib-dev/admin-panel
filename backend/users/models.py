from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    class Roles(models.TextChoices):
        OWNER = 'OWNER', 'Owner'
        ADMIN = 'ADMIN', 'Admin'
        STAFF = 'STAFF', 'Staff'
    
    role = models.CharField(max_length=20,
                             choices=Roles.choices,
                             default=Roles.STAFF)
    
    last_login_ip = models.GenericIPAddressField(null=True, blank=True)
    last_login_user_agent = models.TextField(null=True, blank=True)
    
    def is_owner(self):
        return self.role == self.Roles.OWNER
    
    def is_admin(self):
        return self.role == self.Roles.ADMIN
    
    def is_staff_member(self):
        return self.role == self.Roles.STAFF
    