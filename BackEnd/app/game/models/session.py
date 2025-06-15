import uuid
from django.db import models
from .player import Player
from .story import Story

class SessionStatus(models.TextChoices):
    STARTED = 'started'
    PLAYING = 'playing'
    FINISHED = 'finished'

class Session(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='session')
    created_at = models.DateField(auto_now_add=True)
    ended_at = models.DateField(null=True, blank=True)
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=SessionStatus.choices)
    remaining_lives = models.IntegerField()

    def __str__(self):
        return f"Session {self.id} ({self.status})"
