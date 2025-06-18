from game.models.character import Character
from game.serializers import CharacterSerializer
from drf_spectacular.utils import extend_schema
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet


@extend_schema(tags=['Character'])
class CharacterViewSet(ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['story', 'is_guilty', 'role_id']