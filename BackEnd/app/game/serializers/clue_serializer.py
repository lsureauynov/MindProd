from rest_framework import serializers
from game.models.clue import Clue

class ClueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clue
        fields = '__all__'

