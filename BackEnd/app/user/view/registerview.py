from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from user.serializers import UserSerializer
from drf_spectacular.utils import extend_schema

class RegisterView(APIView):

    @extend_schema(
        request=UserSerializer,
        responses={201: dict, 400: dict},
        summary="Créer un nouvel utilisateur",
        description="Enregistre un nouvel utilisateur à partir des données fournies et retourne les tokens JWT."
    )
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            
            return Response({
                "message": "User created successfully",
                "user_id": str(user.id),
                "access": str(access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
