from game.models.player import Player
from game.serializers import PlayerSerializer, PlayerStatsSerializer
from game.permissions import IsPlayerOwner
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from django_filters.rest_framework import DjangoFilterBackend
from game.view.base_view_set import BaseViewSet


@extend_schema(tags=['Player'])
class PlayerViewSet(BaseViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticated, IsPlayerOwner]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user', 'session']

    def get_queryset(self):
        return Player.objects.filter(user=self.request.user)

@extend_schema(tags=['Player Stats'])
class PlayerStatsViewSet(BaseViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerStatsSerializer
    permission_classes = [IsAuthenticated, IsPlayerOwner]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user', 'session']

    def get_queryset(self):
        return Player.objects.filter(user=self.request.user)