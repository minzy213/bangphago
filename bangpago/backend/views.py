from django.shortcuts import render
from .serializers import *
from .models import Users, Theme, Review, Company
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.http import HttpResponse
from .recom_sys.recom import get_vector
from queryset import recom_sys, popular, rndm

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    
class ThemeViewSet(viewsets.ModelViewSet): #All
    serializer_class = ThemeSerializer
    queryset = Theme.objects.all()
    # queryset = Theme.objects.prefetch_related('company').all()
    
    

class RecommandViewSet(viewsets.ModelViewSet): #추천순
    serializer_class = ThemeSerializer
    queryset = Theme.objects.all()

class PopularViewSet(viewsets.ModelViewSet): #인기순 정렬
    serializer_class = ThemeSerializer
    queryset = popular()
    
class DifferentViewSet(viewsets.ModelViewSet): #랜덤
    serializer_class = ThemeSerializer
    queryset = rndm()
    
    
class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

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


def Recommendation(request):
    target = request.GET.getlist("text")[0]
    isname = request.GET.getlist("isname")[0]
    if isname == True:
        RecommandViewSet.queryset = recom_sys(target)
    else:
        RecommandViewSet.queryset = recom_sys(get_vector(target))

    return HttpResponse("succeed")