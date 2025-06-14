import uuid
from django.db import models
from .character import Character
from .clue import Clue

class CharactersRevealClue(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    character = models.ForeignKey(Character, on_delete=models.CASCADE)
    clue = models.ForeignKey(Clue, on_delete=models.CASCADE)
    conditions = models.TextField()
    revelations = models.TextField()
