import {  useState } from "react";
import { getUsers, saveUsers } from "../context/auth";
import { AuthContext } from "./AuthContext";


export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null,
  );

  function signup(name, email, password) {
    const users = getUsers();

    const exists = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (exists) {
      alert("An account with this email already exists.");
      return false;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
      trips: [],
    };

    users.push(newUser);

    saveUsers(users);

    setUser(newUser);

    localStorage.setItem("currentUser", JSON.stringify(newUser));

    return true;
  }

  function login(email, password) {
    const users = getUsers();

    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase().trim() === email.toLowerCase().trim() &&
        user.password === password,
    );

    if (foundUser) {
      setUser(foundUser);

      localStorage.setItem("currentUser", JSON.stringify(foundUser));

      return true;
    }

    return false;
  }

  function updateProfile(name) {
    const updatedUser = {
      ...user,
      name: name,
    };

    setUser(updatedUser);

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = getUsers();

    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));

    saveUsers(updatedUsers);
  }

  function logout() {
    setUser(null);

    localStorage.removeItem("currentUser");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
