from rest_framework import viewsets
from game.models.clue import Clue
from game.serializers import ClueSerializer

class ClueViewSet(viewsets.ModelViewSet):
    queryset = Clue.objects.all()
    serializer_class = ClueSerializer