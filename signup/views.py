from rest_framework import generics
from rest_framework import status, serializers
from rest_framework.response import Response
from .serializers import UserSerializer

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer
# Create your views here.
