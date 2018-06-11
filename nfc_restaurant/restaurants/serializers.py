from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from restaurants.models import Restaurant, Menu, Order, Table, OrderMenuTransaction


class RestaurantSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    class Meta:
        model = Restaurant
        fields = (
            'id',
            'name',
            'description',
            'background_image',
            'logo_image',
            'tags'
        )

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = (
            'id',
            'name',
            'description',
            'price',
            'thumbnail_image',
            'type'
        )

class OrderSerializer(serializers.ModelSerializer):

    table_id = PrimaryKeyRelatedField(queryset=Table.objects.all(), write_only=True)
    menus = serializers.ListField()
    class Meta:
        model = Order
        fields = (
            'id',
            'table_id',
            'menus'
        )

    def create(self, validated_data):
        print(validated_data)
        # 주문 생성
        order = Order.objects.create(table=validated_data['table_id'])
        # 주문 안의 메뉴 주문 내역들 생성
        order_menu_transactions = [
            OrderMenuTransaction(
                order=order,
                menu=Menu.objects.get(pk=menu_id),
                quantity=1,
            )
            for menu_id in validated_data['menus']
        ]
        return OrderMenuTransaction.objects.bulk_create(order_menu_transactions)