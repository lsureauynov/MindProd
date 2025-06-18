from rest_framework.viewsets import ModelViewSet
from game.models.session import Session
from game.serializers import SessionSerializer
from game.permissions.session_permissions import IsSessionOwner
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from drf_spectacular.utils import OpenApiResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action


@extend_schema(tags=['Session'])
class SessionViewSet(ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated, IsSessionOwner]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['player', 'story', 'status']

    def get_queryset(self):
        return Session.objects.filter(player__user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @extend_schema(
        summary="Termine une session (status = finished)",
        responses={200: OpenApiResponse(description="Session marquée comme terminée")}
    )
    @action(detail=True, methods=["patch"], url_path="mark-finished")
    def mark_finished(self, request, pk=None):
        session = self.get_object()
        serializer = self.get_serializer()
        try:
            serializer.update_to_finished(session)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "Session terminée."}, status=status.HTTP_200_OK)

    @extend_schema(
        summary="Marque une session comme perdue (status = lost)",
        responses={200: OpenApiResponse(description="Session marquée comme perdue")}
    )
    @action(detail=True, methods=["patch"], url_path="mark-lost")
    def mark_lost(self, request, pk=None):
        session = self.get_object()
        serializer = self.get_serializer()
        try:
            serializer.update_to_lost(session)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "Session perdue."}, status=status.HTTP_200_OK)

    @extend_schema(
        summary="Marque une session comme en cours (status = playing)",
        responses={200: OpenApiResponse(description="Session marquée comme en cours")}
    )
    @action(detail=True, methods=["patch"], url_path="mark-playing")
    def mark_playing(self, request, pk=None):
        session = self.get_object()
        serializer = self.get_serializer()
        try:
            serializer.update_to_playing(session)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "Session en cours."}, status=status.HTTP_200_OK)

    @extend_schema(
        summary="Fait perdre une vie à la session",
        responses={200: OpenApiResponse(description="Vie perdue, session mise à jour")}
    )
    @action(detail=True, methods=["patch"], url_path="lost-life")
    def lost_life(self, request, pk=None):
        session = self.get_object()
        serializer = self.get_serializer()
        try:
            updated_session = serializer.lose_life(session)
            return Response(self.get_serializer(updated_session).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)