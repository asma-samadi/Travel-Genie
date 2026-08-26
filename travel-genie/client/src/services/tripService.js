import api from "./axios";

// GET ALL TRIPS
export const getTrips = async () => {
  const response = await api.get("trips/");
  return response.data;
};

// CREATE TRIP
export const createTrip = async (trip) => {
  const response = await api.post("trips/", trip);
  return response.data;
};

// DELETE TRIP
export const deleteTripAPI = async (id) => {
  await api.delete(`trips/${id}/`);
};

// UPDATE TRIP
export const updateTripAPI = async (id, trip) => {
  const response = await api.put(`trips/${id}/`, trip);
  return response.data;
};
