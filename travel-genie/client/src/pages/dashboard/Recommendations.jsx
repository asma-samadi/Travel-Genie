import { useState } from "react";

import {
  MapPin,
  Sparkles,
  Compass,
  Utensils,
  Camera,
  Mountain,
  Users,
  Wallet,
  CalendarDays,
  RefreshCw,
} from "lucide-react";

import GlassCard from "../../components/common/GlassCard";
import { useTrips } from "../../context/TripContext.jsx";
import { generateAIResponse } from "../../services/ai";

function Recommendations() {
  const { trips, loading, updateTrip } = useTrips();

  const [selectedTripId, setSelectedTripId] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [recommendationsError, setRecommendationsError] = useState("");

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
  // SELECTED TRIP
  // ======================================================

  const selectedTrip = trips.find(
    (trip) => String(trip.id) === String(selectedTripId),
  );

  // ======================================================
  // SELECT TRIP
  // ======================================================

  const handleTripSelect = (event) => {
    const tripId = event.target.value;

    setSelectedTripId(tripId);
    setSelectedInterests([]);
    setRecommendationsError("");
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
    if (!selectedTrip) {
      setRecommendationsError("Please select a trip first.");
      return;
    }

    try {
      setRecommendationsLoading(true);
      setRecommendationsError("");

      const startDate =
        selectedTrip.dates?.start || selectedTrip.start_date || "Not specified";

      const endDate =
        selectedTrip.dates?.end || selectedTrip.end_date || "Not specified";

      const travelers = selectedTrip.travelers || 1;
      const budget = selectedTrip.budget || 0;

      const interestText =
        selectedInterests.length > 0
          ? selectedInterests.join(", ")
          : "General travel, popular attractions, local experiences, food, and culture";

      const prompt = `
You are TravelGenie, a personalized travel recommendation AI.

Your job is to create UNIQUE recommendations specifically for this user's trip.

TRIP INFORMATION:

Destination: ${selectedTrip.destination}
Trip title: ${selectedTrip.title || selectedTrip.destination}
Start date: ${startDate}
End date: ${endDate}
Number of travelers: ${travelers}
Budget: $${budget}

SELECTED INTERESTS:
${interestText}

IMPORTANT PERSONALIZATION RULES:

1. The destination is the most important constraint.
Every recommendation must be relevant to ${selectedTrip.destination}.

2. The selected interests are a HARD REQUIREMENT.
Prioritize recommendations that directly match:
${interestText}

3. Do NOT simply return the most famous tourist attractions.

4. Avoid predictable repeated recommendations such as:
- the same famous mosque
- the same famous museum
- the same famous lake
- the same famous market
- the same famous historical city

unless they are strongly relevant to the user's selected interests.

5. Prefer a MIX of:
- well-known places
- lesser-known places
- local experiences
- neighborhoods
- cultural experiences
- destination-specific activities
- local food experiences
- practical destination-specific advice

6. Every recommendation must be DIFFERENT from the others.

7. Do not recommend places from another country or unrelated destination.

8. Do not give generic advice that could apply to any country.

9. Consider the number of travelers (${travelers}) when suggesting activities.

10. Consider the budget ($${budget}) when suggesting experiences.

11. Consider the trip duration (${startDate} to ${endDate}) when suggesting recommendations.

12. Recommendations should be realistic and useful for someone actually visiting the destination.

13. Do not invent attractions, restaurants, events, or places.

14. If the selected interests are specific, do not fill the response with unrelated attractions.

VARIETY REQUIREMENT:

Before producing the final answer, internally check that:
- the 5 places are different from each other
- the 5 activities are different from each other
- the 5 food recommendations are different from each other
- the 5 tips are different from each other
- the recommendations strongly match the selected interests
- the recommendations are specifically about ${selectedTrip.destination}

Generate exactly 5 recommendations for each category.

Each recommendation should contain useful details rather than only a place name.

Return ONLY valid JSON.

Use exactly this structure:

{
  "places": [
    "Specific personalized place recommendation",
    "Specific personalized place recommendation",
    "Specific personalized place recommendation",
    "Specific personalized place recommendation",
    "Specific personalized place recommendation"
  ],
  "activities": [
    "Specific personalized activity",
    "Specific personalized activity",
    "Specific personalized activity",
    "Specific personalized activity",
    "Specific personalized activity"
  ],
  "food": [
    "Specific local food recommendation",
    "Specific local food recommendation",
    "Specific local food recommendation",
    "Specific local food recommendation",
    "Specific local food recommendation"
  ],
  "tips": [
    "Specific destination-related travel tip",
    "Specific destination-related travel tip",
    "Specific destination-related travel tip",
    "Specific destination-related travel tip",
    "Specific destination-related travel tip"
  ]
}

Do not include markdown.

Do not include explanations.

Do not include comments.

Do not include placeholders.

Do not copy examples.

Return only the JSON object.
`;





console.log("SELECTED TRIP:", selectedTrip);
console.log("DESTINATION SENT TO AI:", selectedTrip.destination);
console.log("AI PROMPT:", prompt);





      const recommendations = await generateAIResponse(prompt);

      if (
        !recommendations ||
        typeof recommendations !== "object" ||
        Array.isArray(recommendations)
      ) {
        throw new Error("AI returned invalid recommendations.");
      }

      const cleanedRecommendations = {
        places: Array.isArray(recommendations.places)
          ? recommendations.places.filter(Boolean)
          : [],

        activities: Array.isArray(recommendations.activities)
          ? recommendations.activities.filter(Boolean)
          : [],

        food: Array.isArray(recommendations.food)
          ? recommendations.food.filter(Boolean)
          : [],

        tips: Array.isArray(recommendations.tips)
          ? recommendations.tips.filter(Boolean)
          : [],
      };

      const updatedTripData = {
        ...selectedTrip,
        recommendations: cleanedRecommendations,
        recommendationInterests: selectedInterests,
      };

      await updateTrip(selectedTrip.id, updatedTripData);
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
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-white/70">
          <RefreshCw size={20} className="animate-spin text-cyan-500" />
          <span>Loading your trips...</span>
        </div>
      </div>
    );
  }

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div className="space-y-8">
      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <section>
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              shadow-lg
            "
          >
            <Sparkles size={24} />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Smart Recommendations
            </h1>

            <p className="mt-1 text-white/70">
              Discover places and experiences selected specifically for your
              trip.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          QUICK STATS
      ================================================== */}

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <GlassCard className="p-5">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-500/15
                  text-cyan-500
                "
              >
                <Compass size={20} />
              </div>

              <div>
                <p className="text-sm text-white/60">Destinations</p>

                <p className="font-semibold text-white">
                  {trips.length} saved trips
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-500/15
                  text-blue-500
                "
              >
                <Mountain size={20} />
              </div>

              <div>
                <p className="text-sm text-white/60">Activities</p>

                <p className="font-semibold text-white">AI personalized</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-500/15
                  text-purple-500
                "
              >
                <Utensils size={20} />
              </div>

              <div>
                <p className="text-sm text-white/60">Food</p>

                <p className="font-semibold text-white">Local experiences</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ==================================================
          CHOOSE TRIP
      ================================================== */}

      <section>
        <div className="mb-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Choose a trip
          </h2>

          <p className="mt-1 text-white/60">
            Select the trip you want personalized recommendations for.
          </p>
        </div>

        {trips.length === 0 ? (
          <GlassCard className="p-6">
            <div className="flex flex-col items-center justify-center text-center">
              <Compass size={36} className="text-white/40" />

              <h3 className="mt-3 text-lg font-semibold text-white">
                No trips available
              </h3>

              <p className="mt-1 text-sm text-white/60">
                Create a trip first to receive personalized recommendations.
              </p>
            </div>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            {/* TRIP SELECT */}

            <GlassCard className="p-5">
              <label
                htmlFor="trip-select"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Select your trip
              </label>

              <select
                id="trip-select"
                value={selectedTripId}
                onChange={handleTripSelect}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  dark:border-white/10
                  bg-white
                  dark:bg-white/5
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  dark:text-white
                  outline-none
                  focus:ring-2
                  focus:ring-cyan-500
                  transition
                "
              >
                <option value="" className="text-gray-900">
                  Select a trip...
                </option>

                {trips.map((trip) => (
                  <option
                    key={trip.id}
                    value={trip.id}
                    className="text-gray-900"
                  >
                    {trip.title || trip.destination} — {trip.destination}
                  </option>
                ))}
              </select>
            </GlassCard>

            {/* SELECTED TRIP INFORMATION */}

            {selectedTrip && (
              <GlassCard className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-cyan-500 shrink-0" />

                      <h3 className="text-xl font-bold text-white">
                        {selectedTrip.title || selectedTrip.destination}
                      </h3>
                    </div>

                    <p className="mt-1 text-sm text-white/60">
                      {selectedTrip.destination}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <TripInfo
                      icon={<CalendarDays size={16} />}
                      label="Duration"
                      value={getTripDuration(selectedTrip)}
                    />

                    <TripInfo
                      icon={<Users size={16} />}
                      label="Travelers"
                      value={`${selectedTrip.travelers || 1}`}
                    />

                    <TripInfo
                      icon={<Wallet size={16} />}
                      label="Budget"
                      value={`$${selectedTrip.budget || 0}`}
                    />
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        )}
      </section>

      {/* ==================================================
          INTERESTS
      ================================================== */}

      {selectedTrip && (
        <section>
          <div className="mb-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What are you interested in?
            </h2>

            <p className="mt-1 text-white/60">
              Choose your interests so the AI can personalize your
              recommendations.
            </p>
          </div>

          <GlassCard className="p-5">
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => {
                const selected = selectedInterests.includes(interest);

                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`
                      rounded-full
                      px-4
                      py-2
                      text-sm
                      font-medium
                      border
                      transition
                      ${
                        selected
                          ? "bg-cyan-500 text-white border-cyan-500"
                          : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/70 border-gray-200 dark:border-white/10 hover:border-cyan-500 hover:text-cyan-500"
                      }
                    `}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="button"
                onClick={generateRecommendations}
                disabled={recommendationsLoading}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  hover:scale-[1.01]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition
                "
              >
                <Sparkles
                  size={17}
                  className={recommendationsLoading ? "animate-pulse" : ""}
                />

                {recommendationsLoading
                  ? "Generating..."
                  : selectedTrip.recommendations
                    ? "Regenerate with AI"
                    : "Generate with AI"}
              </button>

              {selectedInterests.length > 0 && (
                <p className="text-xs text-white/50">
                  {selectedInterests.length} interest
                  {selectedInterests.length !== 1 ? "s" : ""} selected
                </p>
              )}
            </div>
          </GlassCard>

          {recommendationsError && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{recommendationsError}</p>
            </div>
          )}
        </section>
      )}

      {/* ==================================================
          RECOMMENDATIONS
      ================================================== */}

      {selectedTrip && (
        <section>
          <div className="mb-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Recommended for You
            </h2>

            <p className="mt-1 text-white/60">
              Personalized recommendations generated by AI for your trip.
            </p>
          </div>

          {selectedTrip.recommendations ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <RecommendationCard
                icon={<MapPin size={19} />}
                title="Places to Visit"
                items={selectedTrip.recommendations.places}
              />

              <RecommendationCard
                icon={<Mountain size={19} />}
                title="Activities & Experiences"
                items={selectedTrip.recommendations.activities}
              />

              <RecommendationCard
                icon={<Utensils size={19} />}
                title="Food & Dining"
                items={selectedTrip.recommendations.food}
              />

              <RecommendationCard
                icon={<Compass size={19} />}
                title="Travel Tips"
                items={selectedTrip.recommendations.tips}
              />
            </div>
          ) : (
            <GlassCard className="p-6">
              <div className="flex flex-col items-center justify-center text-center">
                <Sparkles size={36} className="text-cyan-500" />

                <h3 className="mt-3 text-lg font-semibold text-white">
                  Ready for personalized recommendations?
                </h3>

                <p className="mt-1 max-w-md text-sm text-white/60">
                  Select your interests above and click Generate with AI to
                  create recommendations specifically for this trip.
                </p>
              </div>
            </GlassCard>
          )}
        </section>
      )}
    </div>
  );
}

