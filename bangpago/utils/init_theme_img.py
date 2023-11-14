import os
import tqdm
from backend.models import Theme

filelist = os.listdir('./media/theme')
filelist.remove('no_img.png')

id_list = [int(file.split('.')[0]) for file in filelist]

theme_list = Theme.objects.filter(id__in=id_list).all()
for theme in tqdm.tqdm(theme_list):
    theme.image = f'theme/{theme.id}.png'
    theme.save()