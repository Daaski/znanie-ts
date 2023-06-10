from django.contrib.auth import get_user_model
from django.db import models
from addresses.models import Address


class Status(models.TextChoices):
    NEW = 'new'
    PASSED = 'passed'


class Event(models.Model):
    name = models.CharField(max_length=150, unique=True)
    about = models.CharField(max_length=500)
    description = models.CharField(max_length=2000)
    start = models.DateTimeField()
    end = models.DateTimeField()
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    status = models.CharField(choices=Status.choices, default=Status.NEW)
    image = models.ImageField(upload_to='event/', default='event/default_event.png')
    lectors = models.ManyToManyField('users.User')

    def __str__(self):
        return self.name
