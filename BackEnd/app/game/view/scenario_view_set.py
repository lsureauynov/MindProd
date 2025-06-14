from rest_framework.viewsets import ModelViewSet
from game.models.scenario import Scenario
from game.serializers import (ScenarioSerializer)
from drf_spectacular.utils import extend_schema


@extend_schema(tags=['Scenario'])
class ScenarioViewSet(ModelViewSet):
    queryset = Scenario.objects.all()
    serializer_class = ScenarioSerializer
