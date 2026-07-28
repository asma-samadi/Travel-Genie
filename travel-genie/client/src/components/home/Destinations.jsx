import { motion } from "framer-motion";
import {
ArrowUpRight,
MapPin,
Sparkles,
} from "lucide-react";

import japanImage from "../../assets/images/destinations/japan.jpg";
import turkeyImage from "../../assets/images/destinations/turkey.jpg";
import italyImage from "../../assets/images/destinations/italy.jpg";
import switzerlandImage from "../../assets/images/destinations/switzerland.jpg";

const destinations = [
{
name: "Tokyo",
country: "Japan",
description:
"Discover modern city life, peaceful temples, and unforgettable Japanese culture.",
budget: "$1,800",
image: japanImage,
},
{
name: "Istanbul",
country: "Turkey",
description:
"Explore historic landmarks, colorful markets, and the beauty of two continents.",
budget: "$1,200",
image: turkeyImage,
},
{
name: "Rome",
country: "Italy",
description:
"Experience ancient history, beautiful architecture, and world-famous cuisine.",
budget: "$1,600",
image: italyImage,
},
{
name: "Zermatt",
country: "Switzerland",
description:
"Enjoy mountain views, peaceful villages, and unforgettable outdoor adventures.",
budget: "$2,400",
image: switzerlandImage,
},
];

function Destinations() {
return (
<section
id="destinations"
className="
relative
overflow-hidden

```
    bg-[#F5FBFB]
    py-20

    dark:bg-[#07111F]

    sm:py-24
    lg:py-28
  "
>
  {/* Background glow */}

  <div
    className="
      pointer-events-none

      absolute
      -right-24
      top-20

      h-80
      w-80

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
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
        flex

        flex-col

        gap-6

        lg:flex-row

        lg:items-end

        lg:justify-between
      "
    >
      <div className="max-w-2xl">
        <div
          className="
            inline-flex

            items-center

            gap-2

            rounded-full

            border

            border-cyan-200

            bg-white

            px-4

            py-2

            text-sm

            font-semibold

            text-cyan-700

            shadow-sm

            dark:border-cyan-500/20

            dark:bg-cyan-500/10

            dark:text-cyan-300
          "
        >
          <Sparkles size={16} />

          Explore the world
        </div>

        <h2
          className="
            mt-6

            text-3xl

            font-bold

            leading-tight

            text-[#102B2B]

            dark:text-white

            sm:text-4xl

            lg:text-5xl
          "
        >
          Find your next{" "}
          <span className="text-cyan-500">
            unforgettable destination.
          </span>
        </h2>

        <p
          className="
            mt-5

            max-w-xl

            text-base

            leading-7

            text-slate-600

            dark:text-slate-300

            sm:text-lg
          "
        >
          Explore destinations selected for memorable experiences,
          beautiful views, and exciting adventures.
        </p>
      </div>

      <button
        className="
          group

          inline-flex

          w-fit

          items-center

          gap-2

          rounded-full

          border

          border-cyan-200

          bg-white

          px-6

          py-3

          font-semibold

          text-cyan-700

          transition

          duration-300

          hover:-translate-y-1

          hover:border-cyan-400

          hover:shadow-lg

          dark:border-white/10

          dark:bg-white/5

          dark:text-cyan-300
        "
      >
        View all destinations

        <ArrowUpRight
          size={18}
          className="
            transition

            duration-300

            group-hover:translate-x-1

            group-hover:-translate-y-1
          "
        />
      </button>
    </motion.div>

    {/* Destination cards */}

    <div
      className="
        mt-12

        grid

        grid-cols-1

        gap-6

        sm:grid-cols-2

        lg:mt-16

        lg:grid-cols-4
      "
    >
      {destinations.map((destination, index) => (
        <motion.article
          key={destination.name}
          initial={{
            opacity: 0,
            y: 45,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            delay: index * 0.12,
          }}
          whileHover={{
            y: -8,
          }}
          className="
            group

            overflow-hidden

            rounded-[28px]

            border

            border-white/60

            bg-white

            shadow-sm

            transition

            duration-300

            hover:shadow-2xl

            dark:border-white/10

            dark:bg-[#111E2D]
          "
        >
          {/* Image */}

          <div
            className="
              relative

              h-64

              overflow-hidden
            "
          >
            <img
              src={destination.image}
              alt={`${destination.name}, ${destination.country}`}
              className="
                h-full

                w-full

                object-cover

                transition

                duration-700

                group-hover:scale-110
              "
            />

            <div
              className="
                absolute

                inset-0

                bg-gradient-to-t

                from-black/50

                via-transparent

                to-transparent
              "
            />

            <div
              className="
                absolute

                bottom-5

                left-5

                flex

                items-center

                gap-2

                rounded-full

                bg-white/90

                px-3

                py-2

                text-sm

                font-semibold

                text-[#102B2B]

                backdrop-blur-md
              "
            >
              <MapPin
                size={16}
                className="text-cyan-600"
              />

              {destination.country}
            </div>
          </div>

          {/* Content */}

          <div className="p-6">
            <div
              className="
                flex

                items-start

                justify-between

                gap-4
              "
            >
              <div>
                <h3
                  className="
                    text-xl

                    font-bold

                    text-[#102B2B]

                    dark:text-white
                  "
                >
                  {destination.name}
                </h3>

                <p
                  className="
                    mt-1

                    text-sm

                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  Starting from {destination.budget}
                </p>
              </div>

              <ArrowUpRight
                size={20}
                className="
                  text-cyan-500

                  transition

                  duration-300

                  group-hover:translate-x-1

                  group-hover:-translate-y-1
                "
              />
            </div>

            <p
              className="
                mt-4

                text-sm

                leading-6

                text-slate-600

                dark:text-slate-300
              "
            >
              {destination.description}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  </div>
</section>

);
}

export default Destinations;
