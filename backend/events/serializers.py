from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from addresses.models import Address
from addresses.serializers import AddressSerializer
from events.models import Event
from users.models import User
from users.serializers import LectorSerializer


class EventSerializer(serializers.ModelSerializer):
    address = AddressSerializer(read_only=True)
    lectors = LectorSerializer(read_only=True, many=True)

    class Meta:
        model = Event
        fields = ('pk', 'name', 'about', 'description', 'start', 'end', 'address', 'status', 'image', 'lectors')


class EventCreateSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    status = serializers.CharField(read_only=True)
    name = serializers.CharField(required=True)
    address = AddressSerializer(read_only=True)
    image = serializers.ImageField(required=True)
    creator = serializers.IntegerField(read_only=True)

    def validate(self, attrs):
        if attrs['start'] > attrs['end']:
            raise ValidationError('Дата начала должна быть больше даты конца')

        user = attrs.pop('user')
        if user not in attrs['lectors']:
            attrs['lectors'].append(user)

        return super().validate(attrs)

    def is_valid(self, *, raise_exception=False):
        self.address = self.initial_data.get('address', {})
        return super().is_valid(raise_exception=raise_exception)

    def create(self, validated_data):
        if not self.address or self.address == 0:
            raise ValidationError({'address': ['Обязательное поле.']})

        validated_data['address'] = Address.objects.get(pk=self.address)

        event = super().create(validated_data)

        return event

    class Meta:
        model = Event
        fields = (
            'pk', 'name', 'about', 'image', 'description', 'start', 'end', 'status', 'address', 'lectors', 'creator',
            'user')


class EventUpdateSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    status = serializers.CharField(read_only=True)
    name = serializers.CharField(required=True)
    address = AddressSerializer(read_only=True)
    image = serializers.ImageField(required=True)

    def validate(self, attrs):
        if attrs.get('start', 0) > attrs.get('end', -1):
            raise ValidationError('Дата начала должна быть больше даты конца')

        user = self.context['request'].user

        if user not in attrs['lectors']:
            attrs['lectors'].append(user)

        return super().validate(attrs)

    def is_valid(self, *, raise_exception=False):
        self.address = self.initial_data.get('address', {})
        return super().is_valid(raise_exception=raise_exception)

    def update(self, instance, validated_data):
        if self.address and not self.address == 0:
            validated_data['address'] = Address.objects.get(pk=self.address)

        event = super().update(instance, validated_data)

        return event

    class Meta:
        model = Event
        fields = ('pk', 'name', 'about', 'image', 'description', 'start', 'end', 'status', 'address', 'lectors')


class UserDetailSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(read_only=True)
    phone = serializers.CharField(read_only=True)
    email = serializers.CharField(default='')
    address_pk = serializers.IntegerField(source='address.pk', read_only=True, default=0)
    address_name = serializers.CharField(source='address.name', read_only=True, default='')
    address_subject = serializers.CharField(source='address.subject', read_only=True, default='')
    education_graduated_year = serializers.CharField(source='education.graduated_year', read_only=True, default='')
    education_major = serializers.CharField(source='education.major', read_only=True, default='')
    education_place = serializers.CharField(source='education.place.name', read_only=True, default='')
    education_pk = serializers.IntegerField(source='education.place.pk', read_only=True, default=0)
    work_place = serializers.CharField(source='work.place', read_only=True, default='')
    work_position = serializers.CharField(source='work.position', read_only=True, default='')
    likes = EventSerializer(many=True)
    favourites = EventSerializer(many=True)
    selected_events = EventSerializer(many=True)
    created_events = EventSerializer(many=True)
    role = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = (
            'pk', 'phone', 'surname', 'name', 'patronymic', 'birthdate', 'email',
            'gender', 'image', 'work_place', 'work_position',
            'education_graduated_year', 'education_major', 'education_place', 'education_pk',
            'address_pk', 'address_name', 'address_subject', 'likes',
            'favourites', 'selected_events', 'created_events', 'role'
        )


class UserEventListSerializer(EventSerializer):
    name = serializers.CharField(read_only=True)
    start = serializers.DateTimeField(read_only=True)
    end = serializers.DateTimeField(read_only=True)
    status = serializers.CharField(read_only=True)


class EventDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
