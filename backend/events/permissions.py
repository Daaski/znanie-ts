from rest_framework.permissions import BasePermission
from users.models import Role


class IsAdmin(BasePermission):
    message = 'Вы должны быть админом.'

    def has_permission(self, request, view):
        if request.user.role == Role.ADMIN:
            return True


class IsLector(BasePermission):
    message = 'Вы должны быть лектором.'

    def has_permission(self, request, view):
        if request.user.role == Role.LECTOR:
            return True


class IsEventCreator(BasePermission):
    message = 'Вы должны быть создателем мероприятия'

    def has_object_permission(self, request, view, obj):
        if obj in request.user.created_events.all():
            return True
