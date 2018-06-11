from .base import *

config_secret_production = json.loads(open(CONFIG_SECRET_PROD_FILE).read())

# Database
DATABASES = config_secret_production['django']['databases']


# Allowed Hosts
ALLOWED_HOSTS = [
    'localhost',
    '.elasticbeanstalk.com',
    '.amazonaws.com',
]


# Installed Apps
INSTALLED_APPS += [
    'storages'
]

# AWS S3
# 1. IAM User Secret Info
AWS_ACCESS_KEY_ID = config_secret_production['aws']['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = config_secret_production['aws']['AWS_SECRET_ACCESS_KEY']
# 2. Bucket Info
AWS_STORAGE_BUCKET_NAME = config_secret_production['aws']['AWS_STORAGE_BUCKET_NAME']
AWS_S3_SIGNATURE_VERSION = 's3v4'
AWS_S3_REGION_NAME = 'ap-northeast-2'
S3_URL = f'http://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
# 4. Access Domain
# AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
# 5. Static/Media File Storage

# AWS Storage File Name
STATICFILES_LOCATION = 'static'
MEDIAFILES_LOCATION = 'media'

# S3 FileStorage
DEFAULT_FILE_STORAGE = 'config.storages.MediaStorage'
STATICFILES_STORAGE = 'config.storages.StaticStorage'

DEBUG = False