// ======================================================
// TRIP INFO
// ======================================================

function TripInfo({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/5 px-3 py-2.5">
      <div className="flex items-center gap-2 text-cyan-500">
        {icon}

        <span className="text-xs font-medium text-gray-600 dark:text-white/60">
          {label}
        </span>
      </div>

      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

// ======================================================
// RECOMMENDATION CARD
// ======================================================

function RecommendationCard({ icon, title, items }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
          {icon}
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>

      {Array.isArray(items) && items.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="
                flex
                items-start
                gap-3
                rounded-xl
                bg-gray-50
                dark:bg-white/5
                border
                border-gray-100
                dark:border-white/5
                p-3
              "
            >
              <div className="mt-0.5 shrink-0 text-cyan-500">
                <Sparkles size={15} />
              </div>

              <span className="text-sm leading-6 text-gray-700 dark:text-white/75">
                {item}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-gray-500 dark:text-white/50">
          No recommendations available.
        </p>
      )}
    </GlassCard>
  );
}

// ======================================================
// GET TRIP DURATION
// ======================================================

function getTripDuration(trip) {
  const start = trip.dates?.start || trip.start_date;
  const end = trip.dates?.end || trip.end_date;

  if (!start || !end) {
    return "N/A";
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return "N/A";
  }

  const difference =
    Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;

  return `${Math.max(1, difference)} days`;
}

export default Recommendations;
