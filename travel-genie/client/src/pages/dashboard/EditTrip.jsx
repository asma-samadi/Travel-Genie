import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  Wallet,
  Plane,
  Users,
  Save,
  Calendar,
} from "lucide-react";

import { useTrips } from "../../context/TripContext.jsx";

function EditTrip() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { trips, updateTrip } = useTrips();

  const trip = trips.find((item) => String(item.id) === String(id));

  const [formData, setFormData] = useState({
    destination: trip?.destination || "",
    budget: trip?.budget || "",
    travelStyle: trip?.travelStyle || "",
    travelers: trip?.travelers || 1,
    startDate: trip?.start_date || trip?.dates?.start || "",
    endDate: trip?.end_date || trip?.dates?.end || "",
  });

  if (!trip) {
    return (
      <div
        className="
          rounded-3xl
          bg-white
          dark:bg-white/10
          p-8
          text-gray-900
          dark:text-white
        "
      >
        Trip not found
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTrip(trip.id, {
        ...trip,
        destination: formData.destination,
        budget: Number(formData.budget),
        travelStyle: formData.travelStyle,
        travelers: Number(formData.travelers),

        start_date: formData.startDate || null,
        end_date: formData.endDate || null,
      });

      navigate("/dashboard/trips");
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  return (
    <div
      className="
        max-w-3xl
        mx-auto
        space-y-6
      "
    >
      {/* Back button */}

      <button
        onClick={() => navigate(-1)}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          px-4
          py-2
          bg-gray-100
          dark:bg-white/10
          text-gray-700
          dark:text-white
          border
          border-gray-200
          dark:border-white/10
          hover:bg-gray-200
          dark:hover:bg-white/20
          hover:text-cyan-500
          transition-all
          duration-300
        "
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Card */}

      <div
        className="
          rounded-3xl
          bg-white/80
          dark:bg-white/10
          backdrop-blur-xl
          border
          border-gray-200
          dark:border-white/10
          shadow-xl
          p-5
          sm:p-8
        "
      >
        <h1
          className="
            text-3xl
            sm:text-4xl
            font-bold
            bg-gradient-to-r
            from-cyan-500
            via-blue-500
            to-purple-500
            bg-clip-text
            text-transparent
          "
        >
          Edit Your Trip
        </h1>

        <p
          className="
            mt-2
            text-gray-500
            dark:text-white/70
          "
        >
          Update your travel information.
        </p>

        <form
          onSubmit={handleSubmit}
          className="
            mt-8
            space-y-5
          "
        >
          {/* Destination */}

          <div>
            <label
              className="
                flex
                items-center
                gap-2
                mb-2
                font-semibold
                text-gray-800
                dark:text-white
              "
            >
              <MapPin size={18} />
              Destination
            </label>

            <input
              required
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                dark:border-white/20
                bg-white
                dark:bg-slate-900
                p-4
                text-gray-900
                dark:text-white
                outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            />
          </div>

          {/* Budget */}

          <div>
            <label
              className="
                flex
                items-center
                gap-2
                mb-2
                font-semibold
                text-gray-800
                dark:text-white
              "
            >
              <Wallet size={18} />
              Budget
            </label>

            <input
              required
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                dark:border-white/20
                bg-white
                dark:bg-slate-900
                p-4
                text-gray-900
                dark:text-white
                outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            />
          </div>

          {/* Travel Style */}

          <div>
            <label
              className="
                flex
                items-center
                gap-2
                mb-2
                font-semibold
                text-gray-800
                dark:text-white
              "
            >
              <Plane size={18} />
              Travel Style
            </label>

            <select
              name="travelStyle"
              value={formData.travelStyle}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                dark:border-white/20
                bg-white
                dark:bg-slate-900
                p-4
                text-gray-900
                dark:text-white
              "
            >
              <option value="">Select Style</option>
              <option value="Adventure">Adventure</option>
              <option value="Luxury">Luxury</option>
              <option value="Family">Family</option>
              <option value="Romantic">Romantic</option>
              <option value="Nature">Nature</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Travelers */}

          <div>
            <label
              className="
                flex
                items-center
                gap-2
                mb-2
                font-semibold
                text-gray-800
                dark:text-white
              "
            >
              <Users size={18} />
              Travelers
            </label>

            <input
              required
              type="number"
              min="1"
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                dark:border-white/20
                bg-white
                dark:bg-slate-900
                p-4
                text-gray-900
                dark:text-white
                outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            />
          </div>

          {/* Start Date */}

          <div>
            <label
              className="
                flex
                items-center
                gap-2
                mb-2
                font-semibold
                text-gray-800
                dark:text-white
              "
            >
              <Calendar size={18} />
              Start Date
            </label>

            <input
              required
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                dark:border-white/20
                bg-white
                dark:bg-slate-900
                p-4
                text-gray-900
                dark:text-white
                outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            />
          </div>

          {/* End Date */}

          <div>
            <label
              className="
                flex
                items-center
                gap-2
                mb-2
                font-semibold
                text-gray-800
                dark:text-white
              "
            >
              <Calendar size={18} />
              End Date
            </label>

            <input
              required
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                dark:border-white/20
                bg-white
                dark:bg-slate-900
                p-4
                text-gray-900
                dark:text-white
                outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-cyan-500
              py-4
              font-semibold
              text-white
              transition
              hover:bg-cyan-400
            "
          >
            <Save size={20} />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTrip;
