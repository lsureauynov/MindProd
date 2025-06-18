from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from game.models.accusation import Accusation
from game.serializers import AccusationSerializer
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiTypes

class LastAccusationView(APIView):
    @extend_schema(
        tags=["Accusation Last"],
        summary="Dernière accusation d’un personnage dans une session",
        description="Renvoie la dernière accusation (par date) pour un personnage donné dans une session.",
        parameters=[
            OpenApiParameter(
                name="session",
                type=OpenApiTypes.UUID,
                location=OpenApiParameter.QUERY,
                required=True,
                description="ID de la session"
            ),
            OpenApiParameter(
                name="character",
                type=OpenApiTypes.UUID,
                location=OpenApiParameter.QUERY,
                required=True,
                description="ID du personnage"
            ),
        ],
        responses={200: AccusationSerializer, 404: dict}
    )
    def get(self, request):
        session = request.query_params.get("session")
        character = request.query_params.get("character")

        if not session or not character:
            return Response(
                {"detail": "Les paramètres 'session' et 'character' sont requis."},
                status=status.HTTP_400_BAD_REQUEST
            )

        import uuid
        try:
            session_uuid = uuid.UUID(session)
            character_uuid = uuid.UUID(character)
        except ValueError:
            return Response({"detail": "UUID invalide pour session ou character."}, status=status.HTTP_400_BAD_REQUEST)

        accusation = (
            Accusation.objects
            .filter(session__id=session_uuid, character__id=character_uuid)
            .order_by("-created_at")
            .first()
        )

        if accusation:
            return Response(AccusationSerializer(accusation).data, status=status.HTTP_200_OK)

        return Response({"detail": "Aucune accusation trouvée."}, status=status.HTTP_404_NOT_FOUND)

