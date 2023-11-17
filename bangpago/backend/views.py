from django.shortcuts import render
from .serializers import *
from .models import Users, Theme, Review
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    
    
class ThemeViewSet(viewsets.ModelViewSet):
    serializer_class = ThemeSerializer
    queryset = Theme.objects.all()
    
    
class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    
    
    # def get_queryset(self):
    #     per_page = 10
        
    #     params = self.request.query_params
    #     theme_id = params.get('themeId')
    #     page = int(params.get('page', 1))

    #     if not theme_id:
    #         raise NotFound("themeId query parameter must be required.")
        
    #     queryset = self.queryset.filter(theme_id=theme_id)        
    #     return queryset[per_page*(page-1):per_page*page]
    
    def list(self, *args, **kwargs):
        per_page = 10
        
        params = self.request.query_params
        theme_id = params.get('themeId')
        page = int(params.get('page', 1))

        if not theme_id:
            raise NotFound("themeId query parameter must be required.")
        
        qs = self.get_queryset().filter(theme_id=theme_id)
        serializer = ReviewListSerializer({
            'reviews': qs[per_page*(page-1):per_page*page],
            'review_count': qs.count(),
            "page": page,
            "per_page": per_page
        })
        return Response(serializer.data)
    
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

