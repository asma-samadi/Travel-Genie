import { useState, useEffect } from "react";
import { TripContext } from "./TripContext.js";
import { saveTrips, getTrips } from "../services/localStorage";

export default function TripProvider({ children }) {
  const [trips, setTrips] = useState(() => {
    const storedTrips = getTrips();
    return storedTrips || [];
  });

  const [searchQuery, setSearchQuery] = useState("");

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
    const updatedTrips = trips.map((trip) =>
      trip.id === id
        ? {
            ...trip,
            favorite: !trip.favorite,
          }
        : trip,
    );

    setTrips(updatedTrips);
    saveTrips(updatedTrips);
  };

  const saveItinerary = (tripId, itinerary) => {
    const updatedTrips = trips.map((trip) =>
      trip.id === tripId
        ? {
            ...trip,
            itinerary,
          }
        : trip,
    );

    setTrips(updatedTrips);
    saveTrips(updatedTrips);
  };

  useEffect(() => {
    saveTrips(trips);
  }, [trips]);

  return (
    <TripContext.Provider
      value={{
        trips,
        addTrip,
        updateTrip,
        deleteTrip,
        toggleFavorite,
        saveItinerary,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}
