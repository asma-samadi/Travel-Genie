import { useContext } from "react";
import { TripContext } from "../context/TripContext";

import SavedTripCard from "../components/SavedTrip/SavedTripCard";

export default function DraftTrips() {
  const { trips, deleteTrip } = useContext(TripContext);

  const drafts = trips.filter((trip) => trip.status === "draft");

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
max-w-7xl
mx-auto
px-6
"
      >
        <h1
          className="
text-center
text-5xl
font-bold
dark:text-white
"
        >
          📝 Draft Trips
        </h1>

        <p
          className="
text-center
mt-4
mb-12
text-gray-600
dark:text-gray-300
"
        >
          Continue planning your unfinished adventures.
        </p>

        <div
          className="
grid
gap-8
md:grid-cols-2
lg:grid-cols-3
"
        >
          {drafts.map((trip) => (
            <SavedTripCard key={trip.id} trip={trip} onDelete={deleteTrip} />
          ))}
        </div>
      </div>
    </section>
  );
}
