"""
crawl/reviews 에 저장된 json file들을 DB에 저장하는 코드

아래 순서대로 실행 필요

(mysql) create database bangphago character set utf8mb4 collate utf8mb4_general_ci;
(terminal) python manage.py migrate
(terminal) python saveData.py
"""

import json
from tqdm import tqdm
import os, sys

file_path = "../crawl/theme.json"

# 전체 테마 리스트 json 불러오기
with open(file_path, "r", encoding="UTF8") as f:
    theme_dict = json.load(f)

c_dic = {}
for theme in theme_dict["list"]:
    if c_dic.get(theme["category"]) is None:
        c_dic[theme["category"]] = 1


PWD = os.path.abspath(".")

PROJ_MISSING_MSG = """Set an enviroment variable:\n
`DJANGO_PROJECT=your_project_name`\n
or call:\n
`init_django(your_project_name)`
"""


def init_django(project_name=None):
    os.chdir(PWD)
    project_name = project_name or os.environ.get("DJANGO_PROJECT") or None
    if project_name == None:
        raise Exception(PROJ_MISSING_MSG)
    sys.path.insert(0, os.getenv("PWD"))
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", f"{project_name}.settings")
    os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
    import django

    django.setup()


init_django("bangpago")  # project name

from backend.models import (
    Add,
    Category,
    Company,
    Theme,
    Keyword,
    Users,
    Review,
    ReviewKeyword,
)
import json
from emoji import core

categories = []
for key in c_dic.keys():
    categories.append(Category(name=key))
Category.objects.bulk_create(categories)


reviews = []


ThemeLvToInt = {"낮음": 0, "보통": 1, "높음": 2}
RevLvToInt = {"매우쉬움": 0, "쉬움": 1, "보통": 1, "어려움": 2, "매우어려움": 3}
isSuccess = {"성공": 1, "실패": 0}

# theme.json 파일 읽어서 for문 돌리기
print("파일에서 데이터 가져오는 중...")
for theme in tqdm(theme_dict["list"]):
    # 해당 테마 리뷰 불러오기
    with open(f'../crawl/reviews/{theme["id"]}.json', "r", encoding="UTF8") as f:
        detail_d = json.load(f)
    # 새로운 주소면 주소 먼저 저장
    a1, a2 = detail_d["address"].split()[:2]
    add1 = Add.objects.filter(name=a1)
    if len(add1) == 0:
        add1 = Add.objects.create(name=a1, depth=1)
    else:
        add1 = add1[0]
    add2 = Add.objects.filter(name=a2)
    if len(add2) == 0:
        add2 = Add.objects.create(name=a2, depth=1)
    else:
        add2 = add2[0]

    # 회사 정보 저장
    t_com = Company.objects.filter(id=detail_d["companyId"])
    if len(t_com) == 0:
        t_com = Company.objects.create(
            id=detail_d["companyId"],
            title=detail_d["companyName"],
            add1=add1,
            add2=add2,
            tel=detail_d["companyTel"],
            homepage=detail_d["companyHomepage"],
        )
    else:
        t_com = t_com[0]
    # 해당 테마의 카테고리 가져오기
    category = Category.objects.get(name=detail_d["category"])
    # 테마 정보 Theme 테이블에 저장
    t_theme = Theme.objects.filter(id=detail_d["id"])
    if len(t_theme) == 0:
        t_theme = Theme.objects.create(
            id=detail_d["id"],
            title=detail_d["title"],
            company=t_com,
            intro=detail_d["intro"][:150],
            category=category,
            level=detail_d["level"],
            recommendPerson=detail_d["recommendPerson"],
            tool=ThemeLvToInt[detail_d["tool"]],
            activity=ThemeLvToInt[detail_d["activity"]],
            time=detail_d["time"],
            grade=detail_d["grade"],
            thumbnail=detail_d["thumbnail"],
            createdAt=theme["createdAt"],
        )
    else:
        t_theme = t_theme[0]
    # 해당 테마 리뷰들 for문 돌리기
    for rev in detail_d["review_list"]:
        t_user = Users.objects.filter(id=rev["userId"])
        # 새로운 유저면 유저 저장
        if len(t_user) == 0:
            t_user = Users.objects.create(
                id=rev["userId"], name=rev["userName"][:20], level=rev["reviewLevel"]
            )
        else:
            t_user = t_user[0]
        # 리뷰 상세정보 저장
        reviews.append(
            Review(
                id=rev["id"],
                theme=t_theme,
                user=t_user,
                playDate=rev["playDate"],
                grade=rev["grade"],
                level=RevLvToInt[rev["level"]],
                success=isSuccess[rev["success"]],
                extraTime=rev["extraTime"],
                remainingTime=rev["remainingTime"],
                userHint=rev["userHint"],
                content=core.replace_emoji(rev["content"], replace=""),
            )
        )

# Review.objects.bulk_create(reviews)


print("리뷰 데이터 DB에 저장하는 중...")
for idx in tqdm(range(0, len(reviews), 100)):
    if len(reviews) > idx + 10:
        Review.objects.bulk_create(reviews[idx : idx + 100])
    else:
        Review.objects.bulk_create(reviews[idx:])
