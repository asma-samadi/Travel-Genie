import { useContext } from "react";
import { TripContext } from "../context/TripContext";
import TripCard from "../components/TripCard/TripCard";

export default function SavedTrips() {
  const { trips } = useContext(TripContext);

  console.log("Saved trips:", trips);

  return (
    <div className="py-16 px-5">
      <h1 className="text-4xl font-bold text-center mb-10">Saved Trips</h1>

      {trips.length === 0 ? (
        <p className="text-center text-gray-500">No saved trips yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}
