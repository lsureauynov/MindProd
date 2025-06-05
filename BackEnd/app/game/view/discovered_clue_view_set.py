from game.models.discovered_clue import DiscoveredClue
from game.serializers import DiscoveredClueSerializer
from drf_spectacular.utils import extend_schema
from django_filters.rest_framework import DjangoFilterBackend
from game.view.base_view_set import BaseViewSet


@extend_schema(tags=['Discovered Clue'])
class DiscoveredClueViewSet(BaseViewSet):
    queryset = DiscoveredClue.objects.all()
    serializer_class = DiscoveredClueSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['session', 'clue']