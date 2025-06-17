from django.urls import path

from . import views

urlpatterns = [
    path('register', views.UserRegisterView.as_view()),
    path('login', views.UserLoginView.as_view()),
    path('token/refresh', views.CookieTokenRefreshView.as_view()),
    path('user-info', views.UserInfoView.as_view()),
    path('logout', views.LogoutView.as_view()),
    path('roles', views.RoleOptionsView.as_view()),
    path('password-reset-request', views.PasswordResetRequestView.as_view()),
    path('password-reset-confirm/<str:uid>/<str:token>/', views.PasswordResetRequestView.as_view()),

    
    ]