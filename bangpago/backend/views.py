from django.shortcuts import render
from .serializers import UserSerializer, ThemeSerializer
from .models import Users, Theme
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    
    
class ThemeViewSet(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    
    def get_queryset(self):
        qs = super().get_queryset()
        
        target = self.request.query_params.get('id')
        if target:
            qs = qs.filter(id=target)
            
        return qs
    
# class ThemeDetailViewSet(viewsets.ModelViewSet):
#     queryset = Theme.objects.all()
#     serializer_class = ThemeSerializer