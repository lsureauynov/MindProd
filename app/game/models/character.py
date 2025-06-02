import uuid
from django.db import models

from .story import Story

class RoleCharacters(models.TextChoices):
    SUSPECT = 'suspect'
    WITNESS = 'witness'

class Character(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField()
    role_id = models.CharField(max_length=20, choices=RoleCharacters.choices)
    image_url = models.TextField()
    is_guilty = models.BooleanField()
    personality = models.TextField()
    story = models.ForeignKey(Story, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
