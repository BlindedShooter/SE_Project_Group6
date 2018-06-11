from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Restaurant, Table, Order, OrderMenuTransaction
from .serializers import RestaurantSerializer, MenuSerializer, OrderSerializer
from rest_framework.decorators import api_view
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage


@api_view(['GET'])
def RestaurantDetailRetrieveView(request, pk):
    """
    특정 pk의 Restaurant 정보 가져오기
    :param request:
    :param pk:
    :return:
    """
    try:
        restaurant = Restaurant.objects.get(pk=pk)
    except Restaurant.DoesNotExist:
        return HttpResponse(status=404)

    serializer = RestaurantSerializer(restaurant)
    return Response(serializer.data)

@api_view(['GET'])
def RestaurantMenuListRetrieveView(request, pk):
    """
    특정 pk의 Restaruant의 Menu List 정보 가져오기
    :param request:
    :param pk:
    :return:
    """
    try:
        restaurant = Restaurant.objects.get(pk=pk)
    except Restaurant.DoesNotExist:
        return HttpResponse(status=404)
    menu_type = request.GET.get('type', 'MAIN')
    menus = restaurant.menu_set.filter(type=menu_type)
    paginator = Paginator(menus, 3)
    page = request.GET.get('page', '1')


    try:
        paged_menus = paginator.page(page)
    except PageNotAnInteger:
        paged_menus = paginator.page(1)
    except EmptyPage:
        paged_menus = paginator.page(paginator.num_pages)

    serializer = MenuSerializer(paged_menus, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def RestaurantOrderCreateView(request, pk):
    """
    특정 pk의 Restaurant에서 특정 table_id로
    들어온 장바구니 내 담아서 주문한 메뉴들을 바탕으로 '주문 내역' 생성하기
    :param request:
    :return:
    """
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
