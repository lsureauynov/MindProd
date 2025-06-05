from game.models.characters_reveal_clue import CharactersRevealClue
from game.serializers import CharactersRevealClueSerializer
from drf_spectacular.utils import extend_schema
from django_filters.rest_framework import DjangoFilterBackend
from game.view.base_view_set import BaseViewSet


@extend_schema(tags=['Characters Reveal Clue'])
class CharactersRevealClueViewSet(BaseViewSet):
    queryset = CharactersRevealClue.objects.all()
    serializer_class = CharactersRevealClueSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['character', 'clue']

