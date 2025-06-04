from rest_framework import viewsets
from game.models.story import Story
from game.serializers import (StorySerializer)

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
