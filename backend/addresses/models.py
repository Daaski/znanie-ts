from django.db import models


class Type(models.TextChoices):
    CITY = 'city', 'г.'
    VILLAGE = 'village', 'д.'


class Address(models.Model):
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100, null=True)
    type = models.CharField(choices=Type.choices, default=Type.CITY)

    def __str__(self):
        return self.name
