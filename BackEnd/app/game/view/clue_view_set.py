from rest_framework.viewsets import ModelViewSet
from game.models.clue import Clue
from game.serializers import ClueSerializer
from drf_spectacular.utils import extend_schema
from django_filters.rest_framework import DjangoFilterBackend

@extend_schema(tags=['Clue'])
class ClueViewSet(ModelViewSet):
    queryset = Clue.objects.all()
    serializer_class = ClueSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['story']