from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'theme', views.ThemeViewSet, basename='theme')
router.register(r'review', views.ReviewViewSet, basename='Review')
router.register(r'Recommand', views.RecommandViewSet, basename='Recommand')
router.register(r'popular', views.PopularViewSet, basename='popular')
router.register(r'different', views.DifferentViewSet, basename='different')
router.register(r'company', views.CompanyViewSet, basename='company')

# /theme/363/review?page=2
# /review?theme_id=363&page=1
print(router.urls)
urlpatterns = [
    path('', include(router.urls)),
    path('search/', views.Recommendation, name="Recommendation"),
]


