from django.urls import re_path
from . import consumers



websocket_urlpatterns = [
    re_path(r'ws/dashboard_stats/', consumers.DashboardStatsConsumer.as_asgi()),
]
