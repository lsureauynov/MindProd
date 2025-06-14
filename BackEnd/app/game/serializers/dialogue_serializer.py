from rest_framework import serializers
from game.models.dialogue import Dialogue
from ia.dialogueengine import DialogueEngine

class DialogueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dialogue
        fields = '__all__'
        read_only_fields = ['character_answer']

    def create(self, validated_data):
        character = validated_data['character']
        session = validated_data['session']
        player = validated_data['player']
        question = validated_data['player_question']

        orchestrator = DialogueEngine(character, session, player, question)
        answer= orchestrator.run()

        validated_data['character_answer'] = answer
        return super().create(validated_data)
