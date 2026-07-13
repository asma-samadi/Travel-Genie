import { useContext } from "react";
import { TripContext } from "../../context/TripContext";
import TripCard from "../TripCard/TripCard";

export default function RecentSavedTrips() {
  const { trips } = useContext(TripContext);

  return (
    <section className="py-16 px-5">
      <h2 className="text-3xl font-bold text-center mb-10">
        Recent Saved Trips
      </h2>

      {trips.length === 0 ? (
        <p className="text-center text-gray-500">No saved trips yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {trips.slice(0, 2).map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </section>
  );
}
