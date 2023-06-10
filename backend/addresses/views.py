from rest_framework.generics import ListAPIView

from addresses.filters import AddressFilter, AddressEventFilter
from addresses.models import Address
from addresses.serializers import AddressSerializer, AddressEventSerializer
from events.models import Event


class AddressListView(ListAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    filterset_class = AddressFilter
    authentication_classes = []


class AddressEventListView(ListAPIView):
    queryset = Event.objects.values('address__subject').distinct('address__subject')
    serializer_class = AddressEventSerializer
    filterset_class = AddressEventFilter
    authentication_classes = []
