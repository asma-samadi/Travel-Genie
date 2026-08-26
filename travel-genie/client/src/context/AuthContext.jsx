import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

import { loginUser } from "../api/django";

import { getProfile } from "../api/profile";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);

  // Load the user's profile using the saved JWT token

  const loadUser = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setUser(null);
      setAuthLoading(false);
      return;
    }

    try {
      const profile = await getProfile();

      setUser({
        ...profile.user,
        profile: profile,
      });
    } catch (error) {
      console.error("Error loading user profile:", error);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  // Keep the user logged in after refreshing the page

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    // Load the real user information immediately after login

    const profile = await getProfile();

    setUser({
      ...profile.user,
      profile: profile,
    });

    return data;
  };

  // ======================================================
  // REGISTER NEW USER
  // ======================================================

  const register = async (userData) => {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/users/register/",
      userData,
    );

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        login,
        logout,
        loadUser,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
