from rest_framework import permissions
from game.models.player import Player

class IsPlayerOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj: Player):
        if not request.user.is_authenticated:
            return False
        return obj.user == request.user

