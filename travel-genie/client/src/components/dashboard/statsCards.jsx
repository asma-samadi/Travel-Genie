import { Map, Wallet, Image, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTrips } from "../../context/TripContext.jsx";

function StatsCards() {
  const { trips, loading } = useTrips();

  const stats = useMemo(() => {
    const tripList = Array.isArray(trips) ? trips : [];

    // ======================================================
    // TOTAL TRIPS
    // ======================================================

    const totalTrips = tripList.length;

    // ======================================================
    // UNIQUE DESTINATIONS
    // ======================================================

    const destinations = new Set(
      tripList
        .map((trip) => trip.destination)
        .filter(Boolean)
        .map((destination) => destination.trim().toLowerCase()),
    );

    const totalDestinations = destinations.size;

    // ======================================================
    // TOTAL BUDGET
    // ======================================================

    const totalBudget = tripList.reduce((total, trip) => {
      const budget = Number(trip.budget) || 0;
      return total + budget;
    }, 0);

    // ======================================================
    // MEMORIES
    // ======================================================
    // If your API provides memories, count them.
    // Otherwise this safely returns 0.

    const totalMemories = tripList.reduce((total, trip) => {
      if (Array.isArray(trip.memories)) {
        return total + trip.memories.length;
      }

      if (Array.isArray(trip.memory)) {
        return total + trip.memory.length;
      }

      return total;
    }, 0);

    return [
      {
        title: "Total Trips",
        value: totalTrips,
        icon: Map,
      },
      {
        title: "Destinations",
        value: totalDestinations,
        icon: Globe,
      },
      {
        title: "Total Budget",
        value: `$${totalBudget.toLocaleString()}`,
        icon: Wallet,
      },
      {
        title: "Memories",
        value: totalMemories,
        icon: Image,
      },
    ];
  }, [trips]);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item, index) => {
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
              y: -4,
              scale: 1.01,
            }}
            className="
              rounded-[28px]
              p-5

              bg-white/10
              dark:bg-white/10

              backdrop-blur-xl

              border
              border-white/20

              shadow-xl

              transition-shadow
              hover:shadow-2xl
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">{item.title}</p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  {loading ? "..." : item.value}
                </h2>
              </div>

              <div
                className="
                  h-12
                  w-12
                  rounded-2xl

                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600

                  flex
                  items-center
                  justify-center

                  text-white

                  shadow-lg
                "
              >
                <Icon size={22} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default StatsCards;
