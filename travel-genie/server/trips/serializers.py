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

    dates = serializers.SerializerMethodField(
        read_only=True
    )

    class Meta:
        model = Trip

        fields = [
            "id",
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

    def create(self, validated_data):
        dates = self.initial_data.get("dates", {})

        if dates:
            validated_data["start_date"] = dates.get("start")
            validated_data["end_date"] = dates.get("end")

        return Trip.objects.create(**validated_data)

    def update(self, instance, validated_data):
        dates = self.initial_data.get("dates", {})

        if dates:
            validated_data["start_date"] = dates.get("start")
            validated_data["end_date"] = dates.get("end")

        return super().update(instance, validated_data)