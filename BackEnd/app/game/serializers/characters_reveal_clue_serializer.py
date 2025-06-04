from rest_framework import serializers
from game.models.characters_reveal_clue import CharactersRevealClue

class CharactersRevealClueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharactersRevealClue
        fields = '__all__'

