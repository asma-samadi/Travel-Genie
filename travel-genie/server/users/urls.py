from django.urls import path

from .views import register_user, ProfileView

urlpatterns = [
    path(
        "register/",
        register_user,
        name="register",
    ),

    path(
        "profile/",
        ProfileView.as_view(),
        name="profile",
    ),
]