import uuid
from django.db import models
from .clue import Clue
from .session import Session

class DiscoveredClue(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    clue = models.ForeignKey(Clue, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('session', 'clue')
