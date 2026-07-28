import { useContext } from "react";
import { TripContext } from "../context/TripContext";

import SavedTripCard from "../components/SavedTrip/SavedTripCard";
import EmptyTrips from "../components/SavedTrip/EmptyTrips";

export default function SavedTrips() {
  const { trips, deleteTrip, toggleFavorite, searchQuery } =
    useContext(TripContext);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?",
    );

    if (!confirmDelete) {
      return;
    }

    deleteTrip(id);
  };

  const filteredTrips = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  console.log(searchQuery);

  console.log(filteredTrips);

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
          My Saved Trips
        </h1>

        <p
          className="
mt-4
mb-12
text-center
text-gray-600
dark:text-gray-300
"
        >
          Manage all your planned adventures in one place.
        </p>

        {filteredTrips.length === 0 ? (
          <EmptyTrips />
        ) : (
          <div
            className="
grid
gap-8
md:grid-cols-2
lg:grid-cols-3
"
          >
            {filteredTrips.map((trip) => (
              <SavedTripCard
                key={trip.id}
                trip={trip}
                onDelete={handleDelete}
                onFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
