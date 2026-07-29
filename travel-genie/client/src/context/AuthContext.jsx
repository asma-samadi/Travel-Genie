import { createContext, useContext, useState } from "react";
import { loginUser } from "../api/django";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    localStorage.setItem("access", data.access);

    localStorage.setItem("refresh", data.refresh);

    setUser(data);

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
