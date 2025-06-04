from rest_framework import viewsets
from game.models.character_attribute import CharacterAttribute
from game.serializers import CharacterAttributeSerializer

class CharacterAttributeViewSet(viewsets.ModelViewSet):
    queryset = CharacterAttribute.objects.all()
    serializer_class = CharacterAttributeSerializer
