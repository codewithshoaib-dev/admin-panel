from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from subscriptions.models import UserSubscription, SubscriptionPlans
from config.models import Config

from django.contrib.auth import get_user_model

from config.models import Config

from .models import AuditLogs


User = get_user_model()


@receiver(post_save, sender=SubscriptionPlans)
def subscription_plans_post_save(sender, instance, created, **kwargs):
    if created:
        AuditLogs.objects.create(user = instance.created_by,
                                  action = "Create", 
                                  details = f"Created a new subscription Plan: {instance.name} ")



