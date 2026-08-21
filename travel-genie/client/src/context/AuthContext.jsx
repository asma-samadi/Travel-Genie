import { createContext, useContext, useState } from "react";

import { loginUser } from "../api/django";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("access");

    return token ? { token } : null;
  });

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    localStorage.setItem("access", data.access);

    localStorage.setItem("refresh", data.refresh);

    setUser({
      token: data.access,
    });

    return data;
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
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
