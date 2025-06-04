import uuid
from django.db import models
from .character import Character
from .session import Session
from .player import Player

class Dialogue(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    character = models.ForeignKey(Character, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    character_answer = models.TextField()
    player_question = models.TextField()
    created_at = models.DateField(auto_now_add=True)
