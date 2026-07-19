import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaTrash,
} from "react-icons/fa";

export default function SavedTripCard({ trip, onDelete }) {
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
      <h3 className="text-2xl font-bold dark:text-white">{trip.destination}</h3>

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

      <div className="mt-6 flex gap-3">
        <Link
          to={`/trip/${trip.id}`}
          className="
          flex-1
          rounded-xl
          bg-lime-500
          py-3
          text-center
          font-semibold
          text-black
          hover:bg-lime-400
          "
        >
          View
        </Link>

        <button
          onClick={() => onDelete(trip.id)}
          className="
          rounded-xl
          bg-red-500
          px-4
          text-white
          transition
          hover:bg-red-600
          "
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}