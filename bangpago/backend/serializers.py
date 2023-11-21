# from django.contrib.auth.models import User
from rest_framework.fields import empty
from .models import Users, Theme, Review, Company, Category

from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'name', 'level']

    
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "theme", "user", "playDate", "grade", "level", "success", "extraTime", "remainingTime", "userHint", "content"]
        
    user = UserSerializer()
        
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "title", "tel", "homepage" ]   
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]
                
class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = ["id", "title", "company", "intro", "category", "level", "recommendPerson", "tool", "activity", "time", 'grade', "thumbnail", "createdAt", 'image', 'etc']
    
    company = CompanySerializer()
    category = CategorySerializer()
    
class ReviewListSerializer(serializers.Serializer):
    review_count = serializers.IntegerField(read_only=True)
    page = serializers.IntegerField(read_only=True)
    per_page = serializers.IntegerField(read_only=True)
    
    reviews = ReviewSerializer(many=True)
    
