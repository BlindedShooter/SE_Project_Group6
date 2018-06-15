from django.contrib import admin
from .models import *

#작성한 model들을 실제 admin 관리 사이트에 등록합니다.
#등록된 model들에 한해서 관리자(식당 주인)은 관련 데이터를 간편하게 등록 및 수정가능합니다. 
restaurants_models = [
    Restaurant,
    Table,
    Menu,
    OrderMenuTransaction,
    Order,
    Tag
]

admin.site.register(restaurants_models)
