function TripCard({ trip, onDelete }) {
  return (
    <div
      className="
        bg-white
        dark:bg-[#111827]
        rounded-3xl
        p-6
        shadow-lg
        border
        border-gray-100
        dark:border-gray-800
      "
    >
      <div className="flex justify-between items-start">
        <h2
          className="
            text-2xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          {trip.destination}
        </h2>

        <button
          className="
            text-gray-500
            hover:text-cyan-500
            dark:text-gray-400
          "
        >
          Favorite
        </button>
      </div>

      <div className="mt-5 space-y-3">
        <p
          className="
            text-gray-600
            dark:text-gray-300
          "
        >
          Travel dates:
          <span className="font-medium">
            {" "}
            {trip.start_date} - {trip.end_date}
          </span>
        </p>

        <p
          className="
            text-gray-600
            dark:text-gray-300
          "
        >
          Budget:
          <span className="font-medium"> ${trip.budget}</span>
        </p>

        <p
          className="
            text-gray-600
            dark:text-gray-300
          "
        >
          Travelers:
          <span className="font-medium"> {trip.travelers}</span>
        </p>

        <p
          className="
            text-gray-600
            dark:text-gray-300
          "
        >
          Travel style:
          <span className="font-medium"> {trip.travel_style}</span>
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          className="
            flex-1
            rounded-xl
            bg-cyan-500
            py-2
            text-white
            font-semibold
            hover:bg-cyan-600
          "
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(trip.id)}
          className="
            flex-1
            rounded-xl
            bg-red-500
            py-2
            text-white
            font-semibold
            hover:bg-red-600
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TripCard;
