from rest_framework import permissions
from game.models.session import Session

class IsSessionOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj: Session):
        if not request.user.is_authenticated:
            return False
        return obj.player.user == request.user

