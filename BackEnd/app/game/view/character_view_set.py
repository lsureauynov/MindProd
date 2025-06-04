from rest_framework import viewsets
from game.models.character import Character
from game.serializers import CharacterSerializer

class CharacterViewSet(viewsets.ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer