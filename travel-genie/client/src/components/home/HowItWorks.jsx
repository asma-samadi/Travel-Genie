import { motion } from "framer-motion";
import { MapPin, Sparkles, Plane } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Choose your destination",
    description:
      "Tell TravelGenie where you want to go, your travel dates, budget, and preferred travel style.",
  },

  {
    number: "02",
    icon: Sparkles,
    title: "AI creates your plan",
    description:
      "Our AI generates personalized itineraries, activities, recommendations, and smart suggestions.",
  },

  {
    number: "03",
    icon: Plane,
    title: "Enjoy your journey",
    description:
      "Follow your plan, explore new places, and save your unforgettable travel memories.",
  },
];

function HowItWorks() {
  return (
    <section
      className="
      relative

      overflow-hidden

      bg-white

      py-20

      dark:bg-[#07111F]

      sm:py-24

      lg:py-28
      "
    >
      {/* Background glow */}

      <div
        className="
        absolute

        left-0

        top-1/3

        h-72

        w-72

        rounded-full

        bg-cyan-300/20

        blur-3xl

        dark:bg-cyan-500/10
        "
      />

      <div
        className="
        relative

        mx-auto

        max-w-7xl

        px-5

        sm:px-10

        lg:px-20
        "
      >
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
          mx-auto

          max-w-3xl

          text-center
          "
        >
          <div
            className="
            inline-flex

            items-center

            gap-2

            rounded-full

            bg-cyan-50

            px-4

            py-2

            text-sm

            font-semibold

            text-cyan-700

            dark:bg-cyan-500/10

            dark:text-cyan-300
            "
          >
            <Sparkles size={16} />
            Simple process
          </div>

          <h2
            className="
            mt-6

            text-3xl

            font-bold

            text-[#102B2B]

            dark:text-white

            sm:text-4xl

            lg:text-5xl
            "
          >
            Plan your trip in
            <span
              className="
              text-cyan-500
              "
            >
              three simple steps
            </span>
          </h2>

          <p
            className="
            mt-5

            text-slate-600

            dark:text-slate-300

            sm:text-lg
            "
          >
            TravelGenie turns your travel ideas into a complete journey with the
            power of artificial intelligence.
          </p>
        </motion.div>

        {/* Steps */}

        <div
          className="
          relative

          mt-16

          grid

          grid-cols-1

          gap-8

          lg:grid-cols-3
          "
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -10,
                }}
                className="
              relative

              rounded-[30px]

              border

              border-slate-200

              bg-[#F8FCFC]

              p-8

              shadow-sm

              transition

              dark:border-white/10

              dark:bg-[#111E2D]
              "
              >
                {/* Number */}

                <span
                  className="
                absolute

                right-7

                top-6

                text-5xl

                font-bold

                text-slate-200

                dark:text-white/10
                "
                >
                  {step.number}
                </span>

                <div
                  className="
                flex

                h-14

                w-14

                items-center

                justify-center

                rounded-2xl

                bg-cyan-500

                text-white

                shadow-lg
                "
                >
                  <Icon size={26} />
                </div>

                <h3
                  className="
                mt-7

                text-xl

                font-bold

                text-[#102B2B]

                dark:text-white
                "
                >
                  {step.title}
                </h3>

                <p
                  className="
                mt-3

                leading-7

                text-slate-600

                dark:text-slate-300
                "
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
