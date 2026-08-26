import { Brain, MapPin, Heart, Users, Wallet, Sparkles } from "lucide-react";
import { useMemo } from "react";

import GlassCard from "../../components/Common/GlassCard";
import { useTrips } from "../../context/TripContext.jsx";

function Memory() {
  const { trips, loading } = useTrips();

  // ======================================================
  // BUILD TRAVEL MEMORY FROM SAVED TRIPS
  // ======================================================

  const travelMemory = useMemo(() => {
    if (!Array.isArray(trips) || trips.length === 0) {
      return {
        destinations: [],
        favoriteTrips: [],
        interests: [],
        totalTrips: 0,
        averageTravelers: 0,
        totalBudget: 0,
      };
    }

    // Unique destinations
    const destinations = [
      ...new Set(trips.map((trip) => trip.destination).filter(Boolean)),
    ];

    // Favorite trips
    const favoriteTrips = trips.filter((trip) => trip.favorite);

    // Interests selected for AI recommendations
    const interests = [
      ...new Set(
        trips.flatMap((trip) =>
          Array.isArray(trip.recommendationInterests)
            ? trip.recommendationInterests
            : [],
        ),
      ),
    ];

    // Average number of travelers
    const totalTravelers = trips.reduce(
      (total, trip) => total + Number(trip.travelers || 1),
      0,
    );

    // Total budget from all trips
    const totalBudget = trips.reduce(
      (total, trip) => total + Number(trip.budget || 0),
      0,
    );

    return {
      destinations,
      favoriteTrips,
      interests,
      totalTrips: trips.length,
      averageTravelers:
        totalTravelers > 0 ? (totalTravelers / trips.length).toFixed(1) : 0,
      totalBudget,
    };
  }, [trips]);

  if (loading) {
    return (
      <div className="text-gray-900 dark:text-white">
        Loading your travel memory...
      </div>
    );
  }

  const hasMemories = travelMemory.totalTrips > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              shadow-lg
            "
          >
            <Brain size={24} />
          </div>

          <div>
            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              Memory
            </h1>

            <p className="mt-1 text-gray-600 dark:text-white/70">
              Your saved travel preferences and experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Main Memory Card */}
      <GlassCard className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Travel Memory
        </h2>

        <p className="mt-3 text-gray-600 dark:text-white/70">
          TravelGenie uses your travel history and preferences to provide more
          personalized recommendations.
        </p>

        {!hasMemories ? (
          <div className="mt-6 rounded-2xl bg-gray-100 dark:bg-white/10 p-5">
            <p className="text-sm text-gray-500 dark:text-white/60">
              No memories saved yet. Create a trip and TravelGenie will start
              learning about your travel preferences.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Total Trips */}
            <MemoryStat
              icon={<MapPin size={20} />}
              label="Trips Created"
              value={travelMemory.totalTrips}
            />

            {/* Average Travelers */}
            <MemoryStat
              icon={<Users size={20} />}
              label="Average Travelers"
              value={travelMemory.averageTravelers}
            />

            {/* Total Budget */}
            <MemoryStat
              icon={<Wallet size={20} />}
              label="Travel Budget"
              value={`$${travelMemory.totalBudget}`}
            />
          </div>
        )}
      </GlassCard>

      {/* Destinations */}
      {hasMemories && (
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
              <MapPin size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Places You Remember
              </h2>

              <p className="text-sm text-gray-500 dark:text-white/60">
                Destinations from your saved trips.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {travelMemory.destinations.map((destination) => (
              <span
                key={destination}
                className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400"
              >
                {destination}
              </span>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Travel Interests */}
      {hasMemories && travelMemory.interests.length > 0 && (
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
              <Sparkles size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Your Travel Interests
              </h2>

              <p className="text-sm text-gray-500 dark:text-white/60">
                Interests you've selected for your trips.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {travelMemory.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400"
              >
                {interest}
              </span>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Favorite Trips */}
      {hasMemories && travelMemory.favoriteTrips.length > 0 && (
        <GlassCard className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <Heart size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Favorite Trips
              </h2>

              <p className="text-sm text-gray-500 dark:text-white/60">
                Trips you've marked as favorites.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {travelMemory.favoriteTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center justify-between rounded-xl bg-gray-100 dark:bg-white/5 p-4"
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {trip.title || trip.destination}
                  </p>

                  <p className="mt-1 text-sm text-gray-500 dark:text-white/60">
                    {trip.destination}
                  </p>
                </div>

                <Heart size={19} className="fill-red-500 text-red-500" />
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}

// ======================================================
// MEMORY STAT CARD
// ======================================================

function MemoryStat({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5">
      <div className="flex items-center gap-2 text-cyan-500">
        {icon}

        <span className="text-sm font-medium text-gray-600 dark:text-white/60">
          {label}
        </span>
      </div>

      <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

export default Memory;
