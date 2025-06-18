import uuid
from django.db import models
from .story import Story

class Clue(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default="")
    description = models.TextField()
    image_url = models.TextField()
    story = models.ForeignKey(Story, on_delete=models.CASCADE)

    def __str__(self):
        return self.description[:30]
