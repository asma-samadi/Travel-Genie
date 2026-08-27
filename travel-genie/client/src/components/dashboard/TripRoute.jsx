import { useEffect, useMemo, useState } from "react";

import {
  MapPin,
  Plane,
  Navigation,
  Route,
  CalendarDays,
  Users,
  ExternalLink,
} from "lucide-react";

import { useTrips } from "../../context/TripContext.jsx";

function TripRoute() {
  const { trips } = useTrips();

  const [locations, setLocations] = useState({
    origin: null,
    destination: null,
  });

  const [geocoding, setGeocoding] = useState(false);

  // ---------------------------------------------------------
  // Get today's date at midnight for accurate trip comparison
  // ---------------------------------------------------------

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  // ---------------------------------------------------------
  // Find the relevant trip:
  // 1. A trip currently happening today
  // 2. Otherwise, the nearest upcoming trip
  // ---------------------------------------------------------

  const currentTrip = useMemo(() => {
    if (!trips || trips.length === 0) return null;

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // 1. First, find a trip that is happening right now
    const activeTrip = trips.find((trip) => {
      const startDate = trip.dates?.start ? new Date(trip.dates.start) : null;

      const endDate = trip.dates?.end ? new Date(trip.dates.end) : null;

      if (!startDate || !endDate) return false;

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      return currentDate >= startDate && currentDate <= endDate;
    });

    if (activeTrip) return activeTrip;

    // 2. Otherwise, find the nearest upcoming trip
    const upcomingTrips = trips
      .filter((trip) => {
        if (!trip.dates?.start) return false;

        const startDate = new Date(trip.dates.start);
        startDate.setHours(0, 0, 0, 0);

        return startDate >= currentDate;
      })
      .sort(
        (a, b) =>
          new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime(),
      );

    if (upcomingTrips.length > 0) {
      return upcomingTrips[0];
    }

    // 3. If there are no upcoming trips, show the most recent trip
    return [...trips].sort((a, b) => {
      const dateA = new Date(a.created_at || a.createdAt || 0).getTime();

      const dateB = new Date(b.created_at || b.createdAt || 0).getTime();

      return dateB - dateA;
    })[0];
  }, [trips]);

  // ---------------------------------------------------------
// Get the real origin and destination from the selected trip
// ---------------------------------------------------------

const origin =
  currentTrip?.origin?.trim() ||
  currentTrip?.startingLocation?.trim() ||
  currentTrip?.from?.trim() ||
  "";

const destination =
  currentTrip?.destination?.trim() ||
  currentTrip?.to?.trim() ||
  "";

const displayOrigin = origin || "Starting location";
const displayDestination = destination || "Destination";

// Get departure date and travelers from the selected trip
const departureDate =
  currentTrip?.dates?.start ||
  currentTrip?.start_date ||
  "";

const travelers = currentTrip?.travelers ?? 1;

// Official Kam Air booking website
const kamAirBookingUrl = "https://www.kamair.com/";

  // ---------------------------------------------------------
  // Geocode the real origin and destination
  // ---------------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    async function geocodeLocations() {
      if (!origin || !destination) {
        setLocations({
          origin: null,
          destination: null,
        });

        setGeocoding(false);
        return;
      }

      setGeocoding(true);

      try {
        const geocode = async (place) => {
          const url =
            "https://nominatim.openstreetmap.org/search" +
            `?format=jsonv2&limit=1&q=${encodeURIComponent(place)}`;

          const response = await fetch(url, {
            headers: {
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Geocoding failed for ${place}`);
          }

          const data = await response.json();

          if (!data || data.length === 0) {
            return null;
          }

          return {
            lat: Number(data[0].lat),
            lon: Number(data[0].lon),
            displayName: data[0].display_name,
          };
        };

        const [originLocation, destinationLocation] = await Promise.all([
          geocode(origin),
          geocode(destination),
        ]);

        if (!cancelled) {
          setLocations({
            origin: originLocation,
            destination: destinationLocation,
          });
        }
      } catch (error) {
        console.error("Error geocoding trip route:", error);

        if (!cancelled) {
          setLocations({
            origin: null,
            destination: null,
          });
        }
      } finally {
        if (!cancelled) {
          setGeocoding(false);
        }
      }
    }

    geocodeLocations();

    return () => {
      cancelled = true;
    };
  }, [origin, destination]);

  // ---------------------------------------------------------
  // Calculate real geographic distance using Haversine formula
  // ---------------------------------------------------------

  const distance = useMemo(() => {
    if (!locations.origin || !locations.destination) {
      return null;
    }

    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const earthRadiusKm = 6371;

    const lat1 = toRadians(locations.origin.lat);
    const lat2 = toRadians(locations.destination.lat);

    const deltaLat = toRadians(
      locations.destination.lat - locations.origin.lat,
    );

    const deltaLon = toRadians(
      locations.destination.lon - locations.origin.lon,
    );

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
  }, [locations]);

  const formattedDistance = useMemo(() => {
    if (distance === null) return null;

    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`;
    }

    return `${Math.round(distance).toLocaleString()} km`;
  }, [distance]);

  // ---------------------------------------------------------
  // Format trip departure date
  // ---------------------------------------------------------

  const formattedDepartureDate = useMemo(() => {
    if (!departureDate) return "Date unavailable";

    const date = new Date(`${departureDate}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [departureDate]);

  // ---------------------------------------------------------
  // Empty state
  // ---------------------------------------------------------

  if (!currentTrip) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 text-blue-600 dark:text-cyan-400">
          <Plane size={34} strokeWidth={2} />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
          No upcoming journey
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-white/50">
          Create a trip with travel dates to see your current or nearest
          upcoming route.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-center py-5">
      {/* Flight Route */}
      <div className="relative mx-auto h-[190px] w-full max-w-2xl px-4 sm:px-8">
        {/* Origin */}
        <div className="absolute left-2 top-[112px] z-20 flex flex-col items-center sm:left-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20 dark:border-gray-800">
            <Navigation size={19} />
          </div>

          <div className="mt-3 max-w-[110px] text-center sm:max-w-[140px]">
            <p
              title={origin}
              className="truncate bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-sm font-semibold text-transparent"
            >
              {origin}
            </p>

            <p className="mt-1 text-[11px] text-gray-500 dark:text-white/50">
              Departure
            </p>
          </div>
        </div>

        {/* Destination */}
        <div className="absolute right-2 top-[20px] z-20 flex flex-col items-center sm:right-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/20 dark:border-gray-800">
            <MapPin size={19} />
          </div>

          <div className="mt-3 max-w-[110px] text-center sm:max-w-[140px]">
            <p
              title={destination}
              className="truncate bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-sm font-semibold text-transparent"
            >
              {destination}
            </p>

            <p className="mt-1 text-[11px] text-gray-500 dark:text-white/50">
              Destination
            </p>
          </div>
        </div>

        {/* Curved Flight Path */}
        <svg
          viewBox="0 0 600 190"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <path
            d="M 65 130 C 180 185, 390 15, 535 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            className="text-blue-600/5 dark:text-cyan-400/5"
          />

          <path
            d="M 65 130 C 180 185, 390 15, 535 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="7 8"
            className="text-blue-600/60 dark:text-cyan-400/60"
          />

          <circle
            cx="185"
            cy="145"
            r="3"
            fill="currentColor"
            className="text-blue-600/30 dark:text-cyan-400/30"
          />

          <circle
            cx="300"
            cy="105"
            r="3"
            fill="currentColor"
            className="text-blue-600/30 dark:text-cyan-400/30"
          />

          <circle
            cx="420"
            cy="58"
            r="3"
            fill="currentColor"
            className="text-blue-600/30 dark:text-cyan-400/30"
          />
        </svg>

        {/* Flying Airplane */}
        <div className="pointer-events-none absolute inset-0">
          <div className="flight-plane">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-blue-600/10 dark:bg-gray-800 dark:ring-cyan-400/10">
              <Plane
                size={23}
                className="rotate-[18deg] text-blue-600 dark:text-cyan-400"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Route Information */}
      <div className="mt-2 grid grid-cols-2 gap-3 sm:mx-auto sm:max-w-md">
        <div className="rounded-2xl bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 px-4 py-3 text-center">
          <p className="text-[11px] text-gray-500 dark:text-white/50">FROM</p>

          <p
            title={origin}
            className="mt-1 truncate bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-sm font-semibold text-transparent"
          >
            {origin}
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 px-4 py-3 text-center">
          <p className="text-[11px] text-gray-500 dark:text-white/50">TO</p>

          <p
            title={destination}
            className="mt-1 truncate bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-sm font-semibold text-transparent"
          >
            {destination}
          </p>
        </div>
      </div>

      {/* Distance */}
      <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 px-4 py-2">
        <Route size={14} className="text-blue-600 dark:text-cyan-400" />

        <span className="text-xs font-medium text-gray-600 dark:text-white/60">
          {geocoding
            ? "Calculating distance..."
            : formattedDistance
              ? `${formattedDistance} away`
              : "Distance unavailable"}
        </span>
      </div>

      {/* Kam Air Flight Information */}
      <div className="mx-auto mt-4 w-full max-w-md rounded-2xl bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20">
              <Plane size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Kam Air
              </p>

              <p className="text-[11px] text-gray-500 dark:text-white/50">
                Flight availability & fare
              </p>
            </div>
          </div>

          <a
            href={kamAirBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 px-3 py-2 text-xs font-semibold text-white shadow-md transition hover:scale-[1.02]"
          >
            Book Ticket
            <ExternalLink size={13} />
          </a>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white/60 px-3 py-2 dark:bg-white/5">
            <CalendarDays
              size={15}
              className="shrink-0 text-blue-600 dark:text-cyan-400"
            />

            <div className="min-w-0">
              <p className="text-[10px] text-gray-500 dark:text-white/50">
                Departure
              </p>
              <p className="truncate text-xs font-medium text-gray-700 dark:text-white/80">
                {formattedDepartureDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/60 px-3 py-2 dark:bg-white/5">
            <Users
              size={15}
              className="shrink-0 text-blue-600 dark:text-cyan-400"
            />

            <div>
              <p className="text-[10px] text-gray-500 dark:text-white/50">
                Travelers
              </p>
              <p className="text-xs font-medium text-gray-700 dark:text-white/80">
                {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-3 text-center text-[11px] text-gray-500 dark:text-white/45">
          Check the official booking page for live flight availability and
          current ticket prices.
        </p>
      </div>

      {/* Airplane Animation */}
      <style>{`
        .flight-plane {
          position: absolute;
          width: 44px;
          height: 44px;
          left: 0;
          top: 0;
          offset-path: path("M 65 130 C 180 185, 390 15, 535 45");
          offset-distance: 5%;
          offset-rotate: auto;
          animation: flightRoute 5s ease-in-out infinite;
        }

        @keyframes flightRoute {
          0% {
            offset-distance: 5%;
          }

          50% {
            offset-distance: 50%;
          }

          100% {
            offset-distance: 95%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .flight-plane {
            animation: none;
            offset-distance: 50%;
          }
        }
      `}</style>
    </div>
  );
}

export default TripRoute;
