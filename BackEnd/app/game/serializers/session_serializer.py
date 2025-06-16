from rest_framework import serializers
from game.models.session import Session
from datetime import datetime
from game.config import DEFAULT_REMAINING_LIVES, DEFAULT_SESSION_STATUS, DEFAULT_SESSION_PLAYING_STATUS

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'
        read_only_fields = ['status', 'remaining_lives', 'ended_at', 'created_at']

    def validate(self, data):
        player = data.get("player")
        story = data.get("story")
        if Session.objects.filter(player=player, story=story).exists():
            raise serializers.ValidationError("You already have a session for this story.")
        return data

    def create(self, validated_data):
        validated_data["remaining_lives"] = DEFAULT_REMAINING_LIVES
        validated_data["ended_at"] = None
        validated_data["status"] = DEFAULT_SESSION_STATUS
        return super().create(validated_data)

    def update_to_playing(self, instance, validated_data=None):
        if instance.status == DEFAULT_SESSION_STATUS:
            instance.status = DEFAULT_SESSION_PLAYING_STATUS
            instance.save()
        return instance

    def update_to_finished(self, instance):
        if instance.status not in [DEFAULT_SESSION_STATUS, DEFAULT_SESSION_PLAYING_STATUS]:
            raise serializers.ValidationError("Only sessions with status 'started' or 'playing' can be marked as finished.")
        instance.status = "finished"
        instance.ended_at = datetime.now().date()
        instance.save()
        return instance

    def lose_life(self, instance):
        if instance.remaining_lives > 0:
            instance.remaining_lives -= 1
            if instance.remaining_lives == 0:
                instance.status = "finished"
                instance.ended_at = datetime.now().date()
            instance.save()
        return instance
