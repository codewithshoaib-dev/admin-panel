
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from users.permissions import IsOwnerOrAdmin
from users.JWTAuthentication import CustomCookieJWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from audit.CreateAuditLogs import CreateAuditLog

from rest_framework import status

from .models import SubscriptionPlans, UserSubscription
from .serializers import SubscriptionPlansSerializer, UserSubscriptionSerializer



class SubscriptionsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100



class SubscriptionPlansViewSet(viewsets.ModelViewSet):
    queryset = SubscriptionPlans.objects.all()
    serializer_class = SubscriptionPlansSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    pagination_class = SubscriptionsPagination
    search_fields = ['name']

 
    def get_authenticators(self):
        if self.request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
           return [CustomCookieJWTAuthentication()]
        return []

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsOwnerOrAdmin()]
        return []
    

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance_name = instance.name 
        instance.delete()

        CreateAuditLog(
            user=request.user,
            action="Delete",
            details=f"Deleted subscription plan: {instance_name}"
           )

        return Response(status=status.HTTP_204_NO_CONTENT)
    


        
  

class UserSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = UserSubscription.objects.all()
    serializer_class = UserSubscriptionSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = []
    ordering_fields = []
    
    def get_permissions(self):
        if self.action in [ 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsOwnerOrAdmin()]
        return [] 
