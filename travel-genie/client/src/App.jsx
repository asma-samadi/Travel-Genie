import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";

import ProtectedRoute from "./components/routes/ProtectedRoute";

import DashboardLayout from "./components/dashboard/DashboardLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import Trips from "./pages/dashboard/Trips";
import TripDetails from "./pages/dashboard/TripDetails";
import EditTrip from "./pages/dashboard/EditTrip";
import CreateTrip from "./pages/dashboard/CreateTrip";
import Budget from "./pages/dashboard/Budget";
import Recommendations from "./pages/dashboard/Recommendations";
import Memory from "./pages/dashboard/Memory";

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        {/* Trips */}
        <Route path="trips" element={<Trips />} />

        {/* Create must come before :id */}
        <Route path="trips/create" element={<CreateTrip />} />

        {/* Edit must also come before :id */}
        <Route path="trips/:id/edit" element={<EditTrip />} />

        {/* Dynamic trip details */}
        <Route path="trips/:id" element={<TripDetails />} />

        <Route path="budget" element={<Budget />} />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="memory" element={<Memory />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
