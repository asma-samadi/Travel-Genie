from django.db import models
from django.contrib.auth.models import User


class Trip(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="trips"
    )

    destination = models.CharField(
        max_length=200
    )

    start_date = models.DateField()

    end_date = models.DateField()

    budget = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    travelers = models.PositiveIntegerField(
        default=1
    )

    travel_style_choices = [
        ("Adventure", "Adventure"),
        ("Relaxation", "Relaxation"),
        ("Luxury", "Luxury"),
        ("Budget", "Budget"),
        ("Culture", "Culture"),
    ]

    travel_style = models.CharField(
        max_length=50,
        choices=travel_style_choices,
        default="Adventure"
    )

    itinerary = models.JSONField(
        blank=True,
        null=True
    )

    trip_image = models.ImageField(
        upload_to="trips/",
        blank=True,
        null=True
    )

    is_favorite = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):
        return f"{self.destination} - {self.user.username}"
