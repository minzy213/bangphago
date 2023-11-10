from django.shortcuts import render
from .serializers import UserSerializer
from .models import Users
from rest_framework import viewsets, permissions

class UserViewSet(viewsets.ModelViewSet):
    
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]