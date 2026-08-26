import { Link } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Wallet,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { useTrips } from "../../context/TripContext.jsx";

function RecentTrips() {
  const { trips, loading } = useTrips();

  // Show the most recently created trips first.
  // If your API returns newest first, this still works correctly.
  const recentTrips = Array.isArray(trips)
    ? [...trips]
        .sort((a, b) => {
          const dateA = new Date(a.created_at || a.createdAt || 0);
          const dateB = new Date(b.created_at || b.createdAt || 0);

          return dateB - dateA;
        })
        .slice(0, 3)
    : [];

  // ------------------------------------------------------
  // FORMAT DATE
  // ------------------------------------------------------

  const formatDate = (date) => {
    if (!date) return "Date not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ------------------------------------------------------
  // GET TRIP DATE
  // ------------------------------------------------------

  const getTripDate = (trip) => {
    const start =
      trip.startDate || trip.start_date || trip.date_from || trip.from_date;

    const end = trip.endDate || trip.end_date || trip.date_to || trip.to_date;

    if (start && end) {
      return `${formatDate(start)} — ${formatDate(end)}`;
    }

    if (start) {
      return formatDate(start);
    }

    return "Dates not available";
  };

  // ------------------------------------------------------
  // DESTINATION IMAGE
  // ------------------------------------------------------

  const getDestinationImage = (destination) => {
    if (!destination) {
      return "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200";
    }

    const encodedDestination = encodeURIComponent(destination);

    return `https://source.unsplash.com/1200x800/?${encodedDestination},travel`;
  };

  // ------------------------------------------------------
  // LOADING
  // ------------------------------------------------------

  if (loading) {
    return (
      <section className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#00B1E2] dark:text-white">
              Recent Trips
            </h2>

            <p className="mt-1 text-sm text-gray-600 dark:text-white/60">
              Your latest travel adventures
            </p>
          </div>
        </div>

        <div className="flex min-h-[220px] items-center justify-center rounded-[28px] border border-gray-200 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3 text-gray-600 dark:text-white/70">
            <Loader2 size={22} className="animate-spin text-[#00B1E2]" />
            Loading your trips...
          </div>
        </div>
      </section>
    );
  }

  // ------------------------------------------------------
  // EMPTY STATE
  // ------------------------------------------------------

  if (recentTrips.length === 0) {
    return (
      <section className="mt-8">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-[#00B1E2] dark:text-white">
            Recent Trips
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-white/60">
            Your latest travel adventures
          </p>
        </div>

        <div className="rounded-[28px] border border-gray-200 bg-white/70 p-10 text-center shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500">
            <MapPin size={26} />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            No trips yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-white/60">
            Start planning your next adventure and your trips will appear here.
          </p>

          <Link
            to="/dashboard/create-trip"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
          >
            Create Your First Trip
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    );
  }

  // ------------------------------------------------------
  // RECENT TRIPS
  // ------------------------------------------------------

  return (
    <section className="mt-8">
      {/* SECTION HEADER */}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#00B1E2] dark:text-white">
            Recent Trips
          </h2>

          <p className="mt-1 text-sm text-gray-600 dark:text-white/60">
            Your latest travel adventures
          </p>
        </div>

        <Link
          to="/dashboard/trips"
          className="group flex items-center gap-1 text-sm font-semibold text-[#00B1E2] transition hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300"
        >
          View all
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* TRIP CARDS */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {recentTrips.map((trip) => {
          const destination =
            trip.destination ||
            trip.city ||
            trip.location ||
            "Unknown destination";

          const budget =
            trip.budget !== undefined && trip.budget !== null
              ? `$${Number(trip.budget).toLocaleString()}`
              : "Budget not available";

          const image =
            trip.image ||
            trip.cover_image ||
            trip.destination_image ||
            getDestinationImage(destination);

          return (
            <div
              key={trip.id}
              className="
                group
                overflow-hidden
                rounded-[28px]
                border
                border-gray-200
                bg-white/70
                shadow-xl
                backdrop-blur-3xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                dark:border-white/10
                dark:bg-[#071625]/70
              "
            >
              {/* IMAGE */}

              <div className="relative h-48 overflow-hidden">
                <img
                  src={image}
                  alt={destination}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                  onError={(event) => {
                    event.currentTarget.src =
                      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200";
                  }}
                />

                {/* IMAGE OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* DESTINATION */}

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin size={17} />

                    <h3 className="line-clamp-1 text-xl font-bold">
                      {destination}
                    </h3>
                  </div>
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-5">
                {/* DATE */}

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <CalendarDays size={16} className="shrink-0 text-[#00B1E2]" />

                  <span>{getTripDate(trip)}</span>
                </div>

                {/* BUDGET */}

                <div className="mt-3 flex items-center gap-2">
                  <Wallet size={16} className="text-[#00B1E2]" />

                  <span className="font-semibold text-[#00B1E2]">{budget}</span>

                  <span className="text-xs text-gray-400">budget</span>
                </div>

                {/* TRAVEL STYLE */}

                {trip.travelStyle || trip.travel_style ? (
                  <div className="mt-3">
                    <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-400">
                      {trip.travelStyle || trip.travel_style}
                    </span>
                  </div>
                ) : null}

                {/* VIEW BUTTON */}

                <Link
                  to={`/dashboard/trips/${trip.id}`}
                  className="
                    mt-5
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-md
                    transition
                    hover:scale-[1.02]
                    hover:shadow-lg
                  "
                >
                  View Trip
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecentTrips;
