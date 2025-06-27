from rest_framework.viewsets import ModelViewSet

from game.models.dialogue import Dialogue
from game.serializers import DialogueSerializer
from game.permissions.dialogue_permissions import IsDialogueOwner
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from django_filters.rest_framework import DjangoFilterBackend
from django.core.cache import cache
from rest_framework.response import Response
from time import time

@extend_schema(tags=['Dialogue'])
class DialogueViewSet(ModelViewSet):
    queryset = Dialogue.objects.all()
    serializer_class = DialogueSerializer
    permission_classes = [IsAuthenticated, IsDialogueOwner]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['character', 'session', 'player']
    ordering_fields = ['created_at']

    CACHE_TIMEOUT = 10

    def get_queryset(self):
        return Dialogue.objects.filter(player__user=self.request.user)

    def list(self, request, *args, **kwargs):
        player_id = request.query_params.get("player")
        character_id = request.query_params.get("character")
        session_id = request.query_params.get("session")

        if not all([player_id, character_id, session_id]):
            # Si un des éléments est manquant, pas de cache
            response = super().list(request, *args, **kwargs)
            response['X-Cache'] = 'BYPASS'
            return response

        cache_key = f"dialogues_user_{player_id}_character_{character_id}_session_{session_id}"
        meta_key = f"{cache_key}_meta"

        cached_data = cache.get(cache_key)
        cached_time = cache.get(meta_key)

        if cached_data is not None and cached_time is not None:
            remaining = max(0, self.CACHE_TIMEOUT - int(time() - cached_time))
            response = Response(cached_data)
            response['X-Cache'] = 'HIT'
            response['X-Cache-Timeout'] = f'{remaining}s'
            return response

        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, timeout=self.CACHE_TIMEOUT)
        cache.set(meta_key, time(), timeout=self.CACHE_TIMEOUT)

        response['X-Cache'] = 'MISS'
        response['X-Cache-Timeout'] = f'{self.CACHE_TIMEOUT}s'
        return response

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        player_id = request.query_params.get("player")
        character_id = request.query_params.get("character")
        session_id = request.query_params.get("session")

        if all([player_id, character_id, session_id]):
            cache_key = f"dialogues_user_{player_id}_character_{character_id}_session_{session_id}"
            meta_key = f"{cache_key}_meta"
            cache.delete(cache_key)
            cache.delete(meta_key)

        return response
