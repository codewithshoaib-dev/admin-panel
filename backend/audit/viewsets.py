
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from users.permissions import IsOwnerOrAdmin
from users.JWTAuthentication import CustomCookieJWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import AuditLogs
from .serializers import AuditLogsSerializer




class AuditLogsViewSet(viewsets.ModelViewSet):
    authentication_classes = [ CustomCookieJWTAuthentication]
    
    queryset = AuditLogs.objects.all()
    serializer_class = AuditLogsSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['action']
    ordering_fields = ['created_at'] 
    ordering = ['-created_at']