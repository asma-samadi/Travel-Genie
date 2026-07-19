import { Link } from "react-router-dom";

export default function EmptyTrips() {
  return (
    <div
      className="
text-center
py-20
"
    >
      <h3
        className="
text-3xl
font-bold
dark:text-white
"
      >
        No Trips Yet ✈️
      </h3>

      <p
        className="
mt-4
text-gray-600
dark:text-gray-300
"
      >
        Start planning your first adventure with TravelGenie.
      </p>

      <Link
        to="/create-trip"
        className="
inline-block
mt-6
rounded-xl
bg-lime-500
px-6
py-3
font-semibold
text-black
"
      >
        Create Trip
      </Link>
    </div>
  );
}
