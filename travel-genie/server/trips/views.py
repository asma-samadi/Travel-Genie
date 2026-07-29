from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Trip
from .serializers import TripSerializer



@api_view(["GET"])
def trips_list(request):

    trips = Trip.objects.all()

    serializer = TripSerializer(
        trips,
        many=True
    )

    return Response(serializer.data)