
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('users.routers')),
    path('api/', include('subscriptions.routers')),
    path('api/', include('notifications.routers')),
    path('api/', include('config.routers')),
    path('api/', include('audit.routers')),
]
