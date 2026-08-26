import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  Heart,
  Trash2,
  Eye,
  Edit,
  MapPin,
  Calendar,
  Users,
  Plus,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useTrips } from "../../context/TripContext.jsx";
import DeleteModal from "../../components/Common/DeleteModal";

function Trips() {
  const navigate = useNavigate();

  const { trips, loading, deleteTrip, toggleFavorite, addTrip } = useTrips();

  const [deleteTripData, setDeleteTripData] = useState(null);

  const [deletedTrip, setDeletedTrip] = useState(null);

  const [showUndo, setShowUndo] = useState(false);

  const [error, setError] = useState("");

  const undoTimer = useRef(null);

  // =========================
  // UNDO DELETE
  // =========================

  const handleUndo = async () => {
    if (!deletedTrip) return;

    try {
      await addTrip({
        destination: deletedTrip.destination,
        budget: deletedTrip.budget,
        travelStyle: deletedTrip.travelStyle || "",
        travelers: deletedTrip.travelers || 1,
        dates: deletedTrip.dates || {
          start: deletedTrip.start_date || null,
          end: deletedTrip.end_date || null,
        },
        itinerary: deletedTrip.itinerary || [],
        packingList: deletedTrip.packingList || [],
        favorite: deletedTrip.favorite || false,
      });

      clearTimeout(undoTimer.current);

      setDeletedTrip(null);
      setShowUndo(false);
    } catch (error) {
      console.error("Undo failed:", error);
    }
  };

    

  // =========================
  // DELETE TRIP
  // =========================

  const handleDelete = async () => {
    if (!deleteTripData) return;

    try {
      const tripToDelete = deleteTripData;

      setDeletedTrip(tripToDelete);

      await deleteTrip(tripToDelete.id);

      setDeleteTripData(null);

      setShowUndo(true);

      undoTimer.current = setTimeout(() => {
        setShowUndo(false);

        setDeletedTrip(null);
      }, 5000);
    } catch (error) {
      console.error("Error deleting trip:", error);

      setError("Could not delete the trip.");

      setDeleteTripData(null);
    }
  };

  // =========================
  // FAVORITE
  // =========================

  const handleFavorite = async (id) => {
    try {
      await toggleFavorite(id);
    } catch (error) {
      console.error("Error updating favorite:", error);

      setError("Could not update favorite.");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        className="
          rounded-3xl
          bg-white/80
          dark:bg-white/10
          backdrop-blur-xl
          border
          border-gray-200
          dark:border-white/10
          p-8
          shadow-xl
        "
      >
        <p className="text-gray-700 dark:text-white">Loading your trips...</p>
      </div>
    );
  }

  // =========================
  // NO TRIPS
  // =========================

  if (!trips || trips.length === 0) {
    return (
      <div
        className="
          rounded-3xl
          bg-white/80
          dark:bg-white/10
          backdrop-blur-xl
          border
          border-gray-200
          dark:border-white/10
          p-8
          shadow-xl
          text-center
        "
      >
        <h2
          className="
            text-3xl
            font-bold
            bg-gradient-to-r
            from-cyan-500
            via-blue-500
            to-purple-500
            bg-clip-text
            text-transparent
          "
        >
          No Trips Yet ✈️
        </h2>

        <p className="mt-3 text-gray-600 dark:text-white/70">
          Create your first AI-powered trip and start planning your adventure.
        </p>

        <button
          onClick={() => navigate("/dashboard/trips/create")}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-cyan-500
            px-6
            py-3
            font-semibold
            text-white
            hover:bg-cyan-400
            transition
          "
        >
          <Plus size={18} />
          Create Trip
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        "
      >
        <div>
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
            My Trips
          </h1>

          <p className="mt-2 text-gray-500 dark:text-white/70">
            Manage your adventures and AI-generated plans.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/trips/create")}
          className="
            flex
            items-center
            justify-center
            gap-2

            rounded-xl

            bg-cyan-500

            px-5
            py-3

            font-semibold

            text-white

            hover:bg-cyan-400

            transition
          "
        >
          <Plus size={18} />
          Create Trip
        </button>
      </div>

      {/* ERROR MESSAGE */}

      {error && (
        <div
          className="
            rounded-xl
            border
            border-red-300
            bg-red-50
            p-4
            text-red-600

            dark:border-red-500/30
            dark:bg-red-500/10
            dark:text-red-400
          "
        >
          {error}
        </div>
      )}

      {/* ========================= */}
      {/* TRIP CARDS */}
      {/* ========================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {trips.map((trip) => (
          <motion.div
            key={trip.id}
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              rounded-3xl

              bg-white/80
              dark:bg-white/10

              backdrop-blur-xl

              border
              border-gray-200
              dark:border-white/10

              p-6

              shadow-xl
            "
          >
            {/* TOP */}

            <div
              className="
                flex
                justify-between
                items-start
                gap-4
              "
            >
              <div className="min-w-0">
                <h2
                  className="
                    text-xl
                    sm:text-2xl
                    font-bold
                    truncate

                    text-gray-900
                    dark:text-white
                  "
                >
                  {trip.destination}
                </h2>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-2

                    text-gray-600
                    dark:text-white/70
                  "
                >
                  <MapPin size={16} />

                  <span>
                    {trip.travelStyle || trip.travel_style || "Travel"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleFavorite(trip.id)}
                className="
                  hover:scale-110
                  transition
                "
                aria-label="Toggle favorite"
              >
                <Heart
                  size={22}
                  className={
                    trip.favorite
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 dark:text-white/60"
                  }
                />
              </button>
            </div>

            {/* ========================= */}
            {/* TRIP INFORMATION */}
            {/* ========================= */}

            <div
              className="
                mt-6
                space-y-3

                text-gray-700
                dark:text-white/80
              "
            >
              {/* DATE */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <Calendar size={17} />

                <p className="text-gray-500 dark:text-white/60">
                  {trip.dates?.start || trip.start_date || "No date"} -{" "}
                  {trip.dates?.end || trip.end_date || "No date"}
                </p>
              </div>

              {/* TRAVELERS */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <Users size={17} />

                <span>
                  {trip.travelers || 1}{" "}
                  {trip.travelers === 1 ? "Traveler" : "Travelers"}
                </span>
              </div>

              {/* BUDGET */}

              <div>💰 ${trip.budget || 0}</div>
            </div>

            {/* ========================= */}
            {/* ACTION BUTTONS */}
            {/* ========================= */}

            <div
              className="
                flex
                gap-2
                mt-8
              "
            >
              {/* VIEW */}

              <button
                onClick={() => navigate(`/dashboard/trips/${trip.id}`)}
                className="
                  flex-1

                  flex
                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  bg-cyan-500

                  py-3

                  text-white
                  font-semibold

                  hover:bg-cyan-400

                  transition
                "
              >
                <Eye size={17} />
                View
              </button>

              {/* EDIT */}

              <button
                onClick={() => navigate(`/dashboard/trips/${trip.id}/edit`)}
                className="
                  rounded-xl

                  px-4

                  bg-gray-100
                  dark:bg-white/10

                  text-gray-700
                  dark:text-white

                  hover:bg-gray-200
                  dark:hover:bg-white/20

                  transition
                "
                aria-label="Edit trip"
              >
                <Edit size={17} />
              </button>

              {/* DELETE */}

              <button
                onClick={() => setDeleteTripData(trip)}
                className="
                  rounded-xl

                  px-4

                  bg-red-100
                  dark:bg-red-500/20

                  text-red-600
                  dark:text-red-400

                  hover:bg-red-200
                  dark:hover:bg-red-500/30

                  transition
                "
                aria-label="Delete trip"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ========================= */}
      {/* DELETE MODAL */}
      {/* ========================= */}

      <DeleteModal
        isOpen={!!deleteTripData}
        tripName={deleteTripData?.destination}
        onClose={() => setDeleteTripData(null)}
        onDelete={handleDelete}
      />

      {/* ========================= */}
      {/* UNDO MESSAGE */}
      {/* ========================= */}

      <AnimatePresence>
        {showUndo && (
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 40,
            }}
            className="
              fixed

              bottom-6

              left-1/2
              -translate-x-1/2

              z-50

              flex
              items-center
              gap-4

              rounded-2xl

              bg-white
              dark:bg-slate-900

              border
              border-gray-200
              dark:border-white/10

              px-6
              py-4

              shadow-2xl
            "
          >
            <span className="text-gray-800 dark:text-white">
              🗑️ Trip deleted
            </span>

            <button
              onClick={handleUndo}
              className="
                rounded-lg

                bg-cyan-500

                px-4
                py-2

                text-white

                hover:bg-cyan-400

                transition
              "
            >
              Undo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Trips;
