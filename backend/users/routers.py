from rest_framework.routers import DefaultRouter
from .ViewSets import UsersViewSet

router = DefaultRouter()

router.register(r'users', UsersViewSet)

urlpatterns = router.urls

