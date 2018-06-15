from django.db import models

#다른 서버에 저장된 식당 및 메뉴와 관련된 이미지 파일들의 경로를 불러옵니다.
from .utils.image_path import (
    restaurant_background_img_path,
    restaurant_logo_img_path,
    menu_thumb_img_path
)

#식당 주인이 admin계정을 통해 식당 관련 데이터를 관리할 수 있는 테이블(model)을 정의합니다.
#각 모델은 파이썬 클래스로 작성되며 front-end React JS 스크립트 언어와 REST API를 통해 정보를 주고 받습니다.
#admin 계정은 Django 프로젝트 생성시 등록하므로 프레임워크 제작자에게 인수인계 받았다고 가정합니다.

__all__ = (
    'Restaurant',
    'Table',
    'Menu',
    'OrderMenuTransaction',
    'Order',
    'Tag'
)

#Restaurant 모델은 레스토랑의 정보를 담는 클래스 테이블입니다.
#식당의 이름, 설명, 태그와 더불어 메인사진과 프로필 사진을 설정할 수 있습니다.
#모든 모델의 primary key는 Django 측에서 자동으로 생성 및 관리함으로-
#따로 코드에 명시하지 않아도 됩니다.

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

#Table 모델은 특정 레스토랑의 테이블 정보를 담습니다.
#Restaurant의 id를 받아와 외래키로 사용하며 테이블 번호와 앉는 인원수를 조절합니다.
class Table(models.Model):
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE)
    table_number = models.PositiveSmallIntegerField()
    number_of_seats = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = ('restaurant', 'table_number')

    def __str__(self):
        return f'{self.restaurant}의 {self.table_number}번 테이블'

#Menu 모델은 식당에서 판매하는 모든 음식들의 정보를 담습니다.
#'MAIN', 'SIDES', 'BEVERAGES', 그리고 'ETC'로 구성되며 multiple choice button을 사용합니다.
#Restaurant의 id를 받아와 외래키로 사용하며 음식의 이름과 설명, 이미지 사진 등을 등록가능합니다.
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

#OrderMenuTransactionrs 모델은 현재 들어온 모든 주문 데이터를 알려주는 테이블입니다.
#Order 모델과 Menu 모델로부터 데이터를 받아와-
#어떤 테이블에서 어떤 메뉴를 주문했는지의 정보를 담습니다.
#수량 및 메뉴를 조정하거나 음식이 주문 상태(Pending)인지, 서빙(Served)되었는지-
#, 취소(Canceled)되었는지 등을 식당 주인이 해당 정보를 갱신가능합니다.
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

#Orders 모델은 특정 테이블의 주문을 알려주는 테이블입니다.
#Table 모델과 Menu 모델로부터 데이터를 받아와-
#어떤 테이블에서 어떤 메뉴를 주문했는지의 정보를 담습니다.
#이는 OrderMenuTransaction 모델에서 pending order(주문 상태) 정보를 담기 위해-
#필요한 모델입니다.
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

#Tag 모델은 식당을 등록할 때 쓰는 태그들을 생성하고 관리합니다.
#간단한 string 변수로 관리됩니다.
class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
