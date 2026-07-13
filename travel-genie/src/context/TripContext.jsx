import { useState } from "react";
import { TripContext } from "./TripContext";
import { getTrips, saveTrips } from "../services/localStorage";

export default function TripProvider({ children }) {
  const [trips, setTrips] = useState(() => getTrips());

  const addTrip = (trip) => {
    const updatedTrips = [...trips, trip];

    setTrips(updatedTrips);

    saveTrips(updatedTrips);
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
