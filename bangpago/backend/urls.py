from django.urls import path, include
from rest_framework import routers
from .views import *


router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'theme', ThemeViewSet, basename='theme')
print(router.urls)
urlpatterns = [
    path('', include(router.urls)),
]


