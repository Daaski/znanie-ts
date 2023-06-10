from django.contrib.sites.shortcuts import get_current_site
from rest_framework import serializers

from addresses.models import Address
from addresses.serializers import AddressSerializer
from users.models import User, University, Education, Work, Role


class EducationSerializer(serializers.ModelSerializer):
    place_pk = serializers.CharField(source='place.pk')
    place_name = serializers.CharField(source='place.name')

    class Meta:
        model = Education
        fields = ('place_pk', 'place_name', 'graduated_year', 'major')


class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = ('place', 'position')


class UserCreateSerializer(serializers.ModelSerializer):
    role = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ('surname', 'name', 'birthdate', 'password', 'phone', 'role')


class UserDetailSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    phone = serializers.CharField(read_only=True)
    education = EducationSerializer(read_only=True)
    work = WorkSerializer(read_only=True)
    address = AddressSerializer(read_only=True)
    role = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = (
            'pk', 'phone', 'surname', 'name', 'patronymic', 'birthdate', 'email',
            'gender', 'address', 'education', 'work', 'role'
        )


class UserUpdateSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    phone = serializers.CharField(read_only=True)
    education = EducationSerializer(read_only=True)
    work = WorkSerializer(read_only=True)
    address = AddressSerializer(read_only=True)
    role = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = (
            'pk', 'phone', 'surname', 'name', 'patronymic', 'birthdate', 'email',
            'gender', 'address', 'education', 'work', 'role'
        )

    def is_valid(self, *, raise_exception=False):
        self.education = self.initial_data.pop('education', {})
        self.work = self.initial_data.pop('work', {})
        self.address = self.initial_data.pop('address', {})
        return super().is_valid(raise_exception=raise_exception)

    def update(self, instance, validated_data):
        user = super().update(instance, validated_data)

        if self.education.get('place', 0) != 0:
            education = user.education

            if not user.education:
                education = Education()

            education.graduated_year = self.education.get('graduated_year')
            education.major = self.education.get('major')
            education.place = University.objects.get(pk=self.education.get('place'))

            education.save()

            user.education = education

        if self.address != 0:
            user.address = Address.objects.get(pk=self.address)

        if self.work.get('place', '') != '':
            work, _ = Work.objects.get_or_create(place=self.work.get('place'))

            if not work.position:
                work.position = self.work.get('position')

            work.save()
            user.work = work

        user.save()
        return user


class LectorSerializer(serializers.ModelSerializer):
    place = serializers.CharField(source='work.place', read_only=True, default='')
    position = serializers.CharField(source='work.position', read_only=True, default='')

    class Meta:
        model = User
        fields = ('pk', 'name', 'surname', 'place', 'position', 'image')


class CheckPhoneSerializer(serializers.ModelSerializer):
    exist = serializers.BooleanField(read_only=True)
    password = serializers.CharField(read_only=True)
    phone = serializers.CharField()

    def validate(self, data):
        phone = data.get('phone')

        try:
            user = User.objects.get(phone=phone)
            data['exist'] = True
            data['password'] = user.password
        except:
            data['exist'] = False
            data['password'] = None

        return data

    class Meta:
        model = User
        fields = ('phone', 'exist', 'password')


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ('pk', 'name')


class BecomeLectorSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(read_only=True)
    patronymic = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    education = EducationSerializer(read_only=True)
    work = WorkSerializer(read_only=True)
    address = AddressSerializer(read_only=True)
    role = serializers.CharField(read_only=True)

    def update(self, instance, validated_data):
        if instance.role == Role.ADMIN:
            raise serializers.ValidationError({'role': ['Администратор не может стать лектором.']})

        if instance.role == Role.LECTOR:
            raise serializers.ValidationError({'role': ['Вы уже являетесь лектором.']})

        instance.role = Role.LECTOR
        instance.save()

        return instance

    class Meta:
        model = User
        fields = (
            'pk', 'phone', 'surname', 'name', 'patronymic', 'birthdate', 'email',
            'gender', 'address', 'education', 'work', 'role'
        )


class UserImageUploadSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=True)

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image')
        instance.save()

        return instance

    def to_representation(self, instance):
        request = self.context.get('request')
        current_site = get_current_site(request)
        image_url = 'http://{}{}'.format(current_site, instance.image.url)
        return {'image': image_url}

    class Meta:
        model = User
        fields = ('image',)
