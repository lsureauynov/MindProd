from rest_framework import viewsets
from game.models.characters_reveal_clue import CharactersRevealClue
from game.serializers import CharactersRevealClueSerializer

class CharactersRevealClueViewSet(viewsets.ModelViewSet):
    queryset = CharactersRevealClue.objects.all()
    serializer_class = CharactersRevealClueSerializer
