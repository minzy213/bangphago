from django.urls import path, include
from rest_framework import routers
from .views import *


router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'theme', ThemeViewSet, basename='theme')
router.register(r'review', ReviewViewSet, basename='Review')
# /theme/363/review?page=2
# /review?theme_id=363&page=1
print(router.urls)
urlpatterns = [
    path('', include(router.urls)),
]


