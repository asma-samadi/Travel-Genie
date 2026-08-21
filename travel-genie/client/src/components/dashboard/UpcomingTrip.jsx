import { motion } from "framer-motion";
import { MapPin, CalendarDays, Users, Wallet, ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

function UpcomingTrip() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
      relative

      overflow-hidden

      rounded-[32px]

      min-h-[380px]

      shadow-2xl
      "
    >
      {/* Background Image */}

      <img
        src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000"
        alt="Paris"
        className="
        absolute
        inset-0

        w-full
        h-full

        object-cover
        "
      />

      {/* Overlay */}

      <div
        className="
        absolute
        inset-0

        bg-gradient-to-r

        from-black/80

        via-black/50

        to-transparent
        "
      />

      {/* Content */}

      <div
        className="
        relative
        z-10

        p-8

        h-full

        flex

        flex-col

        justify-between

        "
      >
        {/* Top */}

        <div>
          <div
            className="
            inline-flex

            items-center

            gap-2

            px-4

            py-2

            rounded-full

            bg-white/20

            backdrop-blur-xl

            text-white

            text-sm

            "
          >
            <MapPin size={16} />
            Paris, France
          </div>

          <h1
            className="
            mt-6

            text-4xl

            font-bold

            text-white

            "
          >
            Explore Paris
          </h1>

          <p
            className="
            mt-3

            max-w-xl

            text-white/70

            "
          >
            Discover beautiful places, local food, and unforgettable experiences
            with your AI travel planner.
          </p>
        </div>

        {/* Bottom Info */}

        <div>
          <div
            className="
            grid

            grid-cols-2

            md:grid-cols-4

            gap-4

            mb-6

            "
          >
            <Info
              icon={<CalendarDays size={18} />}
              title="Date"
              value="10 Aug - 18 Aug"
            />

            <Info
              icon={<Users size={18} />}
              title="Travelers"
              value="2 People"
            />

            <Info icon={<Wallet size={18} />} title="Budget" value="$2500" />
          </div>

          <Link
            to="/dashboard/trips"
            className="
            inline-flex

            items-center

            gap-2

            px-6

            py-3

            rounded-2xl


            bg-white

            text-gray-900

            font-medium


            hover:scale-105

            transition

            "
          >
            View Trip
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function Info({ icon, title, value }) {
  return (
    <div
      className="
flex

items-center

gap-3

px-4

py-3

rounded-2xl

bg-white/10

backdrop-blur-xl

"
    >
      <div className="text-cyan-400">{icon}</div>

      <div>
        <p
          className="
text-xs
text-white/60
"
        >
          {title}
        </p>

        <p
          className="
text-sm
font-semibold
text-white
"
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default UpcomingTrip;
