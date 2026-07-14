import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import SavedTrips from "./pages/SavedTrips";
import Trip from "./pages/Trip";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<SavedTrips />} />
        <Route path="/trip/:id" element={<Trip />} />
      </Route>
    </Routes>
  );
}

export default App;
