from rest_framework.routers import DefaultRouter
from user.views import UserViewSet, RegisterViewSet
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('register/', RegisterViewSet.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserViewSet.as_view({'get': 'retrieve'}), name='me'),
]

urlpatterns += router.urls