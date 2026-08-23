import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

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
} from "lucide-react";

import { generateAIResponse } from "../../services/ai";
import { useTrips } from "../../context/TripContext.jsx";
import GlassCard from "../../components/common/GlassCard";

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { trips, loading, toggleFavorite, updateTrip } = useTrips();

  // AI Itinerary states
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  // AI Packing List states
  const [packingLoading, setPackingLoading] = useState(false);
  const [packingError, setPackingError] = useState("");

  if (loading) {
    return <div className="text-gray-900 dark:text-white">Loading trip...</div>;
  }

  const trip = trips.find((item) => String(item.id) === String(id));

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

  // Generate AI Itinerary
  const generateItinerary = async () => {
    try {
      setAiLoading(true);
      setAiError("");

      console.log("Sending itinerary request to AI...");

      const prompt = `
Create a detailed travel itinerary for this trip.

Destination: ${trip.destination}

Travel dates:
${trip.dates?.start || trip.start_date || "Not specified"} to ${
        trip.dates?.end || trip.end_date || "Not specified"
      }

Number of travelers: ${trip.travelers || 1}

Budget: $${trip.budget || 0}

Return ONLY valid JSON.

Use exactly this structure:

[
  {
    "title": "Day 1",
    "morning": "Morning activity",
    "afternoon": "Afternoon activity",
    "evening": "Evening activity"
  }
]

Create one object for each day of the trip.

Do not include markdown.
Do not include explanations outside the JSON.
`;

      const itinerary = await generateAIResponse(prompt);

      console.log("AI ITINERARY:", itinerary);

      if (!Array.isArray(itinerary)) {
        throw new Error("AI returned an invalid itinerary.");
      }

      await updateTrip(trip.id, {
        ...trip,
        itinerary,
      });

      console.log("Itinerary saved successfully.");
    } catch (error) {
      console.error("Itinerary generation failed:", error);
      setAiError("Failed to generate itinerary. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  // Generate AI Packing List
  const generatePackingList = async () => {
    try {
      setPackingLoading(true);
      setPackingError("");

      console.log("Sending packing list request to AI...");

      const prompt = `
Create a practical packing list for this trip.

Destination: ${trip.destination}

Travel dates:
${trip.dates?.start || trip.start_date || "Not specified"} to ${
        trip.dates?.end || trip.end_date || "Not specified"
      }

Number of travelers: ${trip.travelers || 1}

Budget: $${trip.budget || 0}

Consider the destination, travel duration, and general travel needs.

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

      console.log("AI PACKING LIST:", packingList);

      if (!Array.isArray(packingList)) {
        throw new Error("AI returned an invalid packing list.");
      }

      const cleanedPackingList = packingList
        .map((item) => {
          if (typeof item === "string") return item;

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

      console.log("Packing list saved successfully.");
    } catch (error) {
      console.error("Packing list generation failed:", error);
      setPackingError("Failed to generate packing list. Please try again.");
    } finally {
      setPackingLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 rounded-xl px-4 py-2.5 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white hover:bg-gray-100 hover:text-cyan-500 dark:hover:bg-white/20 transition"
      >
        <ArrowLeft size={19} />
        Back
      </button>

      {/* Trip Header */}
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-4">
              <MapPin size={16} />
              Trip Destination
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              {trip.title || trip.destination}
            </h1>

            <div className="flex items-center gap-2 mt-4 text-gray-600 dark:text-white/70">
              <MapPin size={18} className="text-cyan-500" />
              <span>{trip.destination}</span>
            </div>
          </div>

          <button
            onClick={() => toggleFavorite(trip.id)}
            className="self-start flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/10 hover:scale-105 transition"
            aria-label="Toggle favorite"
          >
            <Heart
              size={24}
              className={
                trip.favorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 dark:text-white/60"
              }
            />
          </button>
        </div>

        {/* Trip Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <Info
            icon={<Calendar size={21} />}
            label="Travel Dates"
            text={`${trip.dates?.start || trip.start_date || "No date"} - ${
              trip.dates?.end || trip.end_date || "No date"
            }`}
          />

          <Info
            icon={<Users size={21} />}
            label="Travelers"
            text={`${trip.travelers || 1} Travelers`}
          />

          <Info
            icon={<Wallet size={21} />}
            label="Budget"
            text={`$${trip.budget || 0}`}
          />
        </div>
      </GlassCard>

      {/* AI Itinerary */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-500">
            <Calendar size={21} />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  AI Itinerary
                </h2>

                <p className="text-sm text-gray-500 dark:text-white/60">
                  Your planned activities and schedule.
                </p>
              </div>

              <button
                onClick={generateItinerary}
                disabled={aiLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-white font-medium hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Sparkles size={18} />
                {aiLoading
                  ? "Generating..."
                  : trip.itinerary?.length > 0
                    ? "Regenerate with AI"
                    : "Generate with AI"}
              </button>
            </div>
          </div>
        </div>

        {aiError && <p className="mb-4 text-sm text-red-500">{aiError}</p>}

        {Array.isArray(trip.itinerary) && trip.itinerary.length > 0 ? (
          <div className="space-y-5">
            {trip.itinerary.map((day, index) => (
              <GlassCard key={index} className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold">
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {day.title || `Day ${index + 1}`}
                  </h3>
                </div>

                <div className="space-y-4">
                  <Activity
                    icon={<Sunrise size={19} />}
                    label="Morning"
                    text={day.morning || "No activity"}
                  />

                  <Activity
                    icon={<Sun size={19} />}
                    label="Afternoon"
                    text={day.afternoon || "No activity"}
                  />

                  <Activity
                    icon={<Moon size={19} />}
                    label="Evening"
                    text={day.evening || "No activity"}
                  />
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard className="p-6">
            <p className="text-gray-600 dark:text-white/70">
              No itinerary available. Generate one with AI to create your
              personalized travel plan.
            </p>
          </GlassCard>
        )}
      </section>

      {/* Packing List */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-500">
            <Backpack size={21} />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Packing List
                </h2>

                <p className="text-sm text-gray-500 dark:text-white/60">
                  Items prepared specifically for your trip.
                </p>
              </div>

              <button
                onClick={generatePackingList}
                disabled={packingLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-white font-medium hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Sparkles size={18} />
                {packingLoading
                  ? "Generating..."
                  : trip.packingList?.length > 0
                    ? "Regenerate with AI"
                    : "Generate with AI"}
              </button>
            </div>
          </div>
        </div>

        {packingError && (
          <p className="mb-4 text-sm text-red-500">{packingError}</p>
        )}

        {Array.isArray(trip.packingList) && trip.packingList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trip.packingList.map((item, index) => (
              <GlassCard key={index} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-500">
                    <Check size={17} />
                  </div>

                  <p className="text-gray-800 dark:text-white">{item}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard className="p-6">
            <p className="text-gray-600 dark:text-white/70">
              No packing list available. Generate one with AI to get
              personalized suggestions for your trip.
            </p>
          </GlassCard>
        )}
      </section>
    </div>
  );
}

function Info({ icon, label, text }) {
  return (
    <div className="rounded-2xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/5 p-4">
      <div className="flex items-center gap-2 text-cyan-500">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>

      <p className="mt-3 text-sm sm:text-base text-gray-800 dark:text-white">
        {text}
      </p>
    </div>
  );
}

function Activity({ icon, label, text }) {
  return (
    <div className="flex gap-4 rounded-xl bg-gray-50 dark:bg-white/5 p-4">
      <div className="text-cyan-500 mt-0.5">{icon}</div>

      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{label}</p>

        <p className="mt-1 text-gray-600 dark:text-white/70">{text}</p>
      </div>
    </div>
  );
}

export default TripDetails;
