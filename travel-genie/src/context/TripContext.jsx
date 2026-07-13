import { useState } from "react";
import { TripContext } from "./TripContext";

export default function TripProvider({ children }) {
  const [trips, setTrips] = useState([]);

  const addTrip = (trip) => {
    setTrips((previousTrips) => [...previousTrips, trip]);
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        addTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}
