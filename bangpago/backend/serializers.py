# from django.contrib.auth.models import User
from rest_framework.fields import empty
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
        
class ReviewListSerializer(serializers.Serializer):
    review_count = serializers.IntegerField(read_only=True)
    page = serializers.IntegerField(read_only=True)
    per_page = serializers.IntegerField(read_only=True)
    
    reviews = ReviewSerializer(many=True)
    
    
    
#     def __init__(self, instance=None, data=..., **kwargs):
#         super().__init__(instance, data, **kwargs)
#         cnt = instance.get_count()
#         self.review_count.se