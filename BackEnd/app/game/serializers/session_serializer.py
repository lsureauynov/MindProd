from contextlib import nullcontext

from rest_framework import serializers
from game.models.session import Session
from datetime import datetime
from game.config import DEFAULT_REMAINING_LIVES, DEFAULT_SESSION_STATUS, DEFAULT_SESSION_PLAYING_STATUS

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

    def validate(self,data):
        player = data.get("player")
        story = data.get("story")
        if Session.objects.filter(player=player, story=story).exists():
            raise serializers.ValidationError("You already have a session for this story.")

    def create(self, validated_data):
        validated_data["remaining_lives"] = DEFAULT_REMAINING_LIVES
        validated_data["ended_at"] = nullcontext()
        validated_data["status"] = DEFAULT_SESSION_STATUS
        return super().create(validated_data)

    def update_to_playing(self, instance, validated_data):
        if instance.status == DEFAULT_SESSION_STATUS:
            instance.status = DEFAULT_SESSION_PLAYING_STATUS
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def update_to_finished(self, instance):
        if instance.status != DEFAULT_SESSION_STATUS or instance.status != DEFAULT_SESSION_PLAYING_STATUS:
            raise serializers.ValidationError("Only sessions with status 'started' can be marked as finished.")
        instance.status = "finished"
        instance.ended_at = datetime.now()
        instance.save()
        return instance

    def update_to_lost(self, instance):
        if instance.remaining_lives != 0:
            raise serializers.ValidationError("Session must have 0 remaining lives to be marked as lost.")
        instance.status = "lost"
        instance.ended_at = datetime.now()
        instance.save()
        return instance
