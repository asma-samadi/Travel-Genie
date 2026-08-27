import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tag,
  Trash2,
  Eye,
  Edit,
  MapPin,
  Calendar,
  Users,
  Plus,
  Wallet,
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
  // LABEL / FAVORITE
  // =========================

  const handleFavorite = async (id) => {
    try {
      await toggleFavorite(id);
    } catch (error) {
      console.error("Error updating trip label:", error);
      setError("Could not update the trip label.");
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
          border
          border-gray-200
          bg-white/80
          p-8
          shadow-sm
          backdrop-blur-xl
          dark:border-white/10
          dark:bg-white/10
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
          border
          border-gray-200
          bg-white/80
          p-8
          text-center
          shadow-sm
          backdrop-blur-xl
          dark:border-white/10
          dark:bg-white/10
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-cyan-500/10
            text-3xl
          "
        >
          ✈️
        </div>

        <h2
          className="
            mt-5
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
          No Trips Yet
        </h2>

        <p className="mx-auto mt-3 max-w-md text-gray-600 dark:text-white/70">
          Create your first AI-powered trip and start planning your next
          adventure.
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
            shadow-sm
            transition
            hover:bg-cyan-400
            hover:shadow-md
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
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
              bg-gradient-to-r
              from-cyan-500
              via-blue-500
              to-purple-500
              bg-clip-text
              text-transparent
              sm:text-4xl
            "
          >
            My Trips
          </h1>

          <p className="mt-2 text-gray-500 dark:text-white/70">
            Manage your adventures and AI-generated travel plans.
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
            shadow-sm
            transition
            hover:bg-cyan-400
            hover:shadow-md
          "
        >
          <Plus size={18} />
          Create Trip
        </button>
      </div>

      {/* ========================= */}
      {/* ERROR MESSAGE */}
      {/* ========================= */}

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
          gap-6
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        {trips.map((trip) => (
          <motion.div
            key={trip.id}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            whileHover={{
              y: -6,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-gray-200
              bg-white/90
              p-6
              shadow-sm
              transition-shadow
              hover:shadow-lg
              dark:border-white/10
              dark:bg-white/10
              dark:hover:bg-white/[0.12]
            "
          >
            {/* TOP ACCENT */}

            <div
              className="
                absolute
                left-0
                top-0
                h-1
                w-full
                bg-gradient-to-r
                from-cyan-500
                via-blue-500
                to-purple-500
                opacity-80
              "
            />

            {/* TOP */}

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 pt-1">
                <h2
                  className="
                    truncate
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                    sm:text-2xl
                  "
                >
                  {trip.destination}
                </h2>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-gray-500
                    dark:text-white/60
                  "
                >
                  <MapPin size={16} className="shrink-0 text-cyan-500" />

                  <span className="truncate">
                    {trip.travelStyle || trip.travel_style || "Travel"}
                  </span>
                </div>
              </div>

              {/* LABEL */}

              <button
                onClick={() => handleFavorite(trip.id)}
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  transition
                  hover:scale-105
                  ${
                    trip.favorite
                      ? "bg-cyan-500 text-white shadow-sm"
                      : "bg-gray-100 text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-500 dark:bg-white/10 dark:text-white/60"
                  }
                `}
                aria-label="Toggle trip label"
                title={trip.favorite ? "Remove label" : "Label trip"}
              >
                <Tag
                  size={19}
                  className={trip.favorite ? "fill-current" : ""}
                />
              </button>
            </div>

            {/* ========================= */}
            {/* TRIP INFORMATION */}
            {/* ========================= */}

            <div
              className="
                my-6
                border-t
                border-gray-100
                pt-5
                dark:border-white/10
              "
            >
              <div className="space-y-4">
                {/* DATE */}

                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-cyan-500/10
                      text-cyan-500
                    "
                  >
                    <Calendar size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-white/50">
                      Travel Dates
                    </p>

                    <p className="truncate text-sm font-medium text-gray-800 dark:text-white/90">
                      {trip.dates?.start || trip.start_date || "No date"} —{" "}
                      {trip.dates?.end || trip.end_date || "No date"}
                    </p>
                  </div>
                </div>

                {/* TRAVELERS */}

                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-500/10
                      text-blue-500
                    "
                  >
                    <Users size={17} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-white/50">
                      Travelers
                    </p>

                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {trip.travelers || 1}{" "}
                      {trip.travelers === 1 ? "Traveler" : "Travelers"}
                    </p>
                  </div>
                </div>

                {/* BUDGET */}

                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-purple-500/10
                      text-purple-500
                    "
                  >
                    <Wallet size={17} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-white/50">
                      Budget
                    </p>

                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      ${trip.budget || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================= */}
            {/* ACTION BUTTONS */}
            {/* ========================= */}

            <div className="flex gap-2 border-t border-gray-100 pt-5 dark:border-white/10">
              {/* VIEW */}

              <button
                onClick={() => navigate(`/dashboard/trips/${trip.id}`)}
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-cyan-500
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-cyan-400
                "
              >
                <Eye size={17} />
                View Details
              </button>

              {/* EDIT */}

              <button
                onClick={() => navigate(`/dashboard/trips/${trip.id}/edit`)}
                className="
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-gray-100
                  px-4
                  text-gray-700
                  transition
                  hover:bg-gray-200
                  dark:bg-white/10
                  dark:text-white
                  dark:hover:bg-white/20
                "
                aria-label="Edit trip"
                title="Edit trip"
              >
                <Edit size={17} />
              </button>

              {/* DELETE */}

              <button
                onClick={() => setDeleteTripData(trip)}
                className="
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-50
                  px-4
                  text-red-600
                  transition
                  hover:bg-red-100
                  dark:bg-red-500/15
                  dark:text-red-400
                  dark:hover:bg-red-500/25
                "
                aria-label="Delete trip"
                title="Delete trip"
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
              z-50
              flex
              items-center
              gap-4
              -translate-x-1/2
              rounded-2xl
              border
              border-gray-200
              bg-white
              px-5
              py-4
              shadow-2xl
              dark:border-white/10
              dark:bg-slate-900
            "
          >
            <span className="text-sm text-gray-800 dark:text-white">
              Trip deleted successfully.
            </span>

            <button
              onClick={handleUndo}
              className="
                rounded-lg
                bg-cyan-500
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-cyan-400
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
