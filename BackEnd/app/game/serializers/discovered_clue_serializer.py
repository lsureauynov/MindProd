from rest_framework import serializers
from game.models.discovered_clue import DiscoveredClue

class DiscoveredClueSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscoveredClue
        fields = '__all__'