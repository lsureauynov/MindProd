from game.models.accusation import Accusation
from rest_framework import viewsets
from game.serializers import (AccusationSerializer)

class AccusationViewSet(viewsets.ModelViewSet):
    queryset = Accusation.objects.all()
    serializer_class = AccusationSerializer
