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
    serializer_class = ThemeSerializer
    queryset = Theme.objects.all()
    
    # def list(self, request):
    #     # obj = self.get_object()
    #     queryset = self.get_queryset()
    #     sc = self.get_serializer_class()
    #     serializer = sc(queryset, many=True)
    #     return Response(serializer.data)
    
    # def retrive(self, request):
    #     queryset = self.get_object()
    #     sc = self.get_serializer_class()
    #     serializer = sc(queryset)
    #     return Response(serializer.data)
    
    
# class ThemeDetailViewSet(viewsets.ModelViewSet):
#     queryset = Theme.objects.filter(id=pk)
#     serializer_class = ThemeSerializer

