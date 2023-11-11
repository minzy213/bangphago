# from django.contrib.auth.models import User
from .models import Users
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'name', 'level']
        
class RoomSerializer(serializers.ModelSerializer):
    pass