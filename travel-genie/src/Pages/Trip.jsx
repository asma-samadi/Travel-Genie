import { useParams } from "react-router-dom";
import { useContext } from "react";
import { TripContext } from "../context/TripContext";

export default function Trip() {
  const { id } = useParams();

  const { trips } = useContext(TripContext);

  const trip = trips.find((trip) => trip.id === id);

  if (!trip) {
    return <h1 className="text-center text-3xl mt-20">Trip Not Found</h1>;
  }

  return (
    <div className="py-16 px-5">
      <h1 className="text-4xl font-bold">{trip.destination}</h1>

      <div className="mt-6 bg-white shadow-lg rounded-xl p-6">
        <p>Budget: ${trip.budget}</p>

        <p>Travel Style: {trip.travelStyle}</p>

        <p>
          Start:
          {trip.dates.start}
        </p>

        <p>
          End:
          {trip.dates.end}
        </p>
      </div>
    </div>
  );
}
