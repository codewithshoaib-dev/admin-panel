from rest_framework import routers
from .viewsets import NotificationsViewSet

router = routers.DefaultRouter()

router.register(r'notifications', NotificationsViewSet)

urlpatterns = router.urls