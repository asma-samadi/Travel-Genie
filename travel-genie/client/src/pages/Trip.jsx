import { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { TripContext } from "../context/TripContext";

import { generateAIResponse } from "../services/ai";
import { itineraryPrompt } from "../utils/prompts";

import toast from "react-hot-toast";

export default function Trip() {
  const { id } = useParams();

  const { trips, saveItinerary, addItineraryVersion } = useContext(TripContext);

  const trip = trips.find((item) => item.id === id);

  const [loading, setLoading] = useState(false);

  const [itinerary, setItinerary] = useState(
    trip?.itineraries?.length
      ? trip.itineraries[trip.itineraries.length - 1].data
      : trip?.itinerary || null,
  );

  const [error, setError] = useState("");

  if (!trip) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-3xl font-bold">Trip not found</h1>
      </div>
    );
  }

  const generateItinerary = async () => {
    try {
      setLoading(true);
      setError("");

      const prompt = itineraryPrompt(trip);

      const result = await generateAIResponse(prompt);

      // Show new result
      setItinerary(result);

      // Save as a new version
      addItineraryVersion(trip.id, result);
    } catch (error) {
      console.error(error);

      setError("Failed to generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
      min-h-screen
      bg-stone-50
      py-20
      dark:bg-[#0F172A]
      "
    >
      <div
        className="
        max-w-5xl
        mx-auto
        px-6
        "
      >
        {/* Trip Header */}

        <div
          className="
          rounded-3xl
          bg-white
          p-8
          shadow-lg
          dark:bg-[#1E293B]
          "
        >
          <h1
            className="
            text-5xl
            font-bold
            dark:text-white
            "
          >
            {trip.destination}
          </h1>

          <div
            className="
            mt-5
            space-y-2
            text-gray-600
            dark:text-gray-300
            "
          >
            <p>💰 Budget: ${trip.budget}</p>

            <p>
              📅 {trip.dates.start} - {trip.dates.end}
            </p>

            <p>✈ Style: {trip.travelStyle}</p>
          </div>
        </div>

        {/* AI Itinerary */}

        <div
          className="
          mt-10
          rounded-3xl
          bg-white
          p-8
          shadow-lg
          dark:bg-[#1E293B]
          "
        >
          <h2
            className="
            text-3xl
            font-bold
            dark:text-white
            "
          >
            ✨ AI Itinerary
          </h2>

          <button
            onClick={generateItinerary}
            disabled={loading}
            className="
            mt-5
            rounded-xl
            bg-lime-500
            px-6
            py-3
            font-bold
            transition
            duration-200
            hover:bg-lime-600
            hover:scale-105
            cursor-pointer
            disabled:opacity-50
            "
          >
            {loading ? "Generating..." : "🔄 Generate New Plan"}
          </button>

          {error && <p className="mt-5 text-red-500">{error}</p>}

          {itinerary && (
            <div
              className="
              mt-8
              space-y-6
              text-gray-700
              dark:text-gray-200
              "
            >
              <h1
                className="
                text-3xl
                font-bold
                "
              >
                {itinerary.title}
              </h1>

              <p>Duration: {itinerary.duration}</p>

              {itinerary.days?.map((day, index) => (
                <div
                  key={index}
                  className="
                  rounded-xl
                  border
                  p-5
                  "
                >
                  <h2
                    className="
                    text-2xl
                    font-bold
                    "
                  >
                    Day {index + 1}: {day.title}
                  </h2>

                  <p className="mt-3">
                    🌅 <b>Morning:</b> {day.morning}
                  </p>

                  <p>
                    ☀️ <b>Afternoon:</b> {day.afternoon}
                  </p>

                  <p>
                    🌙 <b>Evening:</b> {day.evening}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Previous Versions */}

          {trip.itineraries?.length > 0 && (
            <div className="mt-10">
              <h2
                className="
                text-2xl
                font-bold
                "
              >
                📚 Previous Plans
              </h2>

              {trip.itineraries.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setItinerary(item.data)}
                  className="
                  block
                  mt-3
                  rounded-xl
                  bg-gray-200
                  px-4
                  py-2
                  transition
                  hover:bg-gray-300
                  cursor-pointer
                  "
                >
                  Plan created: {item.createdAt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Budget */}

        <div
          className="
          mt-10
          rounded-3xl
          bg-white
          p-8
          shadow-lg
          dark:bg-[#1E293B]
          "
        >
          <h2
            className="
            text-3xl
            font-bold
            dark:text-white
            "
          >
            💰 Budget Breakdown
          </h2>

          {itinerary?.budget ? (
            <div className="mt-5 space-y-3">
              <p>🏨 Accommodation: ${itinerary.budget.accommodation}</p>

              <p>🍽 Food: ${itinerary.budget.food}</p>

              <p>🚕 Transport: ${itinerary.budget.transport}</p>

              <p>🎟 Activities: ${itinerary.budget.activities}</p>

              <p className="font-bold">Total: ${itinerary.budget.total}</p>
            </div>
          ) : (
            <p className="mt-5">Generate itinerary to see budget.</p>
          )}
        </div>

        {/* Packing List */}

        <div
          className="
          mt-10
          rounded-3xl
          bg-white
          p-8
          shadow-lg
          dark:bg-[#1E293B]
          "
        >
          <h2
            className="
            text-3xl
            font-bold
            dark:text-white
            "
          >
            🎒 Packing List
          </h2>

          {itinerary?.packing?.length ? (
            itinerary.packing.map((item, index) => <p key={index}>✅ {item}</p>)
          ) : (
            <p className="mt-5">Generate itinerary to see packing list.</p>
          )}
        </div>

        {/* Save Button */}

        {itinerary && (
          <button
            onClick={() => {
              saveItinerary(trip.id, itinerary);

              toast.success("Itinerary saved successfully!");
            }}
            className="
            mt-6
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-bold
            text-white
            transition
            duration-200
            hover:bg-blue-700
            hover:scale-105
            cursor-pointer
            "
          >
            💾 Save Itinerary
          </button>
        )}
      </div>
    </section>
  );
}
