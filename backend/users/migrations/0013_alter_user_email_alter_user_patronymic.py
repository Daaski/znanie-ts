# Generated by Django 4.2.1 on 2023-05-24 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_alter_user_patronymic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='patronymic',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
