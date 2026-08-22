import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Heart,
  Calendar,
  Users,
  Wallet,
  Backpack,
  MapPin,
  Sunrise,
  Sun,
  Moon,
  Check,
} from "lucide-react";

import { useTrips } from "../../context/TripContext.jsx";

import GlassCard from "../../components/common/GlassCard";

function TripDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { trips, loading, toggleFavorite } = useTrips();

  if (loading) {
    return <div className="text-gray-900 dark:text-white">Loading trip...</div>;
  }

  const trip = trips.find((item) => String(item.id) === String(id));

  if (!trip) {
    return (
      <GlassCard className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Trip not found
        </h2>

        <p className="mt-2 text-gray-600 dark:text-white/70">
          The trip you are looking for is not available.
        </p>

        <button
          onClick={() => navigate("/dashboard/trips")}
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-cyan-500
            px-5
            py-3
            text-white
            hover:bg-cyan-600
            transition
          "
        >
          <ArrowLeft size={18} />
          Back to Trips
        </button>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          px-4
          py-2.5
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
        <ArrowLeft size={19} />
        Back
      </button>

      {/* Trip Header */}
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-cyan-500/10
                px-3
                py-1.5
                text-sm
                font-medium
                text-cyan-600
                dark:text-cyan-400
                mb-4
              "
            >
              <MapPin size={16} />
              Trip Destination
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              {trip.title || trip.destination}
            </h1>

            <div
              className="
                flex
                items-center
                gap-2
                mt-4
                text-gray-600
                dark:text-white/70
              "
            >
              <MapPin size={18} className="text-cyan-500" />

              <span>{trip.destination}</span>
            </div>
          </div>

          <button
            onClick={() => toggleFavorite(trip.id)}
            className="
              self-start
              flex
              items-center
              justify-center
              w-12
              h-12
              rounded-xl
              bg-gray-100
              dark:bg-white/10
              hover:scale-105
              transition
            "
            aria-label="Toggle favorite"
          >
            <Heart
              size={24}
              className={
                trip.favorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 dark:text-white/60"
              }
            />
          </button>
        </div>

        {/* Trip Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <Info
            icon={<Calendar size={21} />}
            label="Travel Dates"
            text={`${trip.dates?.start || trip.start_date || "No date"} - ${
              trip.dates?.end || trip.end_date || "No date"
            }`}
          />

          <Info
            icon={<Users size={21} />}
            label="Travelers"
            text={`${trip.travelers || 1} Travelers`}
          />

          <Info
            icon={<Wallet size={21} />}
            label="Budget"
            text={`$${trip.budget || 0}`}
          />
        </div>
      </GlassCard>

      {/* Itinerary */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div
            className="
              flex
              items-center
              justify-center
              w-11
              h-11
              rounded-xl
              bg-cyan-500/10
              text-cyan-500
            "
          >
            <Calendar size={21} />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              AI Itinerary
            </h2>

            <p className="text-sm text-gray-500 dark:text-white/60">
              Your planned activities and schedule.
            </p>
          </div>
        </div>

        {Array.isArray(trip.itinerary) && trip.itinerary.length > 0 ? (
          <div className="space-y-5">
            {trip.itinerary.map((day, index) => (
              <GlassCard key={index} className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-10
                      h-10
                      rounded-xl
                      bg-gradient-to-br
                      from-cyan-500
                      to-blue-600
                      text-white
                      font-bold
                    "
                  >
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {day.title || `Day ${index + 1}`}
                  </h3>
                </div>

                <div className="space-y-4">
                  <Activity
                    icon={<Sunrise size={19} />}
                    label="Morning"
                    text={day.morning || "No activity"}
                  />

                  <Activity
                    icon={<Sun size={19} />}
                    label="Afternoon"
                    text={day.afternoon || "No activity"}
                  />

                  <Activity
                    icon={<Moon size={19} />}
                    label="Evening"
                    text={day.evening || "No activity"}
                  />
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard className="p-6">
            <p className="text-gray-600 dark:text-white/70">
              No itinerary available.
            </p>
          </GlassCard>
        )}
      </section>

      {/* Packing List */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div
            className="
              flex
              items-center
              justify-center
              w-11
              h-11
              rounded-xl
              bg-cyan-500/10
              text-cyan-500
            "
          >
            <Backpack size={21} />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Packing List
            </h2>

            <p className="text-sm text-gray-500 dark:text-white/60">
              Items prepared for your trip.
            </p>
          </div>
        </div>

        {Array.isArray(trip.packingList) && trip.packingList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trip.packingList.map((item, index) => (
              <GlassCard key={index} className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-8
                      h-8
                      rounded-full
                      bg-cyan-500/10
                      text-cyan-500
                    "
                  >
                    <Check size={17} />
                  </div>

                  <p className="text-gray-800 dark:text-white">{item}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard className="p-6">
            <p className="text-gray-600 dark:text-white/70">
              No packing list available.
            </p>
          </GlassCard>
        )}
      </section>
    </div>
  );
}

function Info({ icon, label, text }) {
  return (
    <div
      className="
        rounded-2xl
        bg-gray-100
        dark:bg-white/10
        border
        border-gray-200
        dark:border-white/5
        p-4
      "
    >
      <div className="flex items-center gap-2 text-cyan-500">
        {icon}

        <span className="text-sm font-medium">{label}</span>
      </div>

      <p className="mt-3 text-sm sm:text-base text-gray-800 dark:text-white">
        {text}
      </p>
    </div>
  );
}

function Activity({ icon, label, text }) {
  return (
    <div
      className="
        flex
        gap-4
        rounded-xl
        bg-gray-50
        dark:bg-white/5
        p-4
      "
    >
      <div className="text-cyan-500 mt-0.5">{icon}</div>

      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{label}</p>

        <p className="mt-1 text-gray-600 dark:text-white/70">{text}</p>
      </div>
    </div>
  );
}

export default TripDetails;
