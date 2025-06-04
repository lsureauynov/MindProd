from rest_framework import serializers
from game.models.scenario import Scenario

class ScenarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scenario
        fields = '__all__'
