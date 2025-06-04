from rest_framework import viewsets
from game.models.session import Session
from game.serializers import SessionSerializer
from game.permissions.session_permissions import IsSessionOwner
from rest_framework.permissions import IsAuthenticated

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated, IsSessionOwner]

    def get_queryset(self):
        return Session.objects.filter(player__user=self.request.user)