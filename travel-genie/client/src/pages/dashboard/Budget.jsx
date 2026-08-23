import { useMemo } from "react";
import { Wallet, TrendingUp, DollarSign, MapPin } from "lucide-react";
import { useTrips } from "../../context/TripContext.jsx";

function Budget() {
  const { trips, loading } = useTrips();

  const budgetData = useMemo(() => {
    const totalBudget = trips.reduce(
      (total, trip) => total + Number(trip.budget || 0),
      0,
    );

    const averageBudget = trips.length > 0 ? totalBudget / trips.length : 0;

    const highestBudget =
      trips.length > 0
        ? Math.max(...trips.map((trip) => Number(trip.budget || 0)))
        : 0;

    return {
      totalBudget,
      averageBudget,
      highestBudget,
    };
  }, [trips]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-white">Loading budget...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Budget</h1>

        <p className="mt-2 text-white/70">
          Track and understand your travel spending.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

        <div
          className="
            rounded-3xl
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            p-6
            shadow-xl
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Trip Budget</p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                ${budgetData.totalBudget.toLocaleString()}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400">
              <Wallet size={24} />
            </div>
          </div>
        </div>

        <div
          className="
            rounded-3xl
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            p-6
            shadow-xl
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Average Trip Budget</p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                ${Math.round(budgetData.averageBudget).toLocaleString()}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>

        <div
          className="
            rounded-3xl
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            p-6
            shadow-xl
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Highest Trip Budget</p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                ${budgetData.highestBudget.toLocaleString()}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400">
              <DollarSign size={24} />
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="mb-5 flex items-center gap-2">
          <DollarSign className="text-cyan-400" size={24} />

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Trip Budgets
          </h2>
        </div>

        {trips.length === 0 ? (
          <div
            className="
              rounded-3xl
              bg-white/10
              backdrop-blur-xl
              border
              border-white/10
              p-8
              text-center
            "
          >
            <Wallet size={40} className="mx-auto text-white/50" />

            <h3 className="mt-4 text-xl font-semibold text-white">
              No trips yet
            </h3>

            <p className="mt-2 text-white/60">
              Create a trip to start tracking your travel budget.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="
                  rounded-3xl
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/10
                  p-6
                  shadow-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-cyan-400" />

                      <h3 className="text-xl font-bold text-white">
                        {trip.destination}
                      </h3>
                    </div>

                    <p className="mt-2 text-sm text-white/60">
                      {trip.travelStyle || "Travel"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-white/60">Budget</p>

                    <p className="text-2xl font-bold text-cyan-400">
                      ${Number(trip.budget || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-xs text-white/50">
                    <span>Budget</span>
                    <span>
                      {budgetData.totalBudget > 0
                        ? Math.round(
                            (Number(trip.budget || 0) /
                              budgetData.totalBudget) *
                              100,
                          )
                        : 0}
                      %
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-600
                      "
                      style={{
                        width: `${
                          budgetData.totalBudget > 0
                            ? Math.min(
                                (Number(trip.budget || 0) /
                                  budgetData.totalBudget) *
                                  100,
                                100,
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Budget;
