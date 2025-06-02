from django.db import models
import uuid

from .scenario import Scenario

class Story(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=150)
    resume = models.TextField()
    image_url = models.TextField()
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
