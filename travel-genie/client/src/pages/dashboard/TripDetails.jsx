import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  Heart,
  Calendar,
  Users,
  Wallet,
  Backpack,
  MapPin,
  Sunrise,
  Sun,
  Moon,
  Check,
  Sparkles,
  Edit,
  Save,
  X,
  RefreshCw,
  CloudSun,
  Share2,
  Clock,
  Hotel,
  Utensils,
  Car,
  Ticket,
  Copy,
} from "lucide-react";

import { generateAIResponse } from "../../services/ai";
import { useTrips } from "../../context/TripContext.jsx";
import GlassCard from "../../components/Common/GlassCard";

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { trips, loading, toggleFavorite, updateTrip } = useTrips();

  // ======================================================
  // AI ITINERARY STATES
  // ======================================================

  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const [editingItinerary, setEditingItinerary] = useState(false);
  const [editedItinerary, setEditedItinerary] = useState([]);
  const [savingItinerary, setSavingItinerary] = useState(false);

  const [regeneratingDay, setRegeneratingDay] = useState(null);

  // ======================================================
  // AI PACKING LIST STATES
  // ======================================================

  const [packingLoading, setPackingLoading] = useState(false);
  const [packingError, setPackingError] = useState("");

  // ======================================================
  // AI RECOMMENDATIONS STATES
  // ======================================================

  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [recommendationsError, setRecommendationsError] = useState("");

  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    "History",
    "Nature",
    "Food",
    "Shopping",
    "Culture",
    "Adventure",
    "Relaxation",
    "Photography",
  ];

  // ======================================================
  // WEATHER STATES
  // ======================================================

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  // ======================================================
  // BUDGET STATES
  // ======================================================

  const [budgetLoading, setBudgetLoading] = useState(false);
  const [budgetError, setBudgetError] = useState("");

  // ======================================================
  // SHARE STATES
  // ======================================================

  const [shareMessage, setShareMessage] = useState("");

  // ======================================================
  // FIND TRIP
  // ======================================================

  const trip = trips.find((item) => String(item.id) === String(id));

  // ======================================================
  // NORMALIZE ITINERARY
  // ======================================================

  // This hook must run on every render.
  const normalizedItinerary = useMemo(() => {
    if (!Array.isArray(trip?.itinerary)) {
      return [];
    }

    return trip.itinerary.map((day, index) => ({
      ...day,
      title: `Day ${index + 1}`,
    }));
  }, [trip?.itinerary]);

  // ======================================================
  // CALCULATE TRIP DAYS
  // ======================================================

  const tripDates = useMemo(() => {
    const start = trip?.dates?.start || trip?.start_date || null;
    const end = trip?.dates?.end || trip?.end_date || null;

    if (!start || !end) {
      return {
        start,
        end,
        days: normalizedItinerary.length || 1,
      };
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return {
        start,
        end,
        days: normalizedItinerary.length || 1,
      };
    }

    const difference =
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;

    return {
      start,
      end,
      days: Math.max(1, difference, normalizedItinerary.length),
    };
  }, [
    trip?.dates?.start,
    trip?.dates?.end,
    trip?.start_date,
    trip?.end_date,
    normalizedItinerary.length,
  ]);

  // ======================================================
  // GENERATE AI ITINERARY
  // ======================================================

  const generateItinerary = async () => {
    try {
      setAiLoading(true);
      setAiError("");

      const prompt = `
Create a detailed travel itinerary for this trip.

Destination: ${trip.destination}

Travel dates:
${tripDates.start || "Not specified"} to ${tripDates.end || "Not specified"}

Number of travelers: ${trip.travelers || 1}

Budget: $${trip.budget || 0}

The trip has exactly ${tripDates.days} days.

Create exactly ${tripDates.days} days.

Return ONLY valid JSON.

Use exactly this structure:

[
  {
    "morning": "Morning activity",
    "afternoon": "Afternoon activity",
    "evening": "Evening activity"
  }
]

Do not include a title or day number.
The application will automatically create Day 1, Day 2, Day 3, etc.

Do not include markdown.
Do not include explanations outside the JSON.
`;

      const itinerary = await generateAIResponse(prompt);

      if (!Array.isArray(itinerary)) {
        throw new Error("AI returned an invalid itinerary.");
      }

      // Make sure itinerary never exceeds the actual trip duration.
      const limitedItinerary = itinerary
        .slice(0, tripDates.days)
        .map((day) => ({
          morning: day?.morning || "",
          afternoon: day?.afternoon || "",
          evening: day?.evening || "",
        }));

      await updateTrip(trip.id, {
        ...trip,
        itinerary: limitedItinerary,
      });
    } catch (error) {
      console.error("Itinerary generation failed:", error);
      setAiError("Failed to generate itinerary. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  // ======================================================
  // START EDITING ITINERARY
  // ======================================================

  const startEditingItinerary = () => {
    setEditedItinerary(
      normalizedItinerary.map((day) => ({
        morning: day.morning || "",
        afternoon: day.afternoon || "",
        evening: day.evening || "",
      })),
    );

    setEditingItinerary(true);
  };

  // ======================================================
  // CANCEL EDITING
  // ======================================================

  const cancelEditingItinerary = () => {
    setEditedItinerary([]);
    setEditingItinerary(false);
  };

  // ======================================================
  // CHANGE ITINERARY FIELD
  // ======================================================

  const handleItineraryChange = (dayIndex, field, value) => {
    setEditedItinerary((current) =>
      current.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              [field]: value,
            }
          : day,
      ),
    );
  };

  // ======================================================
  // SAVE EDITED ITINERARY
  // ======================================================

  const saveItinerary = async () => {
    try {
      setSavingItinerary(true);
      setAiError("");

      // Keep the same number of days.
      const cleanedItinerary = editedItinerary
        .slice(0, tripDates.days)
        .map((day) => ({
          morning: day.morning || "",
          afternoon: day.afternoon || "",
          evening: day.evening || "",
        }));

      await updateTrip(trip.id, {
        ...trip,
        itinerary: cleanedItinerary,
      });

      setEditingItinerary(false);
      setEditedItinerary([]);
    } catch (error) {
      console.error("Saving itinerary failed:", error);
      setAiError("Failed to save itinerary changes. Please try again.");
    } finally {
      setSavingItinerary(false);
    }
  };

  // ======================================================
  // REGENERATE ONE DAY
  // ======================================================

  const regenerateDay = async (dayIndex) => {
    try {
      setRegeneratingDay(dayIndex);
      setAiError("");

      const dayNumber = dayIndex + 1;

      const prompt = `
Create a replacement itinerary for Day ${dayNumber} only.

Trip destination: ${trip.destination}

Travel dates:
${tripDates.start || "Not specified"} to ${tripDates.end || "Not specified"}

Number of travelers: ${trip.travelers || 1}

Budget: $${trip.budget || 0}

Return ONLY valid JSON.

Use exactly this structure:

{
  "morning": "Morning activity",
  "afternoon": "Afternoon activity",
  "evening": "Evening activity"
}

Do not include the day number.
Do not include markdown.
Do not include explanations.
`;

      const newDay = await generateAIResponse(prompt);

      if (!newDay || typeof newDay !== "object" || Array.isArray(newDay)) {
        throw new Error("AI returned an invalid day.");
      }

      const currentItinerary = [...normalizedItinerary];

      currentItinerary[dayIndex] = {
        morning: newDay.morning || "",
        afternoon: newDay.afternoon || "",
        evening: newDay.evening || "",
      };

      const cleanedItinerary = currentItinerary.map((day) => ({
        morning: day.morning || "",
        afternoon: day.afternoon || "",
        evening: day.evening || "",
      }));

      await updateTrip(trip.id, {
        ...trip,
        itinerary: cleanedItinerary,
      });
    } catch (error) {
      console.error("Individual day regeneration failed:", error);

      setAiError("Failed to regenerate this day. Please try again.");
    } finally {
      setRegeneratingDay(null);
    }
  };

  // ======================================================
  // GENERATE AI PACKING LIST
  // ======================================================

  const generatePackingList = async () => {
    try {
      setPackingLoading(true);
      setPackingError("");

      const prompt = `
Create a practical packing list for this trip.

Destination: ${trip.destination}

Travel dates:
${tripDates.start || "Not specified"} to ${tripDates.end || "Not specified"}

Number of travelers: ${trip.travelers || 1}

Budget: $${trip.budget || 0}

Trip duration: ${tripDates.days} days.

Consider the destination, travel duration, weather, and general travel needs.

Return ONLY a valid JSON array of strings.

Example:

[
  "Passport and travel documents",
  "Comfortable walking shoes",
  "Weather-appropriate clothing",
  "Phone charger"
]

Do not include markdown.
Do not include explanations.
Return only the JSON array.
`;

      const packingList = await generateAIResponse(prompt);

      if (!Array.isArray(packingList)) {
        throw new Error("AI returned an invalid packing list.");
      }

      const cleanedPackingList = packingList
        .map((item) => {
          if (typeof item === "string") {
            return item;
          }

          if (item && typeof item === "object") {
            return item.item || item.name || JSON.stringify(item);
          }

          return String(item);
        })
        .filter(Boolean);

      await updateTrip(trip.id, {
        ...trip,
        packingList: cleanedPackingList,
      });
    } catch (error) {
      console.error("Packing list generation failed:", error);

      setPackingError("Failed to generate packing list. Please try again.");
    } finally {
      setPackingLoading(false);
    }
  };

  // ======================================================
  // TOGGLE INTEREST
  // ======================================================

  const toggleInterest = (interest) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  };

  // ======================================================
  // GENERATE AI RECOMMENDATIONS
  // ======================================================

  const generateRecommendations = async () => {
    try {
      setRecommendationsLoading(true);
      setRecommendationsError("");

      const interestText =
        selectedInterests.length > 0
          ? selectedInterests.join(", ")
          : "General travel, popular attractions, local experiences, food, and culture";

      const prompt = `
Create personalized travel recommendations for this trip.

Destination: ${trip.destination}

Travel dates:
${tripDates.start || "Not specified"} to ${tripDates.end || "Not specified"}

Number of travelers: ${trip.travelers || 1}

Budget: $${trip.budget || 0}

Traveler interests:
${interestText}

Give practical and interesting recommendations based on the destination, budget, and interests.

Return ONLY valid JSON using exactly this structure:

{
  "places": [
    "Place recommendation"
  ],
  "activities": [
    "Activity recommendation"
  ],
  "food": [
    "Food or dining recommendation"
  ],
  "tips": [
    "Helpful travel tip"
  ]
}

Give 3 to 5 useful recommendations in each category.

Do not include markdown.
Do not include explanations outside the JSON.

Return only the JSON object.
`;

      const recommendations = await generateAIResponse(prompt);

      if (
        !recommendations ||
        typeof recommendations !== "object" ||
        Array.isArray(recommendations)
      ) {
        throw new Error("AI returned invalid recommendations.");
      }

      await updateTrip(trip.id, {
        ...trip,
        recommendations,
        recommendationInterests: selectedInterests,
      });
    } catch (error) {
      console.error("Recommendations generation failed:", error);

      setRecommendationsError(
        "Failed to generate recommendations. Please try again.",
      );
    } finally {
      setRecommendationsLoading(false);
    }
  };

  // ======================================================
  // WEATHER
  // ======================================================

  const loadWeather = async () => {
    if (!trip?.destination) return;

    try {
      setWeatherLoading(true);
      setWeatherError("");

      // First find the destination coordinates.
      const geocodeResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          trip.destination,
        )}&count=1&language=en&format=json`,
      );

      if (!geocodeResponse.ok) {
        throw new Error("Unable to find destination.");
      }

      const geocodeData = await geocodeResponse.json();

      if (!geocodeData.results || geocodeData.results.length === 0) {
        throw new Error("Destination could not be found.");
      }

      const location = geocodeData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`,
      );

      if (!weatherResponse.ok) {
        throw new Error("Unable to load weather.");
      }

      const weatherData = await weatherResponse.json();

      setWeather({
        city: location.name || trip.destination,
        country: location.country || "",
        temperature: weatherData.current?.temperature_2m,
        windSpeed: weatherData.current?.wind_speed_10m,
        weatherCode: weatherData.current?.weather_code,
      });
    } catch (error) {
      console.error("Weather loading failed:", error);
      setWeatherError("Weather information is currently unavailable.");
    } finally {
      setWeatherLoading(false);
    }
  };

  // Load weather when the trip is available.
  useEffect(() => {
    if (trip?.destination) {
      loadWeather();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip?.destination]);

  // ======================================================
  // WEATHER DESCRIPTION
  // ======================================================

  // Your existing weather code continues here...

  const getWeatherDescription = (code) => {
    if (code === 0) return "Clear sky";

    if ([1, 2, 3].includes(code)) {
      return "Partly cloudy";
    }

    if ([45, 48].includes(code)) {
      return "Foggy";
    }

    if ([51, 53, 55, 56, 57].includes(code)) {
      return "Drizzle";
    }

    if ([61, 63, 65, 66, 67].includes(code)) {
      return "Rain";
    }

    if ([71, 73, 75, 77].includes(code)) {
      return "Snow";
    }

    if ([80, 81, 82].includes(code)) {
      return "Rain showers";
    }

    if ([95, 96, 99].includes(code)) {
      return "Thunderstorm";
    }

    return "Current conditions";
  };

  // ======================================================
  // AI BUDGET PLANNING
  // ======================================================

  const generateBudgetPlan = async () => {
    try {
      setBudgetLoading(true);
      setBudgetError("");

      const prompt = `
Create a practical travel budget estimate for this trip.

Destination: ${trip.destination}

Travel dates:
${tripDates.start || "Not specified"} to ${tripDates.end || "Not specified"}

Number of travelers: ${trip.travelers || 1}

Total user budget: $${trip.budget || 0}

Trip duration: ${tripDates.days} days.

Return ONLY valid JSON using exactly this structure:

{
  "accommodation": 0,
  "food": 0,
  "transportation": 0,
  "activities": 0,
  "total": 0,
  "summary": "Short explanation"
}

All amounts must be numbers.
Estimate realistic costs for the destination.
Keep the estimate close to the user's budget when possible.

Do not include markdown.
Do not include explanations outside the JSON.
`;

      const budgetPlan = await generateAIResponse(prompt);

      if (
        !budgetPlan ||
        typeof budgetPlan !== "object" ||
        Array.isArray(budgetPlan)
      ) {
        throw new Error("AI returned invalid budget data.");
      }

      await updateTrip(trip.id, {
        ...trip,
        budgetPlan,
      });
    } catch (error) {
      console.error("Budget generation failed:", error);

      setBudgetError("Failed to create budget plan. Please try again.");
    } finally {
      setBudgetLoading(false);
    }
  };

  // ======================================================
  // SHARE TRIP
  // ======================================================

  const shareTrip = async () => {
    try {
      const shareUrl = window.location.href;

      const shareData = {
        title: trip.title || `${trip.destination} Trip`,
        text: `Check out my TravelGenie trip to ${trip.destination}.`,
        url: shareUrl,
      };

      if (navigator.share && typeof navigator.share === "function") {
        await navigator.share(shareData);

        setShareMessage("Trip shared successfully.");
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);

        setShareMessage("Trip link copied to clipboard.");
      } else {
        setShareMessage("Copy this page URL to share your trip.");
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Sharing trip failed:", error);

        setShareMessage("Unable to share the trip.");
      }
    }

    setTimeout(() => {
      setShareMessage("");
    }, 3000);
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return <div className="text-gray-900 dark:text-white">Loading trip...</div>;
  }

  // ======================================================
  // TRIP NOT FOUND
  // ======================================================

  if (!trip) {
    return (
      <GlassCard className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Trip not found
        </h2>

        <p className="mt-2 text-gray-600 dark:text-white/70">
          The trip you are looking for is not available.
        </p>

        <button
          onClick={() => navigate("/dashboard/trips")}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-white hover:bg-cyan-600 transition"
        >
          <ArrowLeft size={18} />
          Back to Trips
        </button>
      </GlassCard>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="space-y-8">
      {/* ==================================================
          BACK BUTTON
      ================================================== */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white hover:bg-gray-100 hover:text-cyan-500 dark:hover:bg-white/20 transition"
      >
        <ArrowLeft size={19} />
        Back
      </button>

      {/* ==================================================
          TRIP HEADER
      ================================================== */}

      <GlassCard className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3">
              <MapPin size={16} />
              Trip Destination
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {trip.title || trip.destination}
            </h1>

            <div className="flex items-center gap-2 mt-3 text-gray-600 dark:text-white/70">
              <MapPin size={18} className="text-cyan-500" />

              <span>{trip.destination}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            {/* Share */}

            <button
              onClick={shareTrip}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 dark:bg-white/10 hover:scale-105 transition"
              aria-label="Share trip"
              title="Share trip"
            >
              <Share2 size={21} className="text-gray-500 dark:text-white/70" />
            </button>

            {/* Favorite */}

            <button
              onClick={() => toggleFavorite(trip.id)}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-100 dark:bg-white/10 hover:scale-105 transition"
              aria-label="Toggle favorite"
            >
              <Heart
                size={22}
                className={
                  trip.favorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 dark:text-white/60"
                }
              />
            </button>
          </div>
        </div>

        {shareMessage && (
          <div className="mt-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-4 py-3 text-sm text-cyan-600 dark:text-cyan-400">
            {shareMessage}
          </div>
        )}

        {/* Trip Information */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <Info
            icon={<Calendar size={19} />}
            label="Travel Dates"
            text={`${tripDates.start || "No date"} - ${
              tripDates.end || "No date"
            }`}
          />

          <Info
            icon={<Users size={19} />}
            label="Travelers"
            text={`${trip.travelers || 1} Travelers`}
          />

          <Info
            icon={<Wallet size={19} />}
            label="Budget"
            text={`$${trip.budget || 0}`}
          />
        </div>
      </GlassCard>

      {/* ==================================================
          WEATHER
      ================================================== */}

      <section>
        <SectionHeader
          icon={<CloudSun size={21} />}
          title="Weather"
          description="Current weather conditions for your destination."
        />

        {weatherLoading ? (
          <GlassCard className="p-5">
            <div className="flex items-center gap-3 text-gray-600 dark:text-white/70">
              <RefreshCw size={18} className="animate-spin" />
              Loading weather...
            </div>
          </GlassCard>
        ) : weather ? (
          <GlassCard className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-cyan-500" />

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {weather.city}
                  </h3>

                  {weather.country && (
                    <span className="text-sm text-gray-500 dark:text-white/50">
                      {weather.country}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-gray-600 dark:text-white/70">
                  {getWeatherDescription(weather.weatherCode)}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {weather.temperature}°C
                  </p>

                  <p className="text-xs text-gray-500 dark:text-white/50">
                    Current temperature
                  </p>
                </div>

                <div className="hidden sm:block h-10 w-px bg-gray-200 dark:bg-white/10" />

                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Wind
                  </p>

                  <p className="text-sm text-gray-500 dark:text-white/60">
                    {weather.windSpeed} km/h
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="p-5">
            <p className="text-sm text-gray-600 dark:text-white/70">
              {weatherError || "Weather information is unavailable."}
            </p>

            <button
              onClick={loadWeather}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-white/10 px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </GlassCard>
        )}
      </section>

      {/* ==================================================
          AI ITINERARY
      ================================================== */}

      <section>
        <SectionHeader
          icon={<Calendar size={21} />}
          title="AI Itinerary"
          description="Your planned activities and schedule."
          actions={
            <div className="flex flex-wrap items-center gap-2">
              {!editingItinerary && normalizedItinerary.length > 0 && (
                <button
                  onClick={startEditingItinerary}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-white/10 px-4 py-2.5 text-sm text-gray-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition"
                >
                  <Edit size={17} />
                  Edit
                </button>
              )}

              {!editingItinerary && (
                <button
                  onClick={generateItinerary}
                  disabled={aiLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm text-white font-medium hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Sparkles size={17} />

                  {aiLoading
                    ? "Generating..."
                    : normalizedItinerary.length > 0
                      ? "Regenerate with AI"
                      : "Generate with AI"}
                </button>
              )}

              {editingItinerary && (
                <>
                  <button
                    onClick={cancelEditingItinerary}
                    disabled={savingItinerary}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-white/10 px-4 py-2.5 text-sm text-gray-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-white/20 disabled:opacity-50 transition"
                  >
                    <X size={17} />
                    Cancel
                  </button>

                  <button
                    onClick={saveItinerary}
                    disabled={savingItinerary}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm text-white font-medium hover:bg-cyan-600 disabled:opacity-50 transition"
                  >
                    <Save size={17} />

                    {savingItinerary ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}
            </div>
          }
        />

        {aiError && <p className="mb-4 text-sm text-red-500">{aiError}</p>}

        {normalizedItinerary.length > 0 ? (
          <div className="space-y-3">
            {(editingItinerary ? editedItinerary : normalizedItinerary).map(
              (day, index) => (
                <GlassCard key={index} className="p-4 sm:p-5">
                  {/* ONE day number only */}

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-sm font-bold">
                        {index + 1}
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          Day {index + 1}
                        </h3>

                        <p className="text-xs text-gray-500 dark:text-white/50">
                          Day {index + 1} of {normalizedItinerary.length}
                        </p>
                      </div>
                    </div>

                    {!editingItinerary && (
                      <button
                        onClick={() => regenerateDay(index)}
                        disabled={regeneratingDay === index || aiLoading}
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-white/10 px-3 py-2 text-xs font-medium text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 disabled:opacity-50 transition"
                      >
                        <RefreshCw
                          size={15}
                          className={
                            regeneratingDay === index ? "animate-spin" : ""
                          }
                        />

                        {regeneratingDay === index
                          ? "Regenerating..."
                          : "Regenerate Day"}
                      </button>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {editingItinerary ? (
                      <>
                        <EditableActivity
                          icon={<Sunrise size={17} />}
                          label="Morning"
                          value={day.morning || ""}
                          onChange={(value) =>
                            handleItineraryChange(index, "morning", value)
                          }
                        />

                        <EditableActivity
                          icon={<Sun size={17} />}
                          label="Afternoon"
                          value={day.afternoon || ""}
                          onChange={(value) =>
                            handleItineraryChange(index, "afternoon", value)
                          }
                        />

                        <EditableActivity
                          icon={<Moon size={17} />}
                          label="Evening"
                          value={day.evening || ""}
                          onChange={(value) =>
                            handleItineraryChange(index, "evening", value)
                          }
                        />
                      </>
                    ) : (
                      <>
                        <Activity
                          icon={<Sunrise size={17} />}
                          label="Morning"
                          text={day.morning || "No activity"}
                        />

                        <Activity
                          icon={<Sun size={17} />}
                          label="Afternoon"
                          text={day.afternoon || "No activity"}
                        />

                        <Activity
                          icon={<Moon size={17} />}
                          label="Evening"
                          text={day.evening || "No activity"}
                        />
                      </>
                    )}
                  </div>
                </GlassCard>
              ),
            )}
          </div>
        ) : (
          <GlassCard className="p-5">
            <p className="text-sm text-gray-600 dark:text-white/70">
              No itinerary available. Generate one with AI to create your
              personalized travel plan.
            </p>
          </GlassCard>
        )}
      </section>

      {/* ==================================================
          AI RECOMMENDATIONS
      ================================================== */}

      <section>
        <SectionHeader
          icon={<Sparkles size={21} />}
          title="AI Recommendations"
          description="Personalized ideas based on your interests."
          actions={
            <button
              onClick={generateRecommendations}
              disabled={recommendationsLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm text-white font-medium hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Sparkles size={17} />

              {recommendationsLoading
                ? "Generating..."
                : trip.recommendations
                  ? "Regenerate with AI"
                  : "Generate with AI"}
            </button>
          }
        />

        {/* Interests */}

        <GlassCard className="p-4 sm:p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={17} className="text-cyan-500" />

            <h3 className="font-semibold text-gray-900 dark:text-white">
              What are you interested in?
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => {
              const selected = selectedInterests.includes(interest);

              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium border transition ${
                    selected
                      ? "bg-cyan-500 text-white border-cyan-500"
                      : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/70 border-gray-200 dark:border-white/10 hover:border-cyan-500 hover:text-cyan-500"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </GlassCard>

        {recommendationsError && (
          <p className="mb-4 text-sm text-red-500">{recommendationsError}</p>
        )}

        {trip.recommendations ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <RecommendationCard
              title="Places to Visit"
              items={trip.recommendations.places}
            />

            <RecommendationCard
              title="Activities & Experiences"
              items={trip.recommendations.activities}
            />

            <RecommendationCard
              title="Food & Dining"
              items={trip.recommendations.food}
            />

            <RecommendationCard
              title="Travel Tips"
              items={trip.recommendations.tips}
            />
          </div>
        ) : (
          <GlassCard className="p-5">
            <p className="text-sm text-gray-600 dark:text-white/70">
              Select your interests and generate personalized recommendations
              with AI.
            </p>
          </GlassCard>
        )}
      </section>

      {/* ==================================================
          BUDGET PLANNING
      ================================================== */}

      <section>
        <SectionHeader
          icon={<Wallet size={21} />}
          title="Budget Planning"
          description="A smarter estimate for how your travel budget could be spent."
          actions={
            <button
              onClick={generateBudgetPlan}
              disabled={budgetLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm text-white font-medium hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Sparkles size={17} />

              {budgetLoading
                ? "Planning..."
                : trip.budgetPlan
                  ? "Regenerate"
                  : "Create Plan"}
            </button>
          }
        />

        {budgetError && (
          <p className="mb-4 text-sm text-red-500">{budgetError}</p>
        )}

        {trip.budgetPlan ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <BudgetCard
              icon={<Hotel size={18} />}
              title="Accommodation"
              value={trip.budgetPlan.accommodation}
            />

            <BudgetCard
              icon={<Utensils size={18} />}
              title="Food"
              value={trip.budgetPlan.food}
            />

            <BudgetCard
              icon={<Car size={18} />}
              title="Transportation"
              value={trip.budgetPlan.transportation}
            />

            <BudgetCard
              icon={<Ticket size={18} />}
              title="Activities"
              value={trip.budgetPlan.activities}
            />
          </div>
        ) : (
          <GlassCard className="p-5">
            <p className="text-sm text-gray-600 dark:text-white/70">
              Generate a budget plan to estimate accommodation, food,
              transportation, and activities.
            </p>
          </GlassCard>
        )}

        {trip.budgetPlan?.total !== undefined && (
          <GlassCard className="mt-3 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-white/60">
                  Estimated Total
                </p>

                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${trip.budgetPlan.total}
                </p>
              </div>

              <div className="text-sm text-gray-600 dark:text-white/70">
                Your budget:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${trip.budget || 0}
                </span>
              </div>
            </div>

            {trip.budgetPlan.summary && (
              <p className="mt-3 text-sm text-gray-600 dark:text-white/70">
                {trip.budgetPlan.summary}
              </p>
            )}
          </GlassCard>
        )}
      </section>

      {/* ==================================================
          PACKING LIST
      ================================================== */}

      <section>
        <SectionHeader
          icon={<Backpack size={21} />}
          title="Packing List"
          description="Items prepared specifically for your trip."
          actions={
            <button
              onClick={generatePackingList}
              disabled={packingLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm text-white font-medium hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Sparkles size={17} />

              {packingLoading
                ? "Generating..."
                : trip.packingList?.length > 0
                  ? "Regenerate with AI"
                  : "Generate with AI"}
            </button>
          }
        />

        {packingError && (
          <p className="mb-4 text-sm text-red-500">{packingError}</p>
        )}

        {Array.isArray(trip.packingList) && trip.packingList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {trip.packingList.map((item, index) => (
              <GlassCard key={index} className="p-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center shrink-0 w-7 h-7 rounded-full bg-cyan-500/10 text-cyan-500">
                    <Check size={15} />
                  </div>

                  <p className="text-sm text-gray-800 dark:text-white">
                    {item}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard className="p-5">
            <p className="text-sm text-gray-600 dark:text-white/70">
              No packing list available. Generate one with AI to get
              personalized suggestions for your trip.
            </p>
          </GlassCard>
        )}
      </section>
    </div>
  );
}

// ======================================================
// SECTION HEADER
// ======================================================

function SectionHeader({ icon, title, description, actions }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-white/60">
              {description}
            </p>
          </div>

          {actions}
        </div>
      </div>
    </div>
  );
}

// ======================================================
// INFO
// ======================================================

function Info({ icon, label, text }) {
  return (
    <div className="rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/5 p-3.5">
      <div className="flex items-center gap-2 text-cyan-500">
        {icon}

        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className="mt-2 text-sm text-gray-800 dark:text-white">{text}</p>
    </div>
  );
}

// ======================================================
// ACTIVITY
// ======================================================

function Activity({ icon, label, text }) {
  return (
    <div className="flex gap-3 rounded-lg bg-gray-50 dark:bg-white/5 p-3">
      <div className="text-cyan-500 mt-0.5 shrink-0">{icon}</div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {label}
        </p>

        <p className="mt-0.5 text-sm text-gray-600 dark:text-white/70">
          {text}
        </p>
      </div>
    </div>
  );
}

// ======================================================
// EDITABLE ACTIVITY
// ======================================================

function EditableActivity({ icon, label, value, onChange }) {
  return (
    <div className="rounded-lg bg-gray-50 dark:bg-white/5 p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-cyan-500">{icon}</div>

        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {label}
        </p>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2.5 text-sm text-gray-900 dark:text-white outline-none resize-none focus:ring-2 focus:ring-cyan-500"
        placeholder={`Enter ${label.toLowerCase()} activity...`}
      />
    </div>
  );
}

// ======================================================
// RECOMMENDATION CARD
// ======================================================

function RecommendationCard({ title, items }) {
  return (
    <GlassCard className="p-4">
      <h3 className="text-base font-bold text-gray-900 dark:text-white">
        {title}
      </h3>

      {Array.isArray(items) && items.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-gray-700 dark:text-white/75"
            >
              <Sparkles size={15} className="shrink-0 mt-0.5 text-cyan-500" />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-gray-500 dark:text-white/60">
          No recommendations available.
        </p>
      )}
    </GlassCard>
  );
}

// ======================================================
// BUDGET CARD
// ======================================================

function BudgetCard({ icon, title, value }) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-center gap-2 text-cyan-500">
        {icon}

        <span className="text-sm font-medium text-gray-700 dark:text-white/70">
          {title}
        </span>
      </div>

      <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
        ${Number(value || 0)}
      </p>
    </GlassCard>
  );
}

export default TripDetails;
