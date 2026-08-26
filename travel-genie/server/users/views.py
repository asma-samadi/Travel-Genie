from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Profile
from .serializers import RegisterSerializer, ProfileSerializer


@api_view(["POST"])
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, created = Profile.objects.get_or_create(
            user=request.user
        )

        serializer = ProfileSerializer(profile)

        return Response(serializer.data)

    def patch(self, request):
        profile, created = Profile.objects.get_or_create(
            user=request.user
        )

        data = request.data.copy()

        remove_profile_image = data.get(
            "remove_profile_image"
        )

        if str(remove_profile_image).lower() == "true":
            if profile.profile_image:
                profile.profile_image.delete(save=False)

            profile.profile_image = None
            profile.save()

            data.pop("remove_profile_image", None)

        serializer = ProfileSerializer(
            profile,
            data=data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    