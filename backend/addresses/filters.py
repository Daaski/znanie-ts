import django_filters
from django_filters import filters
from addresses.models import Address
from events.models import Event


class AddressFilter(django_filters.FilterSet):
    name = filters.CharFilter(field_name='name', lookup_expr='istartswith')

    class Meta:
        model = Address
        fields = ('name',)


class AddressEventFilter(django_filters.FilterSet):
    subject = filters.CharFilter(field_name='address__subject', lookup_expr='istartswith')

    class Meta:
        model = Event
        fields = ('subject',)
