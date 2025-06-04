from rest_framework import viewsets
from game.models.scenario import Scenario
from game.serializers import (ScenarioSerializer)

class ScenarioViewSet(viewsets.ModelViewSet):
    queryset = Scenario.objects.all()
    serializer_class = ScenarioSerializer