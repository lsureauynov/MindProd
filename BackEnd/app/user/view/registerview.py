from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.serializers import UserSerializer
from drf_spectacular.utils import extend_schema

class RegisterView(APIView):

    @extend_schema(
        request=UserSerializer,
        responses={201: dict, 400: dict},
        summary="Créer un nouvel utilisateur",
        description="Enregistre un nouvel utilisateur à partir des données fournies."
    )
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"message": "User created successfully", "user_id": str(user.id)},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
