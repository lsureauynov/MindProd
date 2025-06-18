from rest_framework import serializers
from game.models.accusation import Accusation

class AccusationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accusation
        fields = '__all__'
        read_only_fields = ['is_correct']

    def validate(self, data):
        character = data.get("character")
        session = data.get("session")
        if Accusation.objects.filter(character=character, session=session).exists():
            raise serializers.ValidationError({"character": "You already made an accusation for this character in this session."})
        return data

    def create(self, validated_data):
        character = validated_data.get("character")
        validated_data["is_correct"] = character.is_guilty
        return super().create(validated_data)