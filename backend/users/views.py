from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from djoser.views import UserViewSet
from events.models import Event
from events.permissions import IsLector
from events.serializers import UserEventListSerializer
from users.filters import UniversityFilter, AuthorFilter
from users.models import User, University, Role
from users.serializers import UniversitySerializer, CheckPhoneSerializer, \
    UserUpdateSerializer, LectorSerializer, BecomeLectorSerializer, UserImageUploadSerializer
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated


class CustomUserViewSet(UserViewSet):
    def get_serializer_class(self):
        if self.action == 'me' and self.request.method == 'PATCH':
            return UserUpdateSerializer
        elif self.action == 'check_phone':
            return CheckPhoneSerializer
        elif self.action == 'upload_image':
            return UserImageUploadSerializer
        elif self.action == 'become_lector':
            return BecomeLectorSerializer
        elif self.action in ['favourite', 'like',  'created_event', 'selected_event']:
            return UserEventListSerializer
        return super().get_serializer_class()

    def get_permissions(self):
        if self.action == 'check_phone':
            self.authentication_classes = []
            self.permission_classes = [AllowAny]
        elif self.action in ['upload_image', 'become_lector', 'favourite',  'like', 'selected_event']:
            self.permission_classes = [IsAuthenticated]
        elif self.action == 'created_event':
            self.permission_classes = [IsAuthenticated, IsLector]
        return super().get_permissions()

    @action(['post'], detail=False)
    def check_phone(self, request, *args, **kwargs):
        self.serializer_class = self.get_serializer_class()
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)

    def event_action(self, request, field, pk, *args, **kwargs):
        user = request.user
        self.serializer_class = self.get_serializer_class()

        if self.request.method == 'POST':
            event = get_object_or_404(Event, pk=pk)
            getattr(user, field).add(event)
            user.save()

        if self.request.method == 'DELETE':
            event = get_object_or_404(Event, pk=pk)
            getattr(user, field).remove(event)
            user.save()

        self.queryset = getattr(user, field).all()
        return super().list(request, *args, **kwargs)

    @action(['post', 'delete'], detail=False, url_path='like/event/(?P<pk>[0-9]+)')
    def like(self, request, pk=None, *args, **kwargs):
        return self.event_action(request, 'likes', pk, *args, **kwargs)

    @action(['post', 'delete'], detail=False, url_path='favourite/event/(?P<pk>[0-9]+)')
    def favourite(self, request, pk=None, *args, **kwargs):
        return self.event_action(request, 'favourites', pk, *args, **kwargs)

    @action(['post', 'delete'], detail=False, url_path='created_event/event/(?P<pk>[0-9]+)')
    def created_event(self, request, pk=None, *args, **kwargs):
        return self.event_action(request, 'created_events', pk, *args, **kwargs)

    @action(['post', 'delete'], detail=False, url_path='selected_event/event/(?P<pk>[0-9]+)')
    def selected_event(self, request, pk=None, *args, **kwargs):
        return self.event_action(request, 'selected_events', pk, *args, **kwargs)

    @action(['patch'], detail=False)
    def become_lector(self, request, *args, **kwargs):
        self.serializer_class = self.get_serializer_class()
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.get_instance()
        serializer.update(user, serializer.data)
        return Response(self.serializer_class(user).data)

    @action(['patch'], detail=False)
    def upload_image(self, request, *args, **kwargs):
        self.serializer_class = self.get_serializer_class()
        serializer = self.serializer_class(instance=self.get_instance(), data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UniversityListView(ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    filterset_class = UniversityFilter


class LectorListView(ListAPIView):
    queryset = User.objects.all().filter(role=Role.LECTOR)
    serializer_class = LectorSerializer
    filterset_class = AuthorFilter


class LectorDetailView(RetrieveAPIView):
    queryset = User.objects.all().filter(role=Role.LECTOR)
    serializer_class = LectorSerializer
