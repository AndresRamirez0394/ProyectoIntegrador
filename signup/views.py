from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

@api_view(['POST'])
def signup(request):
    data = request.data

    from django.contrib.auth.models import User
    user = User.objects.create_user(
        username=data['email'],
        password=data['password'],
        first_name=data['firstName'],
        last_name=data['lastName'],
    )

    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)