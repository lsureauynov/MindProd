import uuid
from django.db import models

class Scenario(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    scenario = models.TextField()

    def __str__(self):
        return f"Scenario {self.id}"
