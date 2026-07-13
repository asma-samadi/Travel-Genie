export default function TripCard({ trip }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5">
      <h3 className="text-xl font-bold text-blue-600">{trip.destination}</h3>

      <p className="mt-2">Budget: ${trip.budget}</p>

      <p className="text-gray-500">{trip.dates}</p>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
        View Trip
      </button>
    </div>
  );
}
