import { useParams } from "react-router-dom";
import { useContext } from "react";

import { TripContext } from "../context/TripContext";

export default function Trip() {
  const { id } = useParams();

  const { trips } = useContext(TripContext);

  const trip = trips.find((item) => item.id === id);

  if (!trip) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-3xl font-bold">Trip not found</h1>
      </div>
    );
  }

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
        {/* Header */}

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
              📅 {trip.dates.start}-{trip.dates.end}
            </p>

            <p>✈ Style: {trip.travelStyle}</p>
          </div>
        </div>

        {/* Itinerary */}

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

          <p
            className="
mt-5
text-gray-500
"
          >
            Your AI generated travel plan will appear here.
          </p>
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

          <div className="mt-5 space-y-3">
            <p>🏨 Accommodation: ${trip.estimatedCost?.accommodation || 0}</p>

            <p>🍽 Food: ${trip.estimatedCost?.food || 0}</p>

            <p>🚕 Transport: ${trip.estimatedCost?.transport || 0}</p>

            <p>🎟 Activities: ${trip.estimatedCost?.activities || 0}</p>
          </div>
        </div>

        {/* Packing */}

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

          {trip.packingList?.length === 0 ? (
            <p className="mt-5">No items yet.</p>
          ) : (
            trip.packingList.map((item, index) => <p key={index}>✅ {item}</p>)
          )}
        </div>
      </div>
    </section>
  );
}
