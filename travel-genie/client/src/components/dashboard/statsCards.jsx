import { Map, Wallet, Image, Globe } from "lucide-react";

import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Trips",
    value: "12",
    icon: Map,
  },

  {
    title: "Destinations",
    value: "8",
    icon: Globe,
  },

  {
    title: "Total Budget",
    value: "$8,500",
    icon: Wallet,
  },

  {
    title: "Memories",
    value: "46",
    icon: Image,
  },
];

function StatsCards() {
  return (
    <div
      className="
grid

grid-cols-2

xl:grid-cols-4

gap-4

"
    >
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


"
          >
            <div
              className="

flex

items-center

justify-between

"
            >
              <div>
                <p
                  className="

text-sm

text-white/60

"
                >
                  {item.title}
                </p>

                <h2
                  className="

mt-2

text-2xl

font-bold

text-white

"
                >
                  {item.value}
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
