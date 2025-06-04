from rest_framework import serializers
from game.models.session import Session

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

    def validate(self,data):
        player = data.get("player")
        story = data.get("story")
        if Session.objects.filter(player=player, story=story).exists():
            raise serializers.ValidationError("You already have a session for this story.")