from drf_spectacular.utils import extend_schema
from rest_framework.viewsets import ModelViewSet
from game.models.accusation import Accusation
from game.serializers import (AccusationSerializer)
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend

@extend_schema(tags=['Accusation'])
class AccusationViewSet(ModelViewSet):
    queryset = Accusation.objects.all()
    serializer_class = AccusationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['character', 'session']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

