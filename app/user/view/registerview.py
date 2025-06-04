from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.serializers import UserSerializer
from drf_yasg.utils import swagger_auto_schema


class RegisterView(APIView):
    @swagger_auto_schema(request_body=UserSerializer)
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created successfully", "user_id": user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)