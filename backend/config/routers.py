from rest_framework import routers
from .viewsets import ConfigViewSet

router = routers.DefaultRouter()

router.register(r'config', ConfigViewSet)

urlpatterns = router.urls