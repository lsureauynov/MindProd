from game.models.clue import Clue
from game.serializers import ClueSerializer
from drf_spectacular.utils import extend_schema
from django_filters.rest_framework import DjangoFilterBackend
from game.view.base_view_set import BaseViewSet

@extend_schema(tags=['Clue'])
class ClueViewSet(BaseViewSet):
    queryset = Clue.objects.all()
    serializer_class = ClueSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['story']