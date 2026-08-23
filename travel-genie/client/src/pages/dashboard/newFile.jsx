```jsx
import {
  MapPin,
  Sparkles,
  Compass,
  Utensils,
  Camera,
  Mountain,
} from "lucide-react";

import GlassCard from "../../components/common/GlassCard";

const recommendations = [
  {
    id: 1,
    title: "Explore Paris",
    location: "Paris, France",
    description:
      "Discover iconic landmarks, charming streets, museums, and unforgettable experiences.",
    category: "Culture",
    icon: Camera,
  },
  {
    id: 2,
    title: "Adventure in Japan",
    location: "Tokyo, Japan",
    description:
      "Experience modern city life, traditional culture, local food, and beautiful hidden places.",
    category: "Adventure",
    icon: Mountain,
  },
  {
    id: 3,
    title: "Discover Dubai",
    location: "Dubai, UAE",
    description:
      "Enjoy luxury experiences, modern architecture, desert adventures, and world-class attractions.",
    category: "Luxury",
    icon: Sparkles,
  },
  {
    id: 4,
    title: "Local Food Experiences",
    location: "Around the world",
    description:
      "Find unique local dishes, traditional restaurants, and memorable food experiences.",
    category: "Food",
    icon: Utensils,
  },
];

function Recommendations() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
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
            <Sparkles size={24} />
          </div>

          <div>
            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                text-white
              "
            >
              Smart Recommendations
            </h1>

            <p
              className="
                mt-1
                text-white/70
              "
            >
              Discover places and experiences selected for your next adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Recommendation categories */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <GlassCard className="p-5">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-500/15
                  text-cyan-500
                "
              >
                <Compass size={20} />
              </div>

              <div>
                <p className="text-sm text-white/60">
                  Destinations
                </p>

                <p className="font-semibold text-white">
                  Explore places
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-500/15
                  text-blue-500
                "
              >
                <Mountain size={20} />
              </div>

              <div>
                <p className="text-sm text-white/60">
                  Activities
                </p>

                <p className="font-semibold text-white">
                  Find experiences
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-500/15
                  text-purple-500
                "
              >
                <Utensils size={20} />
              </div>

              <div>
                <p className="text-sm text-white/60">
                  Food
                </p>

                <p className="font-semibold text-white">
                  Taste local
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-white
              "
            >
              Recommended for You
            </h2>

            <p className="mt-1 text-white/60">
              Personalized ideas for your next trip.
            </p>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-2
            gap-6
          "
        >
          {recommendations.map((recommendation) => {
            const Icon = recommendation.icon;

            return (
              <GlassCard
                key={recommendation.id}
                className="
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
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
                    <Icon size={23} />
                  </div>

                  <span
                    className="
                      rounded-full
                      bg-cyan-500/10
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-cyan-400
                    "
                  >
                    {recommendation.category}
                  </span>
                </div>

                <h3
                  className="
                    mt-5
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  {recommendation.title}
                </h3>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-2
                    text-white/60
                  "
                >
                  <MapPin size={16} />

                  <span className="text-sm">
                    {recommendation.location}
                  </span>
                </div>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-6
                    text-white/70
                  "
                >
                  {recommendation.description}
                </p>

                <button
                  type="button"
                  className="
                    mt-6
                    w-full
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    py-3
                    font-semibold
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                  "
                >
                  Explore Recommendation
                </button>
              </GlassCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Recommendations;
`;
