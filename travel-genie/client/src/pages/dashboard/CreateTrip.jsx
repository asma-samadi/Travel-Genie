import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Wallet,
  Users,
  Compass,
  CalendarDays,
  Plane,
  LocateFixed,
  Loader2,
} from "lucide-react";
import { useTrips } from "../../context/TripContext.jsx";

function getTodayLocal() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function CreateTrip() {
  const navigate = useNavigate();
  const { addTrip } = useTrips();

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    budget: "",
    travelers: "",
    travelStyle: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");

  const [destinationResults, setDestinationResults] = useState([]);
  const [destinationLoading, setDestinationLoading] = useState(false);
  const [showDestinationResults, setShowDestinationResults] = useState(false);

  // --------------------------------------------------
  // Handle input changes
  // --------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  // --------------------------------------------------
  // Search destinations
  // --------------------------------------------------

  useEffect(() => {
    const query = formData.destination.trim();

    if (query.length < 2) {
      setDestinationResults([]);
      setShowDestinationResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setDestinationLoading(true);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
            query,
          )}&addressdetails=1&limit=5`,
          {
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to search destinations.");
        }

        const data = await response.json();

        setDestinationResults(data);
        setShowDestinationResults(true);
      } catch (searchError) {
        console.error("Destination search failed:", searchError);
        setDestinationResults([]);
        setShowDestinationResults(true);
      } finally {
        setDestinationLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.destination]);

  // --------------------------------------------------
  // Select destination
  // --------------------------------------------------

  const selectDestination = (place) => {
    setFormData((current) => ({
      ...current,
      destination: place.display_name,
    }));

    setDestinationResults([]);
    setShowDestinationResults(false);
  };

  // --------------------------------------------------
  // Detect user's current location
  // --------------------------------------------------

  const detectLocation = () => {
    setLocationMessage("");
    setError("");

    if (!navigator.geolocation) {
      setError(
        "Location detection is not supported by your browser. Please enter your starting location manually.",
      );
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          );

          if (!response.ok) {
            throw new Error("Could not determine your location.");
          }

          const data = await response.json();

          const city =
            data.city ||
            data.locality ||
            data.principalSubdivision ||
            "";

          const country = data.countryName || "";

          let locationName = "";

          if (city && country) {
            locationName = `${city}, ${country}`;
          } else if (city) {
            locationName = city;
          } else if (country) {
            locationName = country;
          }

          if (!locationName) {
            throw new Error("Could not determine a readable location.");
          }

          setFormData((current) => ({
            ...current,
            origin: locationName,
          }));

          setLocationMessage(`Location detected: ${locationName}`);
        } catch (locationError) {
          console.error("Location detection failed:", locationError);

          setError(
            "We could not determine your location. Please enter your starting location manually.",
          );
        } finally {
          setLocationLoading(false);
        }
      },

      (geoError) => {
        console.error("Browser location error:", geoError);

        let message =
          "Could not access your location. Please enter your starting location manually.";

        if (geoError.code === 1) {
          message =
            "Location permission was denied. Please allow location access or enter your starting location manually.";
        } else if (geoError.code === 2) {
          message =
            "Your location could not be determined. Please enter your starting location manually.";
        } else if (geoError.code === 3) {
          message =
            "Location detection timed out. Please enter your starting location manually.";
        }

        setError(message);
        setLocationLoading(false);
      },

      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 300000,
      },
    );
  };

  // --------------------------------------------------
  // Submit trip
  // --------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.origin.trim()) {
      setError("Please enter your starting location.");
      return;
    }

    if (!formData.destination.trim()) {
      setError("Please enter a destination.");
      return;
    }

    if (!formData.budget || Number(formData.budget) < 0) {
      setError("Please enter a valid budget.");
      return;
    }

    if (!formData.travelers || Number(formData.travelers) < 1) {
      setError("Please enter at least one traveler.");
      return;
    }

    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      setError("Your end date cannot be before your start date.");
      return;
    }

    try {
      await addTrip({
        origin: formData.origin.trim(),
        destination: formData.destination.trim(),
        budget: Number(formData.budget),
        travelers: Number(formData.travelers),
        travelStyle: formData.travelStyle.trim(),

        dates: {
          start: formData.startDate || null,
          end: formData.endDate || null,
        },

        favorite: false,
        itinerary: [],
        packingList: [],
        recommendations: null,
      });

      navigate("/dashboard/trips");
    } catch (submitError) {
      console.error("Error creating trip:", submitError);
      setError("Could not create the trip. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/dashboard/trips")}
        className="mb-6 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white hover:text-cyan-500 hover:bg-gray-50 dark:hover:bg-white/20 transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
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
        className="mt-8 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Starting Location */}
          <FormField
            label="Starting Location"
            icon={<LocateFixed size={19} />}
          >
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  required
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="Where are you starting from?"
                  className="input-style flex-1"
                  autoComplete="off"
                />

                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={locationLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-white font-medium hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap"
                >
                  {locationLoading ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Detecting...
                    </>
                  ) : (
                    <>
                      <LocateFixed size={17} />
                      Detect
                    </>
                  )}
                </button>
              </div>

              {locationMessage && (
                <p className="text-sm text-cyan-600 dark:text-cyan-400">
                  {locationMessage}
                </p>
              )}

              <p className="text-xs text-gray-500 dark:text-white/50">
                Allow location access to automatically detect your current city.
                You can also enter it manually.
              </p>
            </div>
          </FormField>

          {/* Destination */}
          <FormField
            label="Destination"
            icon={<MapPin size={19} />}
          >
            <div className="relative">
              <div className="relative">
                <input
                  required
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  onFocus={() => {
                    if (destinationResults.length > 0) {
                      setShowDestinationResults(true);
                    }
                  }}
                  placeholder="Where are you going?"
                  className="input-style"
                  autoComplete="off"
                />

                {destinationLoading && (
                  <Loader2
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-cyan-500"
                  />
                )}
              </div>

              {showDestinationResults &&
                destinationResults.length > 0 && (
                  <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-xl">
                    {destinationResults.map((place) => (
                      <button
                        key={place.place_id}
                        type="button"
                        onClick={() => selectDestination(place)}
                        className="flex w-full items-center gap-3 border-b border-gray-100 dark:border-white/5 px-4 py-3 text-left text-sm text-gray-700 dark:text-white/80 hover:bg-cyan-50 dark:hover:bg-white/10 transition last:border-b-0"
                      >
                        <MapPin
                          size={16}
                          className="shrink-0 text-cyan-500"
                        />
                        <span>{place.display_name}</span>
                      </button>
                    ))}
                  </div>
                )}

              {!destinationLoading &&
                formData.destination.trim().length >= 2 &&
                showDestinationResults &&
                destinationResults.length === 0 && (
                  <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-500 dark:text-white/50 shadow-xl">
                    No destinations found.
                  </div>
                )}
            </div>
          </FormField>

          {/* Budget */}
          <FormField label="Budget" icon={<Wallet size={19} />}>
            <input
              required
              type="number"
              min="0"
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
              min="1"
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
              min={getTodayLocal()}
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
              min={formData.startDate || getTodayLocal()}
              className="input-style"
            />
          </FormField>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 dark:bg-red-500/10 dark:border-red-500/30 px-4 py-3 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/trips")}
            className="flex-1 rounded-xl border border-gray-300 dark:border-white/20 py-3.5 text-gray-700 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition"
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
