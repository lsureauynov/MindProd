from rest_framework import serializers
from game.models.dialogue import Dialogue

class DialogueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dialogue
        fields = '__all__'
