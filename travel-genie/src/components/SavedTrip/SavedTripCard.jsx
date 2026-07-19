import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

export default function SavedTripCard({ trip, onDelete, onFavorite }) {
  return (
    <div
      className="
      rounded-3xl
      bg-white
      p-6
      shadow-lg
      transition
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      dark:bg-[#1E293B]
      "
    >
      <div className="flex items-center justify-between">
        <h2
          className="
  text-2xl
  font-bold
  dark:text-white
  "
        >
          {trip.destination}
        </h2>

        <button
          onClick={() => onFavorite(trip.id)}
          className="
    p-1
    rounded-full
    hover:bg-yellow-100
    dark:hover:bg-gray-700
    transition
    "
        >
          <span className="text-xl">{trip.favorite ? "⭐" : "☆"}</span>
        </button>
      </div>

      <div className="mt-5 space-y-3 text-gray-600 dark:text-gray-300">
        <p className="flex items-center gap-3">
          <FaMapMarkerAlt />
          {trip.travelStyle || "Travel"}
        </p>

        <p className="flex items-center gap-3">
          <FaDollarSign />${trip.budget}
        </p>

        <p className="flex items-center gap-3">
          <FaCalendarAlt />
          {trip.dates?.start} - {trip.dates?.end}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <Link
          to={`/trip/${trip.id}`}
          className="
rounded-xl
bg-lime-500
py-3
text-center
font-semibold
text-black
"
        >
          View
        </Link>

        <Link
          to={`/edit-trip/${trip.id}`}
          className="
rounded-xl
bg-blue-500
py-3
text-center
font-semibold
text-white
"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(trip.id)}
          className="
rounded-xl
bg-red-500
text-white
"
        >
          🗑
        </button>
      </div>
    </div>
  );
}