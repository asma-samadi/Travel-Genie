import { useState, useContext } from "react";
import { TripContext } from "../../context/TripContext";
import { saveTrips } from "../../services/localStorage";
import { v4 as uuidv4 } from "uuid";

export default function TripForm() {
  const { trips, addTrip } = useContext(TripContext);

  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    startDate: "",
    endDate: "",
    travelStyle: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTrip = {
      id: uuidv4(),

      destination: formData.destination,

      budget: Number(formData.budget),

      dates: {
        start: formData.startDate,
        end: formData.endDate,
      },

      travelStyle: formData.travelStyle,

      itinerary: [],

      estimatedCost: {
        accommodation: 100,
        food: 90,
        transport: 200,
        activities: 2903,
      },

      packingList: [],
    };

    const updatedTrips = [...trips, newTrip];

    addTrip(newTrip);

    saveTrips(updatedTrips);

    console.log(newTrip);

    alert("Trip created successfully!");
  };

  return (
    <section className="py-16 px-5">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Create Your Trip Plan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            type="text"
            placeholder="Destination"
            className="w-full border rounded-lg p-3"
          />

          <input
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            type="number"
            placeholder="Budget ($)"
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              type="date"
              className="border rounded-lg p-3"
            />

            <input
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              type="date"
              className="border rounded-lg p-3"
            />
          </div>

          <select
            name="travelStyle"
            value={formData.travelStyle}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Travel Style</option>

            <option value="Adventure">Adventure</option>

            <option value="Relaxation">Relaxation</option>

            <option value="Culture">Culture</option>

            <option value="Family">Family</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Generate Trip
          </button>
        </form>
      </div>
    </section>
  );
}
