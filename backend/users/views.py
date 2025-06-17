from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .JWTAuthentication import CustomCookieJWTAuthentication
from django.contrib.auth import get_user_model

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserInfoSerializer

from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse

from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.hashers import make_password

from django.contrib.auth.tokens import PasswordResetTokenGenerator



token_generator = PasswordResetTokenGenerator()


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
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
       

        if refresh_token is None:
            print(refresh_token, "refresh token")
            return Response({
                'status': 'error',
                'message': 'Refresh token missing.'
            }, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken(refresh_token)
            new_refresh_token = str(refresh)
            new_access_token = str(refresh.access_token)
           
        except Exception:
            print(Exception)
           
            return Response({
                'status': 'error',
                'message': 'Invalid refresh token.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        print('It works?')
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
  



class RoleOptionsView(APIView):
    def get(self, request):
        roles = [
            {"id" : 1, "label": "Owner", "value": "OWNER"},
            {"id" : 2, "label": "Admin", "value": "ADMIN"},
            {"id" : 3, "label": "Staff", "value": "STAFF"},
        ]
        return Response(roles)



class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()

        if user:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = token_generator.make_token(user)
            print("uid:", uid, "token:", token)
            reset_link = f"localhost:5173/reset-password/{uid}/{token}/"

            send_mail(
                'Password Reset',
                f'Click the link to reset your password: {reset_link}',
                'noreply@domain.com',
                [email],
                fail_silently=False,
            )

        return Response({'message': 'If the email exists, a reset link was sent.'})




class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        password = request.data.get('password')
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.filter(pk=uid).first()

        if user and token_generator.check_token(user, token):
            user.password = make_password(password)
            user.save()
            return Response({'message': 'Password successfully reset.'})
        return Response({'error': 'Invalid token.'}, status=400)
