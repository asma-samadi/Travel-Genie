import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Heart,
  Calendar,
  Users,
  Wallet,
  Backpack,
  MapPin,
} from "lucide-react";

import { useTrips } from "../../context/TripContext.jsx";

import GlassCard from "../../components/common/GlassCard";

function TripDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { trips, loading, toggleFavorite } = useTrips();

  if (loading) {
    return <div className="text-white">Loading trip...</div>;
  }

  const trip = trips.find((item) => String(item.id) === String(id));

  if (!trip) {
    return (
      <GlassCard className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Trip not found
        </h2>

        <button
          onClick={() => navigate("/dashboard/trips")}
          className="mt-5 rounded-xl bg-cyan-500 px-5 py-3 text-white"
        >
          Back to Trips
        </button>
      </GlassCard>
    );
  }

  return (
    <div
      className="
      space-y-8
      "
    >
      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="
        flex
        items-center
        gap-2

        rounded-xl

        px-4
        py-2

        bg-white

        dark:bg-white/10

        border

        border-gray-200

        dark:border-white/10

        text-gray-700

        dark:text-white

        hover:bg-gray-100

        hover:text-cyan-500

        dark:hover:bg-white/20

        transition
        "
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Header */}

      <GlassCard
        className="
        p-5
        sm:p-8
        "
      >
        <div
          className="
          flex

          flex-col

          sm:flex-row

          justify-between

          gap-5
          "
        >
          <div>
            <h1
              className="
              text-3xl
              sm:text-5xl

              font-bold

              text-gray-900

              dark:text-white
              "
            >
              {trip.title || trip.destination}
            </h1>

            <div
              className="
              flex

              items-center

              gap-2

              mt-3

              text-gray-600

              dark:text-white/70
              "
            >
              <MapPin size={18} />

              {trip.destination}
            </div>
          </div>

          <button
            onClick={() => toggleFavorite(trip.id)}
            className="
            self-start

            hover:scale-110

            transition
            "
          >
            <Heart
              size={32}
              className={
                trip.favorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 dark:text-white/60"
              }
            />
          </button>
        </div>

        <div
          className="
          grid

          grid-cols-1

          sm:grid-cols-3

          gap-4

          mt-8
          "
        >
          <Info
            icon={<Calendar size={20} />}
            text={`${trip.dates?.start || "No date"} - ${
              trip.dates?.end || "No date"
            }`}
          />

          <Info
            icon={<Users size={20} />}
            text={`${trip.travelers || 1} Travelers`}
          />

          <Info icon={<Wallet size={20} />} text={`$${trip.budget || 0}`} />
        </div>
      </GlassCard>

      {/* Itinerary */}

      <section>
        <h2
          className="
          text-2xl
          sm:text-3xl

          font-bold

          bg-gradient-to-r
          from-cyan-500
          via-blue-500
          to-purple-500

          bg-clip-text
          text-transparent

          mb-5
          "
        >
          AI Itinerary ✈️
        </h2>

        {Array.isArray(trip.itinerary) && trip.itinerary.length > 0 ? (
          <div className="space-y-5">
            {trip.itinerary.map((day, index) => (
              <GlassCard
                key={index}
                className="
                p-5
                sm:p-6
                "
              >
                <h3
                  className="
                  text-xl

                  font-bold

                  text-gray-900

                  dark:text-white
                  "
                >
                  {day.title || `Day ${index + 1}`}
                </h3>

                <p
                  className="
                  mt-4
                  text-gray-700
                  dark:text-white/80
                  "
                >
                  🌅 {day.morning || "No activity"}
                </p>

                <p
                  className="
                  mt-2
                  text-gray-700
                  dark:text-white/80
                  "
                >
                  ☀️ {day.afternoon || "No activity"}
                </p>

                <p
                  className="
                  mt-2
                  text-gray-700
                  dark:text-white/80
                  "
                >
                  🌙 {day.evening || "No activity"}
                </p>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard className="p-6">
            <p
              className="
              text-gray-600

              dark:text-white/70
              "
            >
              No itinerary available.
            </p>
          </GlassCard>
        )}
      </section>

      {/* Packing List */}

      <section>
        <h2
          className="
          flex
          items-center
          gap-2

          text-2xl
          sm:text-3xl

          font-bold

          bg-gradient-to-r
          from-cyan-500
          via-blue-500
          to-purple-500

          bg-clip-text
          text-transparent
          "
        >
          <Backpack />
          Packing List
        </h2>

        {Array.isArray(trip.packingList) && trip.packingList.length > 0 ? (
          <div
            className="
            grid

            grid-cols-1

            sm:grid-cols-2

            gap-4

            mt-5
            "
          >
            {trip.packingList.map((item, index) => (
              <GlassCard key={index} className="p-4">
                <p
                  className="
                  text-gray-800

                  dark:text-white
                  "
                >
                  ✓ {item}
                </p>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard className="p-6 mt-5">
            <p className="text-gray-600 dark:text-white/70">
              No packing list available.
            </p>
          </GlassCard>
        )}
      </section>
    </div>
  );
}

function Info({ icon, text }) {
  return (
    <div
      className="
      flex

      items-center

      gap-3

      rounded-xl

      bg-gray-100

      dark:bg-white/10

      p-4

      text-gray-800

      dark:text-white
      "
    >
      {icon}

      <span className="text-sm sm:text-base">{text}</span>
    </div>
  );
}

export default TripDetails;
