from rest_framework import serializers
from addresses.models import Address


class AddressSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_type_display')

    class Meta:
        model = Address
        fields = ('pk', 'name', 'subject', 'type')


class AddressEventSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(source='address__subject')

    class Meta:
        model = Address
        fields = ('subject',)
