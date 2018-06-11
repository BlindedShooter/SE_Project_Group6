from django.db import models
from .utils.image_path import (
    restaurant_background_img_path,
    restaurant_logo_img_path,
    menu_thumb_img_path
)
__all__ = (
    'Restaurant',
    'Table',
    'Menu',
    'OrderMenuTransaction',
    'Order',
    'Tag'
)
class Restaurant(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    background_image = models.ImageField(upload_to=restaurant_background_img_path)
    logo_image = models.ImageField(upload_to=restaurant_logo_img_path)
    tags = models.ManyToManyField(
        'Tag',
        related_name='tagged_restaurants',
        blank=True
    )

    def __str__(self):
        return self.name

class Table(models.Model):
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE)
    table_number = models.PositiveSmallIntegerField()
    number_of_seats = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = ('restaurant', 'table_number')

    def __str__(self):
        return f'{self.restaurant}의 {self.table_number}번 테이블'

class Menu(models.Model):
    MAIN = 'MAIN'
    SIDES = 'SIDES'
    BEVERAGES = 'BVGS'
    ETC = 'ETC'
    MENU_TYPE_CHOICES = (
        (MAIN, 'Main'),
        (SIDES, 'Sides'),
        (BEVERAGES, 'Bevarages'),
        (ETC, 'Etc')
    )
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    price = models.PositiveIntegerField()
    thumbnail_image = models.ImageField(upload_to=menu_thumb_img_path)
    type = models.CharField(choices=MENU_TYPE_CHOICES, max_length=5)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']

class OrderMenuTransaction(models.Model):
    PENDING = 'PENDING'
    SERVED = 'SERVED'
    CANCELED = 'CANCELED'
    ORDER_STATUS = (
        (PENDING, 'Pending'),
        (SERVED, 'Served'),
        (CANCELED, 'Canceled'),
    )
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    menu = models.ForeignKey('Menu', on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()
    status = models.CharField(choices=ORDER_STATUS, max_length=8, default=PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    served_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.order.table}: 메뉴: {self.menu} / 수량: {self.quantity} / 상태: {self.status}'

class Order(models.Model):
    table = models.ForeignKey('Table', on_delete=models.CASCADE)
    menus = models.ManyToManyField(
        'Menu',
        related_name='orders',
        through='OrderMenuTransaction',
        through_fields=('order', 'menu')
    )
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'{self.table}의 주문'

class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name