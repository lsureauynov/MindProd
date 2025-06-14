from game.models.characters_reveal_clue import CharactersRevealClue
from game.serializers import CharactersRevealClueSerializer
from drf_spectacular.utils import extend_schema
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet


@extend_schema(tags=['Characters Reveal Clue'])
class CharactersRevealClueViewSet(ModelViewSet):
    queryset = CharactersRevealClue.objects.all()
    serializer_class = CharactersRevealClueSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['character', 'clue']

