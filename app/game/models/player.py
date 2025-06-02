from django.db import models
import uuid

from user.models.user import User

class Player(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.TextField(unique=True)
    image_url = models.TextField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.username
