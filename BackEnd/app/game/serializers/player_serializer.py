from rest_framework import serializers
from game.models.player import Player

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = '__all__'

class PlayerStatsSerializer(serializers.ModelSerializer):
    stats = serializers.SerializerMethodField()

    class Meta:
        model = Player
        fields = '__all__'

    def get_stats(self, obj):
        sessions = obj.sessions.all()
        return {
            'started': sessions.filter(status='started').count(),
            'finished': sessions.filter(status='finished').count(),
            'survivals': sessions.filter(status='finished', remaining_lives__gt=0).count()
        }

