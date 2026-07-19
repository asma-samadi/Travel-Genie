import { useState, useContext } from "react";
import { TripContext } from "../../context/TripContext";
import { saveTrips } from "../../services/localStorage";
import { v4 as uuidv4 } from "uuid";

export default function TripForm() {
  const { trips, addTrip } = useContext(TripContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    startDate: "",
    endDate: "",
    travelStyle: "",
    travelers: "1",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.destination.trim()) {
      alert("Please enter a destination.");
      return;
    }

    if (!formData.budget) {
      alert("Please enter your budget.");
      return;
    }

    if (!formData.startDate) {
      alert("Please select a start date.");
      return;
    }

    if (!formData.endDate) {
      alert("Please select an end date.");
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      alert("End date must be after the start date.");
      return;
    }

    setLoading(true);

    try {
      const newTrip = {
        id: uuidv4(),

        destination: formData.destination,

        budget: Number(formData.budget),

        dates: {
          start: formData.startDate,
          end: formData.endDate,
        },

        travelStyle: formData.travelStyle,

        travelers: Number(formData.travelers),

        itinerary: [],

        estimatedCost: {
          accommodation: 100,
          food: 90,
          transport: 200,
          activities: 290,
        },

        packingList: [],
      };

      const updatedTrips = [...trips, newTrip];

      addTrip(newTrip);

      saveTrips(updatedTrips);

      console.log(newTrip);

      alert("Trip created successfully!");

      setFormData({
        destination: "",
        budget: "",
        startDate: "",
        endDate: "",
        travelStyle: "",
        travelers: "1",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-stone-50 py-20 dark:bg-[#0F172A]">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl dark:bg-[#1E293B]">
        <h2 className="mb-3 text-center text-4xl font-bold dark:text-white">
          Plan Your Next Adventure
        </h2>

        <p className="mb-10 text-center text-gray-600 dark:text-gray-300">
          Fill in your travel details and let TravelGenie help organize your
          perfect journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block font-semibold dark:text-white">
              📍 Destination
            </label>

            <input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Paris"
              className="w-full rounded-xl border border-gray-300 bg-white p-4 outline-none focus:border-lime-500 dark:border-gray-700 dark:bg-[#111827] dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold dark:text-white">
              💰 Budget (USD)
            </label>

            <input
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              type="number"
              placeholder="1000"
              className="w-full rounded-xl border border-gray-300 bg-white p-4 outline-none focus:border-lime-500 dark:border-gray-700 dark:bg-[#111827] dark:text-white"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                📅 Start Date
              </label>

              <input
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                type="date"
                className="w-full rounded-xl border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-[#111827] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                📅 End Date
              </label>

              <input
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                type="date"
                className="w-full rounded-xl border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-[#111827] dark:text-white"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                ✈️ Travel Style
              </label>

              <select
                name="travelStyle"
                value={formData.travelStyle}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-[#111827] dark:text-white"
              >
                <option value="">Select Travel Style</option>
                <option value="Adventure">Adventure</option>
                <option value="Luxury">Luxury</option>
                <option value="Family">Family</option>
                <option value="Romantic">Romantic</option>
                <option value="Nature">Nature</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold dark:text-white">
                👥 Travelers
              </label>

              <select
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-[#111827] dark:text-white"
              >
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3">3 Travelers</option>
                <option value="4">4 Travelers</option>
                <option value="5">5+ Travelers</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-lime-500 py-4 text-lg font-semibold text-black transition hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating Your Trip..." : "🤖 Generate AI Trip"}
          </button>
        </form>
      </div>
    </section>
  );
}