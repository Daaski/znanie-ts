# Generated by Django 4.2.1 on 2023-05-25 20:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0007_alter_event_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='image',
        ),
    ]
