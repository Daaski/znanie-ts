# Generated by Django 4.2.1 on 2023-05-24 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_remove_user_events_user_created_events_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='patronymic',
            field=models.CharField(max_length=100, null=True),
        ),
    ]