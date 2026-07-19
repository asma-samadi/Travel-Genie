import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TripContext } from "../context/TripContext";

export default function EditTrip() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { trips, updateTrip } = useContext(TripContext);

  const currentTrip = trips.find((trip) => trip.id === id);

  const [formData, setFormData] = useState({
    destination: currentTrip?.destination || "",

    budget: currentTrip?.budget || "",

    startDate: currentTrip?.dates?.start || "",

    endDate: currentTrip?.dates?.end || "",

    travelStyle: currentTrip?.travelStyle || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTrip = {
      ...currentTrip,

      destination: formData.destination,

      budget: Number(formData.budget),

      dates: {
        start: formData.startDate,
        end: formData.endDate,
      },

      travelStyle: formData.travelStyle,

      updatedAt: Date.now(),
    };

    updateTrip(updatedTrip);

    navigate("/saved");
  };

  return (
    <section
      className="
min-h-screen
bg-stone-50
py-20
dark:bg-[#0F172A]
"
    >
      <div
        className="
mx-auto
max-w-3xl
rounded-3xl
bg-white
p-8
shadow-xl
dark:bg-[#1E293B]
"
      >
        <h1
          className="
mb-8
text-center
text-4xl
font-bold
dark:text-white
"
        >
          Edit Your Trip
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="
w-full
rounded-xl
border
p-3
"
            placeholder="Destination"
          />

          <input
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            className="
w-full
rounded-xl
border
p-3
"
            placeholder="Budget"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              className="
rounded-xl
border
p-3
"
            />

            <input
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              className="
rounded-xl
border
p-3
"
            />
          </div>

          <select
            name="travelStyle"
            value={formData.travelStyle}
            onChange={handleChange}
            className="
w-full
rounded-xl
border
p-3
"
          >
            <option value="">Select Style</option>

            <option value="Adventure">Adventure</option>

            <option value="Relaxation">Relaxation</option>

            <option value="Culture">Culture</option>

            <option value="Family">Family</option>
          </select>

          <button
            className="
w-full
rounded-xl
bg-lime-500
py-3
font-bold
hover:bg-lime-400
"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
}
