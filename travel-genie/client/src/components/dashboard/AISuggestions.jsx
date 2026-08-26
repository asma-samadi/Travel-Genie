import {
  Sparkles,
  MapPin,
  Utensils,
  Camera,
  Compass,
  Plane,
} from "lucide-react";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTrips } from "../../context/TripContext.jsx";

function AISuggestions() {
  const { trips, loading } = useTrips();

  // ======================================================
  // FIND LATEST / UPCOMING TRIP
  // ======================================================

  const currentTrip = useMemo(() => {
    if (!Array.isArray(trips) || trips.length === 0) {
      return null;
    }

    const today = new Date();

    const getTripDate = (trip) => {
      return (
        trip.startDate ||
        trip.start_date ||
        trip.date ||
        trip.start ||
        trip.created_at ||
        null
      );
    };

    const upcomingTrips = trips
      .filter((trip) => {
        const date = getTripDate(trip);

        if (!date) return false;

        const tripDate = new Date(date);

        return !Number.isNaN(tripDate.getTime()) && tripDate >= today;
      })
      .sort((a, b) => {
        return new Date(getTripDate(a)) - new Date(getTripDate(b));
      });

    if (upcomingTrips.length > 0) {
      return upcomingTrips[0];
    }

    // If there are no upcoming trips,
    // use the most recently created trip.
    return [...trips].sort((a, b) => {
      const dateA = new Date(a.created_at || 0);
      const dateB = new Date(b.created_at || 0);

      return dateB - dateA;
    })[0];
  }, [trips]);

  // ======================================================
  // CREATE PERSONALIZED SUGGESTIONS
  // ======================================================

  const suggestions = useMemo(() => {
    if (!currentTrip) {
      return [
        {
          title: "Plan Your Next Adventure",
          description:
            "Create a trip and TravelGenie will generate personalized recommendations for you.",
          icon: Plane,
        },
        {
          title: "Discover Local Experiences",
          description:
            "Explore food, attractions, activities, and hidden places at your destination.",
          icon: MapPin,
        },
        {
          title: "Build Your Itinerary",
          description:
            "Let TravelGenie organize your activities into a personalized travel plan.",
          icon: Compass,
        },
      ];
    }

    const destination = currentTrip.destination || "your destination";

    const travelStyle =
      currentTrip.travelStyle || currentTrip.travel_style || "Explorer";

    return [
      {
        title: `Explore ${destination}`,
        description: `Discover attractions, landmarks, and memorable places that match your ${travelStyle.toLowerCase()} travel style.`,
        icon: Camera,
      },
      {
        title: "Taste the Local Cuisine",
        description: `Find traditional food, popular restaurants, and authentic local experiences in ${destination}.`,
        icon: Utensils,
      },
      {
        title: "Discover Hidden Places",
        description: `Explore unique activities and lesser-known places around ${destination} with TravelGenie.`,
        icon: MapPin,
      },
    ];
  }, [currentTrip]);

  return (
    <section className="mt-8">
      {/* ==================================================
          TITLE
      ================================================== */}

      <div className="mb-5 flex items-center gap-3">
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
          <Sparkles size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Suggestions
          </h2>

          <p className="text-sm text-gray-500 dark:text-white/60">
            Personalized recommendations based on your travel plans
          </p>
        </div>
      </div>

      {/* ==================================================
          LOADING
      ================================================== */}

      {loading ? (
        <div
          className="
            rounded-[28px]
            border
            border-white/20
            bg-white/10
            p-8
            text-center
            backdrop-blur-xl
          "
        >
          <Sparkles size={28} className="mx-auto animate-pulse text-cyan-500" />

          <p className="mt-3 text-sm text-gray-500 dark:text-white/60">
            Preparing your personalized suggestions...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {suggestions.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  rounded-[28px]
                  border
                  border-gray-200
                  bg-white/70
                  p-6
                  shadow-xl
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  dark:border-white/10
                  dark:bg-white/10
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-cyan-500/10
                    text-cyan-500
                    dark:bg-cyan-500/20
                  "
                >
                  <Icon size={24} />
                </div>

                <h3
                  className="
                    mt-5
                    text-lg
                    font-semibold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-gray-500
                    dark:text-white/60
                  "
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ==================================================
          CURRENT TRIP CONTEXT
      ================================================== */}

      {currentTrip && !loading && (
        <div
          className="
            mt-5
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-cyan-500/20
            bg-cyan-500/5
            px-5
            py-4
            dark:bg-cyan-500/10
          "
        >
          <Sparkles size={18} className="shrink-0 text-cyan-500" />

          <p className="text-sm text-gray-600 dark:text-white/70">
            Suggestions are based on your trip to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentTrip.destination || "your destination"}
            </span>
            .
          </p>
        </div>
      )}
    </section>
  );
}

export default AISuggestions;
