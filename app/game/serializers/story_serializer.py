from rest_framework import serializers
from game.models.story import Story

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'
