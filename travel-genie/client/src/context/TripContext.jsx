import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";

import {
  getTrips,
  createTrip as createTripAPI,
  updateTrip as updateTripAPI,
  deleteTrip as deleteTripAPI,
} from "../api/trips";

export const TripContext = createContext(null);

export function TripProvider({ children }) {
  const { user } = useAuth();

  const [trips, setTrips] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadTrips = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setTrips([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getTrips();

      console.log("TRIPS API RESPONSE:", data);

      setTrips(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading trips:", error);

      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadTrips();
    } else {
      setTrips([]);
    }
  }, [user]);

  const addTrip = async (tripData) => {
    const newTrip = await createTripAPI(tripData);

    setTrips((currentTrips) => [...currentTrips, newTrip]);

    return newTrip;
  };

  const updateTrip = async (id, tripData) => {
    const updatedTrip = await updateTripAPI(id, tripData);

    console.log("UPDATED TRIP API RESPONSE:", updatedTrip);

    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        String(trip.id) === String(id)
          ? {
              ...trip,
              ...tripData,
              ...updatedTrip,
            }
          : trip,
      ),
    );

    return updatedTrip;
  };

  const deleteTrip = async (id) => {
    await deleteTripAPI(id);

    setTrips((currentTrips) =>
      currentTrips.filter((trip) => String(trip.id) !== String(id)),
    );
  };

  const toggleFavorite = async (id) => {
    const trip = trips.find((item) => String(item.id) === String(id));

    if (!trip) return;

    const tripData = {
      ...trip,
      favorite: !trip.favorite,
    };

    const updatedTrip = await updateTripAPI(id, tripData);

    setTrips((currentTrips) =>
      currentTrips.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              ...tripData,
              ...updatedTrip,
            }
          : item,
      ),
    );
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        loading,
        addTrip,
        updateTrip,
        deleteTrip,
        toggleFavorite,
        loadTrips,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error("useTrips must be used inside a TripProvider");
  }

  return context;
}
