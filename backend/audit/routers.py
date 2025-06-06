from rest_framework import routers
from .viewsets import AuditLogsViewSet

router = routers.DefaultRouter()

router.register(r'audit/logs', AuditLogsViewSet)

urlpatterns = router.urls