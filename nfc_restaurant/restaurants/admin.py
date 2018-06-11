from django.contrib import admin
from .models import *

restaurants_models = [
    Restaurant,
    Table,
    Menu,
    OrderMenuTransaction,
    Order,
    Tag
]

admin.site.register(restaurants_models)