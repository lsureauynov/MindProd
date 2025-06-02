from rest_framework import viewsets
from game.models.scenario import Scenario
from game.models.accusation import Accusation
from game.models.character import Character
from game.models.character_attribute import CharacterAttribute
from game.models.clue import Clue
from game.models.dialogue import Dialogue
from game.models.discovered_clue import DiscoveredClue
from game.models.player import Player
from game.models.session import Session
from game.models.story import Story
from game.serializers import (
    ScenarioSerializer, AccusationSerializer, CharacterSerializer,
    CharacterAttributeSerializer, ClueSerializer,
    DialogueSerializer, DiscoveredClueSerializer, PlayerSerializer,
    SessionSerializer, StorySerializer
)

class ScenarioViewSet(viewsets.ModelViewSet):
    queryset = Scenario.objects.all()
    serializer_class = ScenarioSerializer

class AccusationViewSet(viewsets.ModelViewSet):
    queryset = Accusation.objects.all()
    serializer_class = AccusationSerializer

class CharacterViewSet(viewsets.ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

class CharacterAttributeViewSet(viewsets.ModelViewSet):
    queryset = CharacterAttribute.objects.all()
    serializer_class = CharacterAttributeSerializer

class ClueViewSet(viewsets.ModelViewSet):
    queryset = Clue.objects.all()
    serializer_class = ClueSerializer

class DialogueViewSet(viewsets.ModelViewSet):
    queryset = Dialogue.objects.all()
    serializer_class = DialogueSerializer

class DiscoveredClueViewSet(viewsets.ModelViewSet):
    queryset = DiscoveredClue.objects.all()
    serializer_class = DiscoveredClueSerializer

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
