import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTrips } from "../../context/TripContext.jsx";

function CreateTrip() {
  const navigate = useNavigate();

  const { addTrip } = useTrips();

  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    travelers: '',
    travelStyle: "",
    startDate: '',
    endDate: '',
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
      <div className="rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Create a Trip ✈️
        </h1>

        <p className="mt-2 text-gray-600 dark:text-white/70">
          Plan your next adventure.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-xl grid grid-cols-1 sm:grid-cols-2 gap-5"
      >
        <input
          required
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="rounded-xl p-4 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
        />

        <input
          required
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Budget"
          className="rounded-xl p-4 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
        />

        <input
          required
          type="number"
          name="travelers"
          value={formData.travelers}
          onChange={handleChange}
          placeholder="Number of Travelers"
          className="rounded-xl p-4 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
        />

        <input
          name="travelStyle"
          value={formData.travelStyle}
          onChange={handleChange}
          placeholder="Travel Style"
          className="rounded-xl p-4 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
        />

        <div>
          <label className="block mb-2 text-gray-700 dark:text-white">
            Start Date
          </label>

          <input
            required
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full rounded-xl p-4 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700 dark:text-white">
            End Date
          </label>

          <input
            required
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full rounded-xl p-4 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
          />
        </div>

        {error && <p className="sm:col-span-2 text-red-500">{error}</p>}

        <div className="sm:col-span-2 flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/trips")}
            className="flex-1 rounded-xl border border-gray-300 dark:border-white/20 py-4 text-gray-700 dark:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 rounded-xl bg-cyan-500 py-4 text-white font-semibold hover:bg-cyan-400 transition"
          >
            Create Trip ✈️
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTrip;
