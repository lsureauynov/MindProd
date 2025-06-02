from rest_framework import viewsets
from user.models.user import User
from user.serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def post(request, *args, **kwargs):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"message": "User created successfully", "user_id": user.id}, status=201)
    return Response(serializer.errors, status=400)


class RegisterViewSet(APIView):
    pass


def get(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

