from rest_framework import serializers
from .models import Trip


class TripSerializer(serializers.ModelSerializer):
    travelStyle = serializers.CharField(
        source="travel_style",
        required=False,
        allow_blank=True
    )

    packingList = serializers.JSONField(
        source="packing_list",
        required=False
    )

    start_date = serializers.DateField(
        required=False,
        allow_null=True
    )

    end_date = serializers.DateField(
        required=False,
        allow_null=True
    )

    dates = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Trip
        fields = [
            "id",
            "origin",
            "destination",
            "budget",
            "travelStyle",
            "travelers",
            "start_date",
            "end_date",
            "dates",
            "itinerary",
            "packingList",
            "favorite",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]

    def get_dates(self, obj):
        return {
            "start": obj.start_date,
            "end": obj.end_date,
        }