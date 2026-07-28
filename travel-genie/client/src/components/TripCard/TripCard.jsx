import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

export default function TripCard({ trip }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-[#1E293B]">
      <h3 className="mb-4 text-2xl font-bold dark:text-white">
        {trip.destination}
      </h3>

      <div className="space-y-3 text-gray-600 dark:text-gray-300">
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt />
          {trip.travelStyle}
        </p>

        <p className="flex items-center gap-2">
          <FaDollarSign />${trip.budget}
        </p>

        <p className="flex items-center gap-2">
          <FaCalendarAlt />
          {trip.dates.start} - {trip.dates.end}
        </p>
      </div>

      <Link
        to={`/trip/${trip.id}`}
        className="mt-6 inline-block rounded-xl bg-lime-500 px-5 py-2 font-semibold text-black transition hover:bg-lime-400"
      >
        View Trip
      </Link>
    </div>
  );
}
