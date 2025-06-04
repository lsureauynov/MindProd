from rest_framework import serializers
from game.models.character_attribute import CharacterAttribute

class CharacterAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharacterAttribute
        fields = '__all__'