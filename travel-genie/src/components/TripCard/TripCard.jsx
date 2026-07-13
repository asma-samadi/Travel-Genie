import { Link } from "react-router-dom";

export default function TripCard({ trip }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-blue-600">{trip.destination}</h2>

      <p className="mt-2">Budget: ${trip.budget}</p>

      <p>Travel Style: {trip.travelStyle}</p>

      <p>Start Date: {trip.dates.start}</p>

      <p>End Date: {trip.dates.end}</p>

      <Link
        to={`/trip/${trip.id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        View Trip
      </Link>
    </div>
  );
}
