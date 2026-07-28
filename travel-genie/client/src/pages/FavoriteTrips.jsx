import { useContext } from "react";
import { TripContext } from "../context/TripContext";

import SavedTripCard from "../components/SavedTrip/SavedTripCard";

export default function FavoriteTrips() {
  const { trips, deleteTrip, toggleFavorite } = useContext(TripContext);

  const favoriteTrips = trips.filter((trip) => trip.favorite);

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
          ⭐ Favorite Trips
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
          Your most loved adventures
        </p>

        {favoriteTrips.length === 0 ? (
          <div
            className="
text-center
text-gray-500
dark:text-gray-300
"
          >
            No favorite trips yet.
          </div>
        ) : (
          <div
            className="
grid
gap-8
md:grid-cols-2
lg:grid-cols-3
"
          >
            {favoriteTrips.map((trip) => (
              <SavedTripCard
                key={trip.id}
                trip={trip}
                onDelete={deleteTrip}
                onFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
