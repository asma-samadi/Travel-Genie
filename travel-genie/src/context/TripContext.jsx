import { useState } from "react";
import { TripContext } from "./TripContext.js";
import { saveTrips, getTrips } from "../services/localStorage";

export default function TripProvider({ children }) {
  const [trips, setTrips] = useState(() => {
    const storedTrips = getTrips();

    return storedTrips || [];
  });

  const addTrip = (trip) => {
    const updatedTrips = [...trips, trip];

    setTrips(updatedTrips);

    saveTrips(updatedTrips);
  };

  const updateTrip = (updatedTrip) => {
    const updatedTrips = trips.map((trip) =>
      trip.id === updatedTrip.id ? updatedTrip : trip,
    );

    setTrips(updatedTrips);

    saveTrips(updatedTrips);
  };

  const deleteTrip = (id) => {
    const updatedTrips = trips.filter((trip) => trip.id !== id);

    setTrips(updatedTrips);

    saveTrips(updatedTrips);
  };

  const toggleFavorite = (id) => {
    const updatedTrips = trips.map((trip) => {
      if (trip.id === id) {
        return {
          ...trip,
          favorite: !trip.favorite,
        };
      }

      return trip;
    });

    setTrips(updatedTrips);

    saveTrips(updatedTrips);
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        addTrip,
        updateTrip,
        deleteTrip,
        toggleFavorite,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}
