import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TripContext } from "../../context/TripContext";
import TripCard from "../TripCard/TripCard";

export default function RecentSavedTrips() {
  const { trips, searchQuery } = useContext(TripContext);

  const sectionRef = useRef(null);

  const recentTrips = [...trips]
    .filter((trip) =>
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(-3)
    .reverse();

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [searchQuery]);

  return (
    <section ref={sectionRef} className="bg-white py-20 dark:bg-[#111827]">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-4 text-center text-4xl font-bold dark:text-white">
          Recent Saved Trips
        </h2>

        <p className="mb-12 text-center text-gray-600 dark:text-gray-300">
          Continue planning your latest adventures.
        </p>

        {recentTrips.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No matching trips found.
          </p>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/saved"
                className="rounded-xl border border-lime-500 px-6 py-3 font-semibold text-lime-600 transition hover:bg-lime-500 hover:text-black"
              >
                View All Saved Trips
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
