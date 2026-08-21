import { Sparkles, MapPin, Utensils, Camera } from "lucide-react";

function AISuggestions() {
  const suggestions = [
    {
      title: "Hidden Mountain View",
      description: "A peaceful place with amazing landscapes and sunset views.",
      icon: Camera,
    },

    {
      title: "Local Food Experience",
      description: "Try traditional restaurants and local dishes.",
      icon: Utensils,
    },

    {
      title: "Nature Adventure",
      description: "Explore beautiful locations recommended by AI.",
      icon: MapPin,
    },
  ];

  return (
    <section
      className="
      mt-8
      "
    >
      {/* Title */}

      <div
        className="
        flex
        items-center
        gap-3
        mb-5
        "
      >
        <div
          className="
          p-3
          rounded-2xl

          bg-gradient-to-r
          from-cyan-500
          to-blue-600

          text-white
          "
        >
          <Sparkles size={22} />
        </div>

        <div>
          <h2
            className="
text-2xl
font-bold

text-white

"
          >
            AI Suggestions
          </h2>

          <p
            className="
text-sm

text-white/70

"
          >
            Personalized recommendations for your next trip
          </p>
        </div>
      </div>

      {/* Cards */}

      <div
        className="
        grid

        grid-cols-1

        md:grid-cols-3

        gap-5
        "
      >
        {suggestions.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                rounded-[28px]

                p-6

                bg-white/70

                dark:bg-white/10

                backdrop-blur-xl

                border

                border-gray-200

                dark:border-white/10

                shadow-xl

                hover:-translate-y-2

                transition-all

                duration-300
                "
            >
              <div
                className="
                  w-12
                  h-12

                  rounded-2xl

                  flex
                  items-center
                  justify-center

                  bg-cyan-500/20

                  text-cyan-500
                  "
              >
                <Icon size={24} />
              </div>

              <h3
                className="
                  mt-5

                  font-semibold

                  text-lg

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

                  text-gray-500

                  dark:text-white/60
                  "
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AISuggestions;
