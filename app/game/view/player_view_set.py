from rest_framework import viewsets
from game.models.player import Player
from game.serializers import PlayerSerializer
from game.permissions import IsPlayerOwner
from rest_framework.permissions import IsAuthenticated

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticated, IsPlayerOwner]

    def get_queryset(self):
        return Player.objects.filter(user=self.request.user)
