from rest_framework import viewsets, filters
from django.contrib.auth import get_user_model
from .serializers import UserInfoSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrAdmin

from .authentication import CustomCookieJWTAuthentication

User = get_user_model()

class UserPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class UsersViewSet(viewsets.ModelViewSet):
    authentication_classes = [ CustomCookieJWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    queryset = User.objects.order_by('-date_joined')
    serializer_class = UserInfoSerializer
    pagination_class = UserPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['username']


    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = self.perform_create(serializer)
            return Response({
                'status': 'success',
                'message': 'User registered successfully.',
                'user': {
                    'id': user.id,
                    'email': user.email,
                }
            }, status=status.HTTP_201_CREATED)
        
        else:
            return Response({
                'status': 'error',
                'message': 'Registration failed.',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)


    def perform_create(self, serializer):
        user = serializer.save()
        return user