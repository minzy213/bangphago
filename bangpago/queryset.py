from backend.models import (
    Theme,
    Keyword,
    Users,
    Review,
    ReviewKeyword,
    UserVector,
    ThemeVector,
)
import pandas as pd
from tqdm import tqdm
from django.db.models import Case, When
import numpy as np
from numpy import dot
from numpy.linalg import norm


keys = [
    "guide",
    "light",
    "interior",
    "story",
    "probability",
    "creativity",
    "production",
    "activity",
    "scale",
    "fear",
    "device",
    "fun",
    "service",
]


def getVector(qs, len_r):
    keys = ['guide', 'interior', 'story', 'probability', 'creativity', 'production', 'device', 'fun', 'service']
    vec_ab = {}
    # 유저 벡터 계산
    for query in qs:
        if vec_ab.get(query.keyword.name) is None:
            vec_ab[query.keyword.name] = 1
                
        else:
            if query.isPositive == -1:
                vec_ab[query.keyword.name] -= query.isPositive
            else:
                vec_ab[query.keyword.name] += query.isPositive
    vec_honey_ab = []

    for k in keys:
        if vec_ab.get(k) is not None:
            vec_honey_ab.append(vec_ab[k])
        else:
            vec_honey_ab.append(0)
    return vec_honey_ab



def cos_sim(A, B):
    a = np.array(A)
    b = np.array(B)

    return dot(a, b) / (norm(a) * norm(b))


def recom_sys(data):
    """
    유저 이름 혹은 댓글 입력 시 해당 유저/댓글과 유사한 순서로 테마 쿼리셋 리턴
    """
    # 라벨링한 데이터 사용, 추후 변경 필요
    df = pd.read_csv("dataset/thmvec_1121.csv", index_col=0)
    theme = pd.read_csv('dataset/theme.csv', index_col=0)
    t_vec = df.T.to_dict("list")
    # username 전달되면 유저 벡터 가져오기
    if isinstance(data, str) == True:
        user = Users.objects.get(name=data)
        rev_len = user.rev_user_set.all().count()
        qs = user.rk_user_set.all()
        u_vec = getVector(qs, rev_len)
    else:
        u_vec = data.copy()
        # vector

    # 유저와 테마의 코사인 유사도 계산하기
    cos_th = {}
    for th in t_vec.keys():
        grade = theme[theme['id'] == th]['grade'].values[0]
        sim = cos_sim(u_vec, t_vec[th]) + grade * 0.1
        if not np.isnan(sim):
            cos_th[th] = sim

    # 유사도 순서대로 queryset 만들어오기
    cos_th = {k: v for k, v in sorted(cos_th.items(), key=lambda item: item[1], reverse=True)}

    pk_list = cos_th.keys()
    preserved = Case(*[When(pk=pk, then=pos) for pos, pk in enumerate(pk_list)])
    qs = Theme.objects.filter(pk__in=pk_list).order_by(preserved)
    return qs


def popular():
    """
    인기도 순으로 테마 쿼리셋 리턴
    """
    t_qs = Theme.objects.all()
    t_dt = {}
    for query in t_qs:
        t_dt[query.id] = query.grade
    t_dt = {
        k: v for k, v in sorted(t_dt.items(), key=lambda item: item[1], reverse=True)
    }
    preserved = Case(*[When(pk=pk, then=pos) for pos, pk in enumerate(t_dt.keys())])
    return Theme.objects.filter(pk__in=t_dt.keys()).order_by(preserved)


def rndm():
    """
    무작위로 테마 쿼리셋 리턴
    """
    import random

    t_qs = Theme.objects.all()
    r_li = []
    for query in t_qs:
        r_li.append(query.id)
    random.shuffle(r_li)
    preserved = Case(*[When(pk=pk, then=pos) for pos, pk in enumerate(r_li)])
    return Theme.objects.filter(pk__in=r_li).order_by(preserved)
