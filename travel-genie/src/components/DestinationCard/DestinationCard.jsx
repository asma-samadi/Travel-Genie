export default function DestinationCard({ destination }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5">
      <h3 className="text-xl font-bold text-blue-600">{destination.name}</h3>

      <p className="text-gray-500">{destination.country}</p>

      <p className="mt-3 text-gray-600">{destination.description}</p>
    </div>
  );
}
