from django.urls import path

from . import views

urlpatterns = [
    path('register', views.UserRegisterView.as_view()),
    path('login', views.UserLoginView.as_view()),
    path('token/refresh', views.CookieTokenRefreshView.as_view()),
    path('user-info', views.UserInfoView.as_view()),
    path('logout', views.LogoutView.as_view()),
    
    ]