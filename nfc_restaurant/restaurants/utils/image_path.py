def restaurant_background_img_path(instance, filename):
    # 업로드한 레스토랑 배경 이미지 파일 저장 경로
    return f'restaurants/background_img/{instance.__str__()}/{filename}'

def restaurant_logo_img_path(instance, filename):
    # 업로드한 레스토랑 로고 이미지 파일 저장 경로
    return f'restaurants/logo_img/{instance.__str__()}/{filename}'

def menu_thumb_img_path(instance, filename):
    # 업로드한 메뉴 썸네일 이미지 파일 저장 경로
    return f'menus/thumb_img/{instance.__str__()}/{filename}'