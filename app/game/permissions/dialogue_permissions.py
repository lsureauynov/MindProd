from rest_framework import permissions
from game.models.dialogue import Dialogue

class IsDialogueOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj: Dialogue):
        if not request.user.is_authenticated:
            return False
        return obj.player.user == request.user

