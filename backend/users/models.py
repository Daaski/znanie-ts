from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import UserManager
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from addresses.models import Address
from events.models import Event
from users.hashers import check_password


class Gender(models.TextChoices):
    MALE = 'male', 'М'
    FEMALE = 'female', 'Ж'


class Role(models.TextChoices):
    USER = 'user'
    ADMIN = 'admin'
    LECTOR = 'lector'


class Work(models.Model):
    place = models.CharField(max_length=100, unique=True)
    position = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.place


class University(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Education(models.Model):
    place = models.ForeignKey(University, on_delete=models.CASCADE)
    graduated_year = models.CharField(max_length=4, null=True)
    major = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.place


class User(AbstractBaseUser):
    phone = PhoneNumberField(unique=True)
    surname = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    patronymic = models.CharField(max_length=100, null=True, blank=True)
    birthdate = models.DateField()
    gender = models.CharField(max_length=10, choices=Gender.choices, default=Gender.MALE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True)
    email = models.EmailField(null=True, unique=True, blank=True)
    image = models.ImageField(upload_to='user/', default='user/default_user.png')
    work = models.ForeignKey(Work, on_delete=models.CASCADE, null=True)
    education = models.ForeignKey(Education, on_delete=models.CASCADE, null=True)
    role = models.CharField(max_length=30, choices=Role.choices, default=Role.USER)
    is_active = models.BooleanField(default=True)
    likes = models.ManyToManyField(Event, related_name='likes')
    favourites = models.ManyToManyField(Event, related_name='favourites')
    selected_events = models.ManyToManyField(Event, related_name='selected')
    created_events = models.ManyToManyField(Event, related_name='created')

    objects = UserManager()

    USERNAME_FIELD = 'phone'

    REQUIRED_FIELDS = ['surname', 'name', 'birthdate']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.set_password(self.password)
        return super().save(*args, **kwargs)

    def check_password(self, raw_password):
        def setter(raw_password):
            self.set_password(raw_password)
            self._password = None
            self.save(update_fields=["password"])

        return check_password(raw_password, self.password, setter)

    @property
    def is_user(self):
        return self.role == Role.USER

    @property
    def is_admin(self):
        return self.role == Role.ADMIN

    @property
    def is_superuser(self):
        return self.role == Role.ADMIN

    @property
    def is_staff(self):
        return self.role == Role.ADMIN

    def has_perm(self):
        return self.role == Role.ADMIN

    def has_module_perms(self):
        return self.role == Role.ADMIN
