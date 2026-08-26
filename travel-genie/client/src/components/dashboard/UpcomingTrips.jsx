import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../../context/TripContext.jsx";

function UpcomingTrips() {
  const { trips, loading } = useTrips();
  const navigate = useNavigate();

  // ======================================================
  // GET TRIP START DATE
  // ======================================================
  const getTripStartDate = (trip) => {
    return (
      trip?.dates?.start ||
      trip?.startDate ||
      trip?.start_date ||
      trip?.date ||
      trip?.start ||
      null
    );
  };

  // ======================================================
  // GET ONLY THE NEXT 2 UPCOMING TRIPS
  // ======================================================
  const upcomingTrips = useMemo(() => {
    if (!Array.isArray(trips)) return [];

    const now = new Date();

    return trips
      .map((trip) => {
        const startDateValue = getTripStartDate(trip);

        if (!startDateValue) return null;

        const startDate = new Date(startDateValue);

        if (Number.isNaN(startDate.getTime())) return null;

        return {
          ...trip,
          parsedStartDate: startDate,
        };
      })
      .filter(Boolean)
      .filter((trip) => trip.parsedStartDate >= now)
      .sort((a, b) => a.parsedStartDate.getTime() - b.parsedStartDate.getTime())
      .slice(0, 2);
  }, [trips]);

  // ======================================================
  // FORMAT DATE
  // ======================================================
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ======================================================
  // LOADING
  // ======================================================
  if (loading) {
    return (
      <section
        className="
          relative
          min-h-0
          overflow-hidden
          rounded-[28px]
          border
          border-gray-300/70
          bg-[#BCC4C8]
          p-5
          shadow-[0_8px_30px_rgba(0,0,0,0.04)]
          dark:border-white/10
          dark:bg-white/5
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-blue-500
              to-purple-500
              text-white
              shadow-sm
            "
          >
            <CalendarDays size={19} />
          </div>

          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Upcoming Tours
          </h2>
        </div>

        <p className="mt-5 text-xs text-gray-600 dark:text-white/50">
          Loading...
        </p>
      </section>
    );
  }

  return (
    <section
      className="
        relative
        min-h-0
        overflow-hidden
        rounded-[28px]
        border
        border-gray-300/70
        bg-[#BCC4C8]
        p-5
        shadow-[0_8px_30px_rgba(0,0,0,0.04)]
        backdrop-blur-xl
        dark:border-white/10
        dark:bg-white/5
      "
    >
      {/* Decorative gradient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-gradient-to-r
          from-cyan-500/10
          via-blue-500/10
          to-purple-500/10
          blur-2xl
        "
      />

      {/* ==================================================
          HEADER
      ================================================== */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-blue-500
              to-purple-500
              text-white
              shadow-sm
            "
          >
            <CalendarDays size={19} />
          </div>

          <h2 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
            Upcoming Tours
          </h2>
        </div>

        {/* See All */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/trips")}
          className="
            inline-flex
            items-center
            gap-1
            text-xs
            font-medium
            text-gray-700
            transition
            hover:text-gray-900
            dark:text-white/70
            dark:hover:text-white
          "
        >
          See all
          <ArrowRight size={14} />
        </button>
      </div>

      {/* ==================================================
          TRIPS
      ================================================== */}
      <div className="relative mt-5">
        {upcomingTrips.length === 0 ? (
          <div className="flex items-center justify-center py-6">
            <p className="text-xs text-gray-600 dark:text-white/40">
              No upcoming tours
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {upcomingTrips.map((trip) => (
              <button
                key={trip.id}
                type="button"
                onClick={() => navigate(`/dashboard/trips/${trip.id}`)}
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-gray-300/70
                  bg-white/40
                  p-3
                  text-left
                  transition
                  hover:-translate-y-0.5
                  hover:bg-white/60
                  hover:shadow-md
                  dark:border-white/10
                  dark:bg-white/5
                  dark:hover:bg-white/10
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-500
                    via-blue-500
                    to-purple-500
                    text-white
                  "
                >
                  <MapPin size={17} />
                </div>

                {/* Trip information */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {trip.title || trip.destination || "Travel Adventure"}
                  </p>

                  <div className="mt-0.5 flex items-center gap-1.5">
                    <CalendarDays
                      size={12}
                      className="shrink-0 text-gray-600 dark:text-white/40"
                    />

                    <p className="truncate text-[11px] text-gray-600 dark:text-white/50">
                      {formatDate(trip.parsedStartDate)}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight
                  size={15}
                  className="
                    shrink-0
                    text-gray-500
                    transition
                    group-hover:translate-x-0.5
                    dark:text-white/40
                  "
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default UpcomingTrips;
