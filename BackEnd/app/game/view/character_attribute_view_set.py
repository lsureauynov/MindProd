from drf_spectacular.utils import extend_schema
from game.models.character_attribute import CharacterAttribute
from game.serializers import CharacterAttributeSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet


@extend_schema(tags=['character Attribute'])
class CharacterAttributeViewSet(ModelViewSet):
    queryset = CharacterAttribute.objects.all()
    serializer_class = CharacterAttributeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['character', 'clue']
