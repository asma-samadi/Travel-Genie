import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

export default function DestinationCard({ destination }) {
  return (
    <div
      className="
      overflow-hidden 
      rounded-3xl 
      bg-white 
      shadow-lg 
      transition 
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      dark:bg-[#1E293B]
    "
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">
        <h3 className="text-2xl font-bold dark:text-white">
          {destination.name}
        </h3>

        <p className="mt-2 flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FaMapMarkerAlt />

          {destination.country}
        </p>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          {destination.description}
        </p>

        <p className="mt-4 font-semibold text-lime-600">
          {destination.duration}
        </p>

        <button
          className="
          mt-5 
          flex 
          items-center 
          gap-2 
          font-semibold
          text-lime-600
          hover:gap-4
          transition
        "
        >
          Explore
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
