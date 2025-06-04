from rest_framework import viewsets
from game.models.dialogue import Dialogue
from game.serializers import DialogueSerializer
from game.permissions.dialogue_permissions import IsDialogueOwner
from rest_framework.permissions import IsAuthenticated

class DialogueViewSet(viewsets.ModelViewSet):
    queryset = Dialogue.objects.all()
    serializer_class = DialogueSerializer
    permission_classes = [IsAuthenticated, IsDialogueOwner]

    def get_queryset(self):
        return Dialogue.objects.filter(player__user=self.request.user)