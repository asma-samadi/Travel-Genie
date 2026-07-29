import api from "./axios";

export const loginUser = async (credentials) => {
  console.log("Sending login:", credentials);

  const response = await api.post("token/", credentials);

  console.log("JWT Response:", response.data);

  return response.data;
};
