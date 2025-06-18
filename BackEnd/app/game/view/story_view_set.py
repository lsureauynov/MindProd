from rest_framework.viewsets import ModelViewSet
from game.models.story import Story
from game.serializers import (StorySerializer)
from drf_spectacular.utils import extend_schema
from django_filters.rest_framework import DjangoFilterBackend


@extend_schema(tags=['Story'])
class StoryViewSet(ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['scenario']
