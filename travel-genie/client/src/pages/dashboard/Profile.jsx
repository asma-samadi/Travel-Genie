import {
  User,
  Mail,
  Calendar,
  Shield,
  Edit3,
  MapPin,
  Heart,
  Plane,
  Globe2,
  Camera,
  Trash2,
  Save,
  X,
  Briefcase,
  Map,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { useMemo, useEffect, useState } from "react";
import axios from "axios";

import { getProfile } from "../../api/profile";
import { useAuth } from "../../context/AuthContext";
import { useTrips } from "../../context/TripContext.jsx";
import GlassCard from "../../components/Common/GlassCard";

function Profile() {
  const { user } = useAuth();
  const { trips, loading } = useTrips();

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  // ======================================================
  // EDIT PROFILE STATE
  // ======================================================

  const [isEditing, setIsEditing] = useState(false);

  const [bio, setBio] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [favoriteDestination, setFavoriteDestination] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [saving, setSaving] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  const [imageError, setImageError] = useState(false);

  // ======================================================
  // LOAD PROFILE
  // ======================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setProfileLoading(true);
        setProfileError("");

        const data = await getProfile();

        setProfile(data);

        setBio(data?.bio || "");
        setTravelStyle(data?.travel_style || "");
        setFavoriteDestination(data?.favorite_destination || "");

        if (data?.profile_image) {
          setImagePreview(data.profile_image);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
        setProfileError("Unable to load your profile.");
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ======================================================
  // USER INFORMATION
  // ======================================================

  const username =
    profile?.user?.username ||
    profile?.username ||
    user?.username ||
    user?.name ||
    "Travel Explorer";

  const email =
    profile?.user?.email ||
    profile?.email ||
    user?.email ||
    "Account connected";


  // ======================================================
  // TRAVEL STATISTICS
  // ======================================================

  const travelStats = useMemo(() => {
    const tripList = Array.isArray(trips) ? trips : [];

    const favoriteTrips = tripList.filter((trip) => trip.favorite);

    const destinations = [
      ...new Set(tripList.map((trip) => trip.destination).filter(Boolean)),
    ];

    return {
      totalTrips: tripList.length,
      favoriteTrips: favoriteTrips.length,
      destinations: destinations.length,
      recentDestination:
        destinations.length > 0
          ? destinations[destinations.length - 1]
          : "No trips yet",
    };
  }, [trips]);

  // ======================================================
  // START EDITING
  // ======================================================

  const handleEdit = () => {
    setBio(profile?.bio || "");
    setTravelStyle(profile?.travel_style || "");
    setFavoriteDestination(profile?.favorite_destination || "");

    setSelectedImage(null);
    if (profile?.profile_image) {
      const imageUrl = profile.profile_image.startsWith("http")
        ? profile.profile_image
        : `${import.meta.env.VITE_API_URL}${profile.profile_image}`;

      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }

    setImageError(false);

    setSaveMessage("");
    setSaveError("");

    setIsEditing(true);
  };

  // ======================================================
  // CANCEL EDITING
  // ======================================================

  const handleCancel = () => {
    setBio(profile?.bio || "");
    setTravelStyle(profile?.travel_style || "");
    setFavoriteDestination(profile?.favorite_destination || "");

    setSelectedImage(null);
    setImagePreview(profile?.profile_image || null);

    setSaveMessage("");
    setSaveError("");

    setIsEditing(false);
  };

  // ======================================================
  // SELECT IMAGE
  // ======================================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setSaveError("Profile image must be smaller than 5 MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setSaveError("Please select a valid image file.");
      return;
    }

    setSelectedImage(file);
    setSaveError("");
    setSaveMessage("");

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // ======================================================
  // SAVE PROFILE
  // ======================================================

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveError("");
      setSaveMessage("");

      const token =
        localStorage.getItem("access") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      const formData = new FormData();

      formData.append("bio", bio);
      formData.append("travel_style", travelStyle);
      formData.append("favorite_destination", favoriteDestination);

      if (selectedImage) {
        formData.append("profile_image", selectedImage);
      }

      const response = await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/users/profile/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProfile(response.data);

      setBio(response.data?.bio || "");
      setTravelStyle(response.data?.travel_style || "");
      setFavoriteDestination(response.data?.favorite_destination || "");

      setSelectedImage(null);

      if (response.data?.profile_image) {
        const imageUrl = response.data.profile_image.startsWith("http")
          ? response.data.profile_image
          : `https://travelgenie-backend-fcvw.onrender.com${response.data.profile_image}`;

        setImagePreview(imageUrl);
        setImageError(false);
      } else {
        setImagePreview(null);
        setImageError(false);
      }

      setSaveMessage("Profile updated successfully.");

      setTimeout(() => {
        setIsEditing(false);
        setSaveMessage("");
      }, 1200);
    } catch (error) {
      console.error("Failed to update profile:", error);

      if (error.response?.data) {
        console.error("Server response:", error.response.data);
      }

      setSaveError("Unable to update your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ======================================================
  // DELETE PROFILE IMAGE
  // ======================================================

  const handleDeleteImage = async () => {
    try {
      setDeletingImage(true);
      setSaveError("");
      setSaveMessage("");

      const token =
        localStorage.getItem("access") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      const formData = new FormData();

      formData.append("profile_image", "");

      const response = await axios.patch(
        "https://travelgenie-backend-fcvw.onrender.com/api/users/profile/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProfile(response.data);
      setSelectedImage(null);
      setImagePreview(null);

      setSaveMessage("Profile photo removed.");

      setTimeout(() => {
        setSaveMessage("");
      }, 2000);
    } catch (error) {
      console.error("Failed to delete profile image:", error);

      setSaveError("Unable to remove your profile photo.");
    } finally {
      setDeletingImage(false);
    }
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (profileLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <GlassCard className="p-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 size={28} className="animate-spin text-cyan-500" />

            <p className="text-center text-gray-600 dark:text-white/70">
              Loading your profile...
            </p>
          </div>
        </GlassCard>
      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (profileError) {
    return (
      <div className="max-w-5xl mx-auto">
        <GlassCard className="p-8">
          <p className="text-center text-red-500">{profileError}</p>
        </GlassCard>
      </div>
    );
  }

  // ======================================================
  // PAGE
  // ======================================================


  const profileImageUrl = profile?.profile_image
    ? profile.profile_image.startsWith("http")
      ? profile.profile_image
      : `https://travelgenie-backend-fcvw.onrender.com${profile.profile_image}`
    : null;
  
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>

        <p className="mt-2 text-gray-600 dark:text-white/70">
          Manage your account and explore your TravelGenie journey.
        </p>
      </div>

      {/* ==================================================
          PROFILE HEADER
      ================================================== */}

      <GlassCard className="overflow-hidden">
        {/* Top accent */}

        <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600" />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* ==================================================
    AVATAR
================================================== */}

            <div className="relative shrink-0">
              {(imagePreview || profileImageUrl) && !imageError ? (
                <img
                  src={imagePreview || profileImageUrl}
                  alt={`${username}'s profile`}
                  className="h-24 w-24 rounded-3xl object-cover shadow-lg ring-4 ring-white/70 dark:ring-white/10"
                  onError={() => {
                    setImageError(true);
                  }}
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-3xl font-bold text-white shadow-lg">
                  {username.charAt(0).toUpperCase()}
                </div>
              )}

              {isEditing && (
                <label
                  htmlFor="profile-image"
                  className="absolute -bottom-2 -right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gray-900 text-white shadow-lg transition hover:scale-105 dark:bg-white dark:text-gray-900"
                  title="Change profile photo"
                >
                  <Camera size={18} />

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {/* ==================================================
                USER INFORMATION
            ================================================== */}

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {username}
                </h2>

                <span className="w-fit mx-auto sm:mx-0 flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
                  <CheckCircle2 size={13} />
                  Active
                </span>
              </div>

              <p className="mt-2 text-gray-600 dark:text-white/70">
                TravelGenie Explorer
              </p>

              <div className="mt-4 flex justify-center sm:justify-start items-center gap-2 text-sm text-gray-500 dark:text-white/60">
                <Globe2 size={16} className="text-cyan-500" />
                Building memorable journeys with TravelGenie
              </div>
            </div>

            {/* ==================================================
                EDIT / SAVE / CANCEL BUTTONS
            ================================================== */}

            {!isEditing ? (
              <button
                type="button"
                onClick={handleEdit}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                <Edit3 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                >
                  <X size={17} />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* ==================================================
              PHOTO CONTROLS
          ================================================== */}

          {isEditing && (
            <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-3">
              <label
                htmlFor="profile-image"
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                <Camera size={17} />

                {profile?.profile_image ? "Change Photo" : "Upload Photo"}
              </label>

              {(profile?.profile_image || imagePreview) && (
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  disabled={deletingImage}
                  className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-60 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                >
                  {deletingImage ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Trash2 size={17} />
                  )}

                  {deletingImage ? "Removing..." : "Delete Photo"}
                </button>
              )}
            </div>
          )}

          {/* ==================================================
              MESSAGES
          ================================================== */}

          {saveMessage && (
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-400/20 dark:bg-green-500/10 dark:text-green-400">
              <CheckCircle2 size={18} />
              {saveMessage}
            </div>
          )}

          {saveError && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-400">
              {saveError}
            </div>
          )}
        </div>
      </GlassCard>

      {/* ==================================================
          EDIT PROFILE FORM
      ================================================== */}

      {isEditing && (
        <GlassCard className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Personalize Your Profile
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-white/60">
              Tell TravelGenie a little more about your travel preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Bio */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-white/80">
                About You
              </label>

              <textarea
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                rows={4}
                placeholder="Tell us a little about yourself..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
              />

              <p className="mt-1 text-xs text-gray-400">
                {bio.length}/500 characters
              </p>
            </div>

            {/* Travel Style */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-white/80">
                <Briefcase size={16} className="text-cyan-500" />
                Travel Style
              </label>

              <input
                type="text"
                value={travelStyle}
                onChange={(event) => setTravelStyle(event.target.value)}
                placeholder="e.g. Adventure, Luxury, Budget, Family..."
                maxLength={100}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
              />
            </div>

            {/* Favorite Destination */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-white/80">
                <Map size={16} className="text-cyan-500" />
                Favorite Destination
              </label>

              <input
                type="text"
                value={favoriteDestination}
                onChange={(event) => setFavoriteDestination(event.target.value)}
                placeholder="e.g. Istanbul, Dubai, Paris..."
                maxLength={150}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
              />
            </div>
          </div>
        </GlassCard>
      )}

      {/* ==================================================
          TRAVEL STATISTICS
      ================================================== */}

      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
            <Plane size={20} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Travel Overview
            </h2>

            <p className="text-sm text-gray-500 dark:text-white/60">
              A quick look at your TravelGenie activity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ProfileStat
            icon={<Plane size={20} />}
            label="Trips Created"
            value={loading ? "..." : travelStats.totalTrips}
          />

          <ProfileStat
            icon={<Heart size={20} />}
            label="Favorite Trips"
            value={loading ? "..." : travelStats.favoriteTrips}
          />

          <ProfileStat
            icon={<MapPin size={20} />}
            label="Destinations"
            value={loading ? "..." : travelStats.destinations}
          />
        </div>
      </section>

      {/* ==================================================
          ACCOUNT INFORMATION
      ================================================== */}

      <section>
        <h2 className="mb-5 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Account Information
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProfileInfo
            icon={<User size={21} />}
            label="Username"
            value={username}
          />

          <ProfileInfo
            icon={<Mail size={21} />}
            label="Email Address"
            value={email}
          />

          <ProfileInfo
            icon={<Shield size={21} />}
            label="Account Status"
            value="Active"
          />

          <ProfileInfo
            icon={<Calendar size={21} />}
            label="Travel Activity"
            value={
              travelStats.totalTrips > 0
                ? `${travelStats.totalTrips} trips created`
                : "Ready for your first trip"
            }
          />
        </div>
      </section>

      {/* ==================================================
          TRAVEL PREFERENCES PREVIEW
      ================================================== */}

      {(profile?.bio ||
        profile?.travel_style ||
        profile?.favorite_destination) && (
        <GlassCard className="p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
              <Globe2 size={21} />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Travel Preferences
              </h2>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile?.travel_style && (
                  <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/5">
                    <p className="text-xs font-medium text-gray-500 dark:text-white/50">
                      Travel Style
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      {profile.travel_style}
                    </p>
                  </div>
                )}

                {profile?.favorite_destination && (
                  <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/5">
                    <p className="text-xs font-medium text-gray-500 dark:text-white/50">
                      Favorite Destination
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      {profile.favorite_destination}
                    </p>
                  </div>
                )}
              </div>

              {profile?.bio && (
                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-500 dark:text-white/50">
                    About
                  </p>

                  <p className="mt-1 leading-relaxed text-gray-600 dark:text-white/70">
                    {profile.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      )}

      {/* ==================================================
          RECENT TRAVEL ACTIVITY
      ================================================== */}

      <GlassCard className="p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
            <MapPin size={21} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Latest Travel Activity
            </h2>

            {travelStats.totalTrips > 0 ? (
              <p className="mt-2 text-gray-600 dark:text-white/70">
                Your TravelGenie journey includes{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {travelStats.destinations} destination
                  {travelStats.destinations !== 1 ? "s" : ""}
                </span>
                . Your latest saved destination is{" "}
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  {travelStats.recentDestination}
                </span>
                .
              </p>
            ) : (
              <p className="mt-2 text-gray-600 dark:text-white/70">
                You haven't created a trip yet. Start planning your next
                adventure and TravelGenie will keep track of your journey.
              </p>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// ======================================================
// PROFILE STAT
// ======================================================

function ProfileStat({ icon, label, value }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-2 text-cyan-500">
        {icon}

        <span className="text-sm font-medium text-gray-500 dark:text-white/60">
          {label}
        </span>
      </div>

      <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </GlassCard>
  );
}

// ======================================================
// PROFILE INFO
// ======================================================

function ProfileInfo({ icon, label, value }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm text-gray-500 dark:text-white/60">{label}</p>

          <p className="mt-1 truncate font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

export default Profile;
