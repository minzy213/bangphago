from django.db import models


class Add(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=10)
    depth = models.IntegerField()  # 서울, 경기 - 1, 수원, 안양 - 2


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=10)


class Company(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    tel = models.CharField(max_length=15, default="")
    homepage = models.CharField(max_length=100, default="")
    add1 = models.ForeignKey(
        Add, null=True, on_delete=models.SET_NULL, related_name="add1_set"
    )  # 서울, 경기
    add2 = models.ForeignKey(
        Add, null=True, on_delete=models.SET_NULL, related_name="add2_set"
    )  # 수원, 안양


class Theme(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="theme_set"
    )
    intro = models.CharField(max_length=150)
    category = models.ForeignKey(
        Category, null=True, on_delete=models.SET_NULL, related_name="theme_cat_set"
    )
    level = models.IntegerField()
    recommendPerson = models.IntegerField()
    tool = models.IntegerField()  # 0: 낮음, 1: 보통, 2: 높음
    activity = models.IntegerField()  # 0: 낮음, 1: 보통, 2: 높음
    time = models.IntegerField()
    grade = models.FloatField()
    thumbnail = models.CharField(max_length=150)
    createdAt = models.CharField(max_length=15)


class Keyword(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=10)


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    level = models.IntegerField()


class Review(models.Model):
    id = models.AutoField(primary_key=True)
    theme = models.ForeignKey(
        Theme, on_delete=models.CASCADE, related_name="rev_theme_set"
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="rev_user_set"
    )
    playDate = models.CharField(max_length=15, default="")
    grade = models.IntegerField()
    level = models.IntegerField()  # 0: 매우쉬움, 1: 쉬움, 2: 보통, 3: 어려움, 4: 매우어려움
    success = models.BooleanField()
    extraTime = models.CharField(max_length=20, default="", null=True)
    remainingTime = models.CharField(max_length=20, default="", null=True)
    userHint = models.IntegerField(default=0, null=True)
    content = models.TextField(null=True)


class ReviewKeyword(models.Model):
    id = models.AutoField(primary_key=True)
    review = models.ForeignKey(
        Review, on_delete=models.CASCADE, related_name="rev_keyword_set"
    )
