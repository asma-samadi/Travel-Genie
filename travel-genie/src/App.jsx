import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import SavedTrips from "./pages/SavedTrips";
import Trip from "./pages/Trip";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

import TripForm from "./components/TripForm/TripForm";

import Budget from "./components/Budget/Budget";
import Packing from "./components/Packing/Packing";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<SavedTrips />} />
          <Route path="/trip/:id" element={<Trip />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-Profile" element={<EditProfile />} />
          <Route path="/create-trip" element={<TripForm />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/packing" element={<Packing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
