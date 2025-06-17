from django.db import models
from django.contrib.auth import get_user_model
import uuid


User = get_user_model()

class SubscriptionPlans(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, db_index=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    billing_cycle = models.CharField(max_length=20, choices=[('MONTHLY', 'Monthly'), ('YEARLY','Yearly')])
    features = models.JSONField()
    is_active = models.BooleanField()
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='created_by', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



class UserSubscription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscribed_user')
    plan = models.ForeignKey(SubscriptionPlans, on_delete=models.CASCADE, related_name='user_subscription')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField()
    auto_renew = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)