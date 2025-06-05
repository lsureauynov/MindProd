from game.models.scenario import Scenario
from game.serializers import (ScenarioSerializer)
from drf_spectacular.utils import extend_schema
from game.view.base_view_set import BaseViewSet


@extend_schema(tags=['Scenario'])
class ScenarioViewSet(BaseViewSet):
    queryset = Scenario.objects.all()
    serializer_class = ScenarioSerializer
