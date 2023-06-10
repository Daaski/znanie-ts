from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from events.filters import EventFilter
from events.models import Event
from events.paginations import EventPagination
from events.serializers import EventSerializer, EventCreateSerializer, EventUpdateSerializer, EventDeleteSerializer
from events.permissions import IsAdmin, IsLector, IsEventCreator


class EventDetailView(RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = []


class EventListView(ListAPIView):
    queryset = Event.objects.all().order_by('status')
    serializer_class = EventSerializer
    filterset_class = EventFilter
    pagination_class = EventPagination
    authentication_classes = []


class EventCreateView(CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventCreateSerializer
    permission_classes = [IsAuthenticated, IsLector | IsAdmin]


class EventUpdateView(UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventUpdateSerializer
    permission_classes = [IsAuthenticated, IsAdmin | IsEventCreator]
    http_method_names = ['patch']


class EventDeleteView(DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventDeleteSerializer
    permission_classes = [IsAuthenticated, IsLector]
