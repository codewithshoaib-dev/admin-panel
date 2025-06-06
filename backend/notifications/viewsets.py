from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from users.permissions import IsOwnerOrAdmin
from users.authentication import CustomCookieJWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Notifications
from .serializers import NotificationsSerializer



class NotificationsViewSet(viewsets.ModelViewSet):
    authentication_classes = [CustomCookieJWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    queryset = Notifications.objects.all()
    serializer_class = NotificationsSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['created_at']      

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsOwnerOrAdmin()]
        return [IsAuthenticated()]