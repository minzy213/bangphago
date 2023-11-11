# from django.contrib.auth.models import User
from .models import Users, Theme
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'name', 'level']
        
class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = ["id", "title", "company", "intro", "category", "level", "recommendPerson", "tool", "activity", "time", 'grade', "thumbnail", "createdAt"]
    