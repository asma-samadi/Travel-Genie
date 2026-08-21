import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        relative
        overflow-hidden

        w-full
        h-[300px]

        rounded-[32px]

        p-8

        shadow-2xl

        bg-cover
        bg-center
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000')",
      }}
    >
      {/* Overlay */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-r

          from-black/70
          via-black/40
          to-transparent
        "
      />

      {/* Content */}

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <p className="text-white/80 text-sm uppercase tracking-[4px]">
            Upcoming Trip
          </p>

          <h1 className="mt-4 text-4xl font-bold text-white">Explore Paris</h1>

          <p className="mt-4 max-w-lg text-gray-200">
            Plan your next adventure and organize your travel memories,
            activities, budget, and itinerary in one place.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-8">
            <div>
              <p className="text-sm text-gray-300">Dates</p>

              <p className="text-white font-semibold">10 Aug — 18 Aug</p>
            </div>

            <div>
              <p className="text-sm text-gray-300">Budget</p>

              <p className="text-white font-semibold">$2500</p>
            </div>
          </div>

          <Link
            to="/dashboard/trips"
            className="
              rounded-2xl

              bg-white

              px-6
              py-3

              font-medium

              text-gray-900

              transition

              hover:scale-105
            "
          >
            View Trip
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroCard;
