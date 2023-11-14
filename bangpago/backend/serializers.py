# from django.contrib.auth.models import User
from .models import Users, Theme, Review

from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'name', 'level']
        
class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = ["id", "title", "company", "intro", "category", "level", "recommendPerson", "tool", "activity", "time", 'grade', "thumbnail", "createdAt", 'image']
    
class ReviewSerializer(serializers.ModelSerializer):
     class Meta:
        model = Review
        fields = ["id", "theme", "user", "playDate", "grade", "level", "success", "extraTime", "remainingTime", "userHint", "content"]
        
        