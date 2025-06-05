from game.models.dialogue import Dialogue
from game.serializers import DialogueSerializer
from game.permissions.dialogue_permissions import IsDialogueOwner
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from django_filters.rest_framework import DjangoFilterBackend
from game.view.base_view_set import BaseViewSet


@extend_schema(tags=['Dialogue'])
class DialogueViewSet(BaseViewSet):
    queryset = Dialogue.objects.all()
    serializer_class = DialogueSerializer
    permission_classes = [IsAuthenticated, IsDialogueOwner]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['character', 'session', 'player']
    ordering_fields = ['created_at']

    def get_queryset(self):
        return Dialogue.objects.filter(player__user=self.request.user)