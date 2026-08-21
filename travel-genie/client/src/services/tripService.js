import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/trips/";

const getHeaders = () => {
  const token = localStorage.getItem("access");

  return {
    Authorization: `Bearer ${token}`,
  };
};

// GET ALL TRIPS

export const getTrips = async () => {
  const response = await axios.get(API_URL, {
    headers: getHeaders(),
  });

  return response.data;
};

// CREATE TRIP

export const createTrip = async (trip) => {
  const response = await axios.post(API_URL, trip, {
    headers: getHeaders(),
  });

  return response.data;
};

// DELETE TRIP

export const deleteTripAPI = async (id) => {
  await axios.delete(`${API_URL}${id}/`, {
    headers: getHeaders(),
  });
};

// UPDATE TRIP

export const updateTripAPI = async (id, trip) => {
  const response = await axios.put(`${API_URL}${id}/`, trip, {
    headers: getHeaders(),
  });

  return response.data;
};
