import savedTrips from "../../data/savedTrips";
import TripCard from "../TripCard/TripCard";

export default function RecentSavedTrips() {
  return (
    <section className="py-16 px-5">
      <h2 className="text-3xl font-bold text-center mb-10">
        Recent Saved Trips
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {savedTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </section>
  );
}
