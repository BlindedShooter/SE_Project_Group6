# Generated by Django 2.0.5 on 2018-05-28 15:30

from django.db import migrations, models
import django.db.models.deletion
import restaurants.utils.image_path


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=200)),
                ('price', models.PositiveSmallIntegerField()),
                ('thumbnail_image', models.ImageField(upload_to=restaurants.utils.image_path.menu_thumb_img_path)),
                ('type', models.CharField(choices=[('MAIN', 'Main'), ('SIDES', 'Sides'), ('BVGS', 'Bevarages'), ('ETC', 'Etc')], max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='OrderTransaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurants.Menu')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurants.Order')),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=200)),
                ('background_image', models.ImageField(upload_to=restaurants.utils.image_path.restaurant_background_img_path)),
                ('logo_image', models.ImageField(upload_to=restaurants.utils.image_path.restaurant_logo_img_path)),
            ],
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table_number', models.PositiveSmallIntegerField()),
                ('number_of_seats', models.PositiveSmallIntegerField()),
                ('ordered_menus', models.ManyToManyField(blank=True, related_name='ordering_tables', through='restaurants.OrderTransaction', to='restaurants.Menu')),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurants.Restaurant')),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='restaurant',
            name='tags',
            field=models.ManyToManyField(related_name='tagged_restaurants', to='restaurants.Tag'),
        ),
        migrations.AddField(
            model_name='ordertransaction',
            name='table',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurants.Table'),
        ),
        migrations.AddField(
            model_name='menu',
            name='restaurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurants.Restaurant'),
        ),
    ]
