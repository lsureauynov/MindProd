from drf_spectacular.utils import extend_schema
from game.models.accusation import Accusation
from game.view.base_view_set import BaseViewSet
from game.serializers import (AccusationSerializer)
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend

@extend_schema(tags=['Accusation'])
class AccusationViewSet(BaseViewSet):
    queryset = Accusation.objects.all()
    serializer_class = AccusationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['character', 'session']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(status=status.HTTP_201_CREATED)

