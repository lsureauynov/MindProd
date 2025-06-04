from rest_framework import viewsets
from game.models.discovered_clue import DiscoveredClue
from game.serializers import DiscoveredClueSerializer

class DiscoveredClueViewSet(viewsets.ModelViewSet):
    queryset = DiscoveredClue.objects.all()
    serializer_class = DiscoveredClueSerializer