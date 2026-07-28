import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  CloudSun,
  Wallet,
  MapPinned,
} from "lucide-react";

import travel3D from "../../assets/illustrations/travel-3d.png";

function Hero() {
  return (
    <section
      className="
      relative
      overflow-hidden
      
      min-h-[calc(100vh-80px)]

      bg-[#F5FBFB]
      dark:bg-[#07111F]

      px-5
      sm:px-10
      lg:px-20

      py-10
      "
    >
      {/* Animated Background */}

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -top-20
        -left-20

        h-80
        w-80

        rounded-full

        bg-cyan-300/30

        blur-3xl
        "
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="
        absolute
        bottom-0
        right-0

        h-96
        w-96

        rounded-full

        bg-purple-300/20

        blur-3xl
        "
      />

      <div
        className="
        relative
        max-w-7xl
        mx-auto

        grid
        grid-cols-1
        lg:grid-cols-2

        gap-10
        lg:gap-16

        items-center
        "
      >
        {/* LEFT SIDE */}

        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div
            className="
            inline-flex
            items-center
            gap-2

            rounded-full

            bg-white

            px-5
            py-2

            shadow-lg

            text-sm

            font-semibold

            text-cyan-600
            "
          >
            <Sparkles size={16} />
            AI Powered Travel Assistant
          </div>

          <h1
            className="
            mt-7

            text-4xl
            sm:text-5xl
            lg:text-6xl

            font-bold

            leading-tight

            text-[#102B2B]

            dark:text-white
            "
          >
            Explore the world.
            <span
              className="
              block
              text-cyan-500
              "
            >
              Plan your journey
            </span>
            with AI.
          </h1>

          <p
            className="
            mt-5

            max-w-xl

            text-lg

            text-gray-600

            dark:text-gray-300
            "
          >
            TravelGenie creates personalized trips, discovers destinations and
            builds smart itineraries in seconds.
          </p>

          {/* Planner Card */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="
          mt-8

          rounded-[30px]

          bg-white

          dark:bg-gray-900

          p-5

          shadow-2xl
          "
          >
            <div
              className="
          grid

          grid-cols-1

          sm:grid-cols-3

          gap-4
          "
            >
              <div
                className="
            bg-gray-50
            dark:bg-gray-800

            rounded-2xl

            p-4
            "
              >
                <MapPin size={18} />

                <p className="text-sm text-gray-500">Destination</p>

                <p className="font-semibold">Paris</p>
              </div>

              <div
                className="
            bg-gray-50
            dark:bg-gray-800

            rounded-2xl

            p-4
            "
              >
                <Calendar size={18} />

                <p className="text-sm text-gray-500">Date</p>

                <p className="font-semibold">June 20</p>
              </div>

              <div
                className="
            bg-gray-50
            dark:bg-gray-800

            rounded-2xl

            p-4
            "
              >
                <Users size={18} />

                <p className="text-sm text-gray-500">Travelers</p>

                <p className="font-semibold">2 People</p>
              </div>
            </div>

            <button
              className="
          mt-5

          w-full

          rounded-full

          bg-cyan-500

          py-3

          text-white

          font-semibold

          flex

          justify-center

          items-center

          gap-2

          hover:scale-105

          transition
          "
            >
              Start Planning
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE 3D */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="
        relative

        flex

        justify-center

        "
        >
          {/* Glow */}

          <div
            className="
        absolute

        h-[300px]

        w-[300px]

        sm:h-[450px]

        sm:w-[450px]

        rounded-full

        bg-gradient-to-br

        from-cyan-300

        to-purple-300

        blur-3xl

        opacity-40
        "
          />

          {/* 3D Illustration */}

          <motion.img
            src={travel3D}
            alt="3D Travel Illustration"
            animate={{
              y: [0, -20, 0],

              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 6,

              repeat: Infinity,

              ease: "easeInOut",
            }}
            className="
        relative

        z-10

        w-[280px]

        sm:w-[400px]

        lg:w-[500px]

        drop-shadow-2xl
        "
          />

          {/* Weather Card */}

          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
        absolute

        top-10

        left-0

        z-20

        rounded-3xl

        bg-white/90

        backdrop-blur-xl

        p-4

        shadow-xl
        "
          >
            <CloudSun />

            <p className="font-bold">25°C</p>

            <p className="text-xs text-gray-500">Perfect weather</p>
          </motion.div>

          {/* Budget Card */}

          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="
        absolute

        bottom-10

        right-0

        z-20

        rounded-3xl

        bg-white

        p-4

        shadow-xl
        "
          >
            <Wallet />

            <p className="font-bold">$1200</p>

            <p className="text-xs text-gray-500">Trip Budget</p>
          </motion.div>

          {/* Destination Card */}

          <motion.div
            animate={{
              x: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="
        absolute

        top-1/2

        right-0

        z-20

        rounded-3xl

        bg-white

        p-4

        shadow-xl
        "
          >
            <MapPinned size={20} />

            <p className="font-bold">Tokyo</p>

            <p className="text-xs text-gray-500">Next adventure</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
