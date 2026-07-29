from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from django.contrib.auth.models import User


from .serializers import (
    UserSerializer,
    RegisterSerializer
)



# Get all users
@api_view(["GET"])
def users_list(request):

    users = User.objects.all()


    serializer = UserSerializer(
        users,
        many=True
    )


    return Response(serializer.data)




# Register new user
@api_view(["POST"])
def register_user(request):

    serializer = RegisterSerializer(
        data=request.data
    )


    if serializer.is_valid():

        serializer.save()


        return Response(

            {
                "message":
                "User created successfully"
            },

            status=status.HTTP_201_CREATED
        )


    return Response(

        serializer.errors,

        status=status.HTTP_400_BAD_REQUEST
    )