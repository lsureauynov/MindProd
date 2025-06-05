from drf_spectacular.utils import extend_schema
from game.view.base_view_set import BaseViewSet
from game.models.character_attribute import CharacterAttribute
from game.serializers import CharacterAttributeSerializer
from django_filters.rest_framework import DjangoFilterBackend


@extend_schema(tags=['character Attribute'])
class CharacterAttributeViewSet(BaseViewSet):
    queryset = CharacterAttribute.objects.all()
    serializer_class = CharacterAttributeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['character', 'clue']
