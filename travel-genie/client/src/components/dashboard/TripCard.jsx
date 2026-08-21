function TripCard({ trip }) {
  return (
    <div
      className="
            bg-white
            dark:bg-[#0B172A]
            rounded-2xl
            overflow-hidden
            shadow-sm
            border
            dark:border-gray-800
            "
    >
      <div
        className="
                h-40
                bg-gray-200
                dark:bg-gray-700
                "
      >
        {trip.trip_image && (
          <img
            src={trip.trip_image}
            className="
                        w-full
                        h-full
                        object-cover
                        "
          />
        )}
      </div>

      <div className="p-5">
        <h3
          className="
                    text-xl
                    font-bold
                    dark:text-white
                    "
        >
          {trip.destination}
        </h3>

        <p
          className="
                    mt-2
                    text-gray-500
                "
        >
          {trip.start_date} - {trip.end_date}
        </p>

        <div
          className="
                    mt-4
                    flex
                    justify-between
                    text-sm
                "
        >
          <span>Budget: ${trip.budget}</span>

          <span>{trip.travel_style}</span>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
