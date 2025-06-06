from rest_framework import routers
from .viewsets import SubscriptionPlansViewSet, UserSubscriptionViewSet

router = routers.DefaultRouter()

router.register(r'subscription/plans', SubscriptionPlansViewSet)
router.register(r'user/subscription', UserSubscriptionViewSet)


urlpatterns = router.urls

