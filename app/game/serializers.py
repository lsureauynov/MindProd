from rest_framework import serializers
from game.models.scenario import Scenario
from game.models.accusation import Accusation
from game.models.character import Character
from game.models.character import RoleCharacters
from game.models.character_attribute import CharacterAttribute
from game.models.clue import Clue
from game.models.dialogue import Dialogue
from game.models.discovered_clue import DiscoveredClue
from game.models.player import Player
from game.models.session import Session
from game.models.story import Story

class ScenarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scenario
        fields = '__all__'

class AccusationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accusation
        fields = '__all__'

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = '__all__'

class RoleCharactersSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleCharacters
        fields = '__all__'

class CharacterAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharacterAttribute
        fields = '__all__'

class ClueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clue
        fields = '__all__'

class DialogueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dialogue
        fields = '__all__'

class DiscoveredClueSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscoveredClue
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'

