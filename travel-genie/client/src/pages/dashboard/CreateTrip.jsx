import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  Wallet,
  Users,
  Compass,
  CalendarDays,
  Plane,
} from "lucide-react";

import { useTrips } from "../../context/TripContext.jsx";

function CreateTrip() {
  const navigate = useNavigate();

  const { addTrip } = useTrips();

  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    travelers: "",
    travelStyle: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await addTrip({
        destination: formData.destination,
        budget: Number(formData.budget),
        travelers: Number(formData.travelers),
        travelStyle: formData.travelStyle,

        dates: {
          start: formData.startDate || null,
          end: formData.endDate || null,
        },

        favorite: false,
        itinerary: [],
        packingList: [],
      });

      navigate("/dashboard/trips");
    } catch (error) {
      console.error("Error creating trip:", error);
      setError("Could not create the trip. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/trips")}
        className="
          mb-6
          inline-flex
          items-center
          gap-2
          rounded-xl
          px-4
          py-2.5
          bg-white
          dark:bg-white/10
          border
          border-gray-200
          dark:border-white/10
          text-gray-700
          dark:text-white
          hover:text-cyan-500
          hover:bg-gray-50
          dark:hover:bg-white/20
          transition
        "
      >
        <ArrowLeft size={18} />
        Back to Trips
      </button>

      {/* Header */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-white/80
          dark:bg-white/10
          backdrop-blur-xl
          border
          border-gray-200
          dark:border-white/10
          p-6
          sm:p-8
          shadow-xl
        "
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div
            className="
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-cyan-500
              to-blue-600
              text-white
              shadow-lg
            "
          >
            <Plane size={28} />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Create a New Trip
            </h1>

            <p className="mt-2 text-gray-600 dark:text-white/70">
              Add your travel details and start planning your next adventure.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="
          mt-8
          rounded-3xl
          bg-white/80
          dark:bg-white/10
          backdrop-blur-xl
          border
          border-gray-200
          dark:border-white/10
          p-6
          sm:p-8
          shadow-xl
        "
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Destination */}
          <FormField label="Destination" icon={<MapPin size={19} />}>
            <input
              required
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Where are you going?"
              className="input-style"
            />
          </FormField>

          {/* Budget */}
          <FormField label="Budget" icon={<Wallet size={19} />}>
            <input
              required
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter your budget"
              className="input-style"
            />
          </FormField>

          {/* Travelers */}
          <FormField label="Travelers" icon={<Users size={19} />}>
            <input
              required
              type="number"
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              placeholder="Number of travelers"
              className="input-style"
            />
          </FormField>

          {/* Travel Style */}
          <FormField label="Travel Style" icon={<Compass size={19} />}>
            <input
              name="travelStyle"
              value={formData.travelStyle}
              onChange={handleChange}
              placeholder="Luxury, Adventure, Budget..."
              className="input-style"
            />
          </FormField>

          {/* Start Date */}
          <FormField label="Start Date" icon={<CalendarDays size={19} />}>
            <input
              required
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input-style"
            />
          </FormField>

          {/* End Date */}
          <FormField label="End Date" icon={<CalendarDays size={19} />}>
            <input
              required
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="input-style"
            />
          </FormField>
        </div>

        {/* Error */}
        {error && (
          <div
            className="
              mt-6
              rounded-xl
              border
              border-red-200
              bg-red-50
              dark:bg-red-500/10
              dark:border-red-500/30
              px-4
              py-3
              text-red-600
              dark:text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/trips")}
            className="
              flex-1
              rounded-xl
              border
              border-gray-300
              dark:border-white/20
              py-3.5
              text-gray-700
              dark:text-white
              font-medium
              hover:bg-gray-100
              dark:hover:bg-white/10
              transition
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              flex-1
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              py-3.5
              text-white
              font-semibold
              shadow-lg
              shadow-cyan-500/20
              hover:scale-[1.02]
              transition
            "
          >
            <Plane size={19} />
            Create Trip
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({ label, icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-2 mb-2.5 text-sm font-medium text-gray-700 dark:text-white/90">
        <span className="text-cyan-500">{icon}</span>
        {label}
      </label>

      {children}
    </div>
  );
}

export default CreateTrip;
