from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from subscriptions.models import UserSubscription, SubscriptionPlans
from config.models import Config


from .models import AuditLogs
User = get_user_model()


@receiver(post_save, sender=SubscriptionPlans)
def subscription_plans_post_save(sender, instance, created, **kwargs):
    if created:
        print(f"MyModel instance created: {instance}")
        config_details = instance
        AuditLogs.objects.create(user=sender, action = "Create", details = "Created a new subscription Plan")

    print(f"MyModel instance created: {instance}")