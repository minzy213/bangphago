import os, sys
# PWD = os.getenv('PWD')
PWD = os.path.abspath('.')

PROJ_MISSING_MSG = """Set an enviroment variable:\n
`DJANGO_PROJECT=your_project_name`\n
or call:\n
`init_django(your_project_name)`
"""

def init_django(project_name=None):
    os.chdir(PWD)
    project_name = project_name or os.environ.get('DJANGO_PROJECT') or None
    if project_name == None:
        raise Exception(PROJ_MISSING_MSG)
    sys.path.insert(0, os.getenv('PWD'))
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', f'{project_name}.settings')
    os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
    import django
    django.setup()
    
init_django('bangpago') #project name

from backend.models import Theme, Keyword, Users, Review, ReviewKeyword, UserVector, ThemeVector
import json
from emoji import core
import pandas as pd
from tqdm import tqdm
from django.db.models import Case, When
import numpy as np
from numpy import dot
from numpy.linalg import norm

# 저장된 keyword object dictionary에 저장
keys = ['guide', 'light', 'interior', 'story', 'probability', 'creativity', 'production', 'activity', 'scale', 'fear', 'device', 'fun', 'service']
keywords = {}
for key in keys:
    keywords[key] = Keyword.objects.get(name=key)
    
pred = pd.read_csv('dataset/pred.csv', index_col=0)
rev_all = pd.read_csv('reviews.csv', index_col=0)
rev_all = rev_all.iloc[pred.index].fillna('')
## train/test 나누기
train_idx = []
test_idx = []
for name, rev in rev_all.groupby('userName'):
    rev = rev.sort_values('playDate')
    idx = int(len(rev)*0.7)
    train_idx += rev[:idx].index.tolist()
    test_idx += rev[idx:].index.tolist()
    
len(train_idx), len(test_idx)
# train_df = review.loc[train_idx]
# test_df = review.loc[test_idx]
pred = pred.loc[train_idx]

# review keyword DB에 저장
rev_k = []
for idx, row in tqdm(pred.iterrows()):
    rv = Review.objects.filter(id=row['id'])
    if len(rv) > 0:
        rv = rv[0]
        for key in keys:
            if row[key] != 0:
                rev_k.append(ReviewKeyword(review=rv ,keyword=keywords[key], isPositive=row[key], user=rv.user, theme=rv.theme))
    if len(rev_k) > 10:
        ReviewKeyword.objects.bulk_create(rev_k)
        rev_k = []
        
# 유저 벡터 저장하기
# nan 빼고 다시 저장 필요
rev_all.fillna('')
rev_all = rev_all[rev_all['userName'] != '']
uservectors = []
print('유저 벡터 저장')
for name in tqdm(rev_all['userName'].unique()):
    user = Users.objects.filter(name=name)
    if len(user) > 0:
        user = user[0]
    else:
        continue
    
    qs = user.rk_user_set.all()
    if len(qs) == 0:
        continue
    vector = {}
    for query in qs:
        if vector.get(query.keyword) is None:
            vector[query.keyword] = query.isPositive
        else:
            vector[query.keyword] += query.isPositive
    for vec in vector.keys():
        uservectors.append(UserVector(user=user, keyword=vec, value=vector[vec]))
    if len(uservectors) > 10:
        UserVector.objects.bulk_create(uservectors)
        uservectors = []
        
       
# 테마 벡터 저장하기
rev_all = pd.read_csv('dataset/reviews.csv')
thmvectors = []
print('테마 벡터 저장')
for t_id in tqdm(rev_all['themeId'].unique()):
    thm = Theme.objects.filter(pk=t_id)
    if len(thm) > 0:
        thm = thm[0]
    else:
        continue
    qs = thm.rk_theme_set.all()
    if len(qs) == 0:
        continue
    vector = {}
    for query in qs:
        if vector.get(query.keyword) is None:
            vector[query.keyword] = query.isPositive
        else:
            vector[query.keyword] += query.isPositive
    for vec in vector.keys():
        thmvectors.append(ThemeVector(theme=thm, keyword=vec, value=vector[vec]))
    if len(thmvectors) > 10:
        ThemeVector.objects.bulk_create(thmvectors)
        thmvectors = []
        
