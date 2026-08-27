from django.db import models
from django.contrib.auth.models import User


class Trip(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="trips"
    )

    origin = models.CharField(max_length=255, blank=True, default="")

    destination = models.CharField(
        max_length=200
    )

    budget = models.IntegerField(
        default=0
    )

    travel_style = models.CharField(
        max_length=100,
        blank=True
    )

    travelers = models.IntegerField(
        default=1
    )

    start_date = models.DateField(
        null=True,
        blank=True
    )

    end_date = models.DateField(
        null=True,
        blank=True
    )

    itinerary = models.JSONField(
        default=list,
        blank=True
    )

    packing_list = models.JSONField(
        default=list,
        blank=True
    )

    favorite = models.BooleanField(
        default=False
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):
        return self.destination