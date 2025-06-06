from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .JWTAuthentication import CustomCookieJWTAuthentication
from django.contrib.auth import get_user_model

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserInfoSerializer


User = get_user_model()

class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]

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



class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            response = Response({
                'status': 'success',
                'message': 'Login successful.',
                'user': {
                    'id': user.id,
                    'email': user.email,
                }
            }, status=status.HTTP_200_OK)

            response.set_cookie(key='access_token', value=str(refresh.access_token),
                                httponly=True, samesite='Lax', secure=False)
            response.set_cookie(key='refresh_token', value=str(refresh),
                                httponly=True, samesite='Lax', secure=False)

            return response

        return Response({
            'status': 'error',
            'message': 'Invalid login credentials.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
    
class UserInfoView(APIView):
   authentication_classes = [CustomCookieJWTAuthentication]
   permission_classes=[permissions.IsAuthenticated]
   
   def get(self, request):
       serializer = UserInfoSerializer(request.user)
       print(serializer.data)
       return Response(serializer.data)



class CookieTokenRefreshView(APIView):
    authentication_classes = [CustomCookieJWTAuthentication]
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')

        if refresh_token is None:
            return Response({
                'status': 'error',
                'message': 'Refresh token missing.'
            }, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken(refresh_token)
            new_refresh_token = str(refresh)
            new_access_token = str(refresh.access_token)

        except Exception:
            return Response({
                'status': 'error',
                'message': 'Invalid refresh token.'
            }, status=status.HTTP_401_UNAUTHORIZED)

        response = Response({
            'status': 'success',
            'message': 'Token refreshed successfully.'
        }, status=status.HTTP_200_OK)

        response.set_cookie(
            key='refresh_token',
            value=new_refresh_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=60000,
        )
        response.set_cookie(
            key='access_token',
            value=new_access_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=300,
        )

        return response



class LogoutView(APIView):
  
  def post(self, request):

    response = Response({'status': 'success', "message": "Logged out successfully"}, status=status.HTTP_200_OK)

    response.delete_cookie("access_token", samesite="Lax", path="/")
    response.delete_cookie("refresh_token", samesite="Lax", path="/")

    return response