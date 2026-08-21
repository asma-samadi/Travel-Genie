import paris from "../../assets/images/destinations/paris.jpg";
import japan from "../../assets/images/destinations/japan.jpg";
import dubai from "../../assets/images/destinations/dubai.jpg";

const trips = [
  {
    id: 1,
    city: "Paris",
    date: "10 Aug - 18 Aug",
    budget: "$2500",
    image: paris,
  },

  {
    id: 2,
    city: "Tokyo",
    date: "20 Sep - 28 Sep",
    budget: "$3200",
    image: japan,
  },

  {
    id: 3,
    city: "Dubai",
    date: "5 Oct - 12 Oct",
    budget: "$1800",
    image: dubai,
  },
];

function RecentTrips() {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-white">
          Recent Trips
        </h2>

        <button className="text-cyan-500 hover:text-cyan-600">View all</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="
            overflow-hidden
            rounded-[28px]

            bg-white/70
            dark:bg-[#071625]/70

            backdrop-blur-3xl

            border
            border-white/20

            shadow-xl

            transition-all
            duration-300

            hover:-translate-y-2
            "
          >
            <img
              src={trip.image}
              alt={trip.city}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {trip.city}
              </h3>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {trip.date}
              </p>

              <p className="mt-2 text-cyan-500 font-semibold">{trip.budget}</p>

              <button
                className="
                mt-5

                w-full

                rounded-xl

                bg-gradient-to-r
                from-cyan-500
                to-blue-600

                py-3

                text-white

                transition

                hover:scale-105
                "
              >
                View Trip
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentTrips;
