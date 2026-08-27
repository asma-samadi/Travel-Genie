import { useEffect, useMemo, useState } from "react";
import {
  CloudSun,
  MapPin,
  Thermometer,
  Wind,
  Droplets,
  Navigation,
} from "lucide-react";

import { useTrips } from "../../context/TripContext.jsx";

function getWeatherDescription(weatherCode) {
  const weatherCodes = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mainly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁️" },
    45: { label: "Foggy", icon: "🌫️" },
    48: { label: "Foggy", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    53: { label: "Drizzle", icon: "🌦️" },
    55: { label: "Heavy drizzle", icon: "🌧️" },
    61: { label: "Light rain", icon: "🌦️" },
    63: { label: "Rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "🌧️" },
    71: { label: "Light snow", icon: "🌨️" },
    73: { label: "Snow", icon: "🌨️" },
    75: { label: "Heavy snow", icon: "❄️" },
    80: { label: "Rain showers", icon: "🌦️" },
    81: { label: "Rain showers", icon: "🌧️" },
    82: { label: "Heavy showers", icon: "⛈️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
    96: { label: "Thunderstorm", icon: "⛈️" },
    99: { label: "Thunderstorm", icon: "⛈️" },
  };

  return (
    weatherCodes[weatherCode] || {
      label: "Weather update",
      icon: "🌤️",
    }
  );
}

function getTripDate(trip) {
  const date = trip?.dates?.start || trip?.start_date;

  if (!date) return null;

  const parsedDate = new Date(date);

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function WeatherCard() {
  const { trips, loading: tripsLoading } = useTrips();

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  // Find the nearest upcoming trip.
  // If there is no upcoming trip, use the most recently added trip.
  const selectedTrip = useMemo(() => {
    if (!trips || trips.length === 0) return null;

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const upcomingTrips = trips
      .map((trip, index) => ({
        trip,
        date: getTripDate(trip),
        index,
      }))
      .filter(({ date }) => date && date >= now)
      .sort((a, b) => a.date - b.date);

    if (upcomingTrips.length > 0) {
      return upcomingTrips[0].trip;
    }

    // Fallback: use the last trip in the list as the most recently added trip.
    return trips[trips.length - 1];
  }, [trips]);

  useEffect(() => {
    if (!selectedTrip?.destination) {
      setWeather(null);
      setWeatherError("");
      return;
    }

    const controller = new AbortController();

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setWeatherError("");

        // Step 1: Convert the destination name into coordinates.
        const locationResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            selectedTrip.destination,
          )}&count=1&language=en&format=json`,
          { signal: controller.signal },
        );

        if (!locationResponse.ok) {
          throw new Error("Could not find the destination.");
        }

        const locationData = await locationResponse.json();
        const location = locationData.results?.[0];

        if (!location) {
          throw new Error("Destination not found.");
        }

        // Step 2: Fetch the current weather for those coordinates.
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`,
          { signal: controller.signal },
        );

        if (!weatherResponse.ok) {
          throw new Error("Could not load weather information.");
        }

        const weatherData = await weatherResponse.json();

        setWeather({
          ...weatherData.current,
          locationName: location.name,
          country: location.country,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Weather error:", error);
          setWeather(null);
          setWeatherError("Unable to load weather right now.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchWeather();

    return () => controller.abort();
  }, [selectedTrip]);

  const weatherInfo = weather
    ? getWeatherDescription(weather.weather_code)
    : null;

  return (
    <section
      className="
        relative
        min-h-0
        overflow-hidden
        rounded-[28px]
        border
        border-gray-200/70
        bg-white/80
        p-5
        shadow-[0_8px_30px_rgba(0,0,0,0.04)]
        backdrop-blur-xl
        dark:border-white/10
        dark:bg-white/5
      "
    >
      {/* Decorative background */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-10
          -right-10
          h-28
          w-28
          rounded-full
          bg-cyan-400/10
          blur-2xl
        "
      />

      {/* Header */}
      <div className="relative flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-cyan-500/10
            text-cyan-500
          "
        >
          <CloudSun size={19} />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
            Weather
          </h2>

          <p className="mt-0.5 text-[11px] text-gray-500 dark:text-white/50">
            {selectedTrip?.destination
              ? `Weather for your ${getTripDate(selectedTrip) ? "next" : "recent"} trip`
              : "Destination forecast"}
          </p>
        </div>
      </div>

      {/* Loading state */}
      {(tripsLoading || loading) && (
        <div className="relative mt-5 flex items-center justify-center">
          <p className="text-xs text-gray-400 dark:text-white/40">
            Loading weather...
          </p>
        </div>
      )}

      {/* No trips */}
      {!tripsLoading && !loading && !selectedTrip && (
        <div className="relative mt-5 flex items-center justify-center">
          <p className="text-center text-xs text-gray-400 dark:text-white/40">
            Create a trip to see weather for your destination.
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && weatherError && (
        <div className="relative mt-5 flex items-center justify-center">
          <p className="text-center text-xs text-red-500">{weatherError}</p>
        </div>
      )}

      {/* Weather information */}
      {!loading && weather && (
        <div className="relative mt-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-white/60">
                <MapPin size={13} />
                <span className="truncate text-xs">
                  {weather.locationName}
                  {weather.country ? `, ${weather.country}` : ""}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-3xl">{weatherInfo.icon}</span>

                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round(weather.temperature_2m)}°
                  </p>

                  <p className="text-[11px] text-gray-500 dark:text-white/50">
                    {weatherInfo.label}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="
                rounded-2xl
                bg-gray-50/80
                p-3
                dark:bg-white/5
              "
            >
              <Thermometer size={20} className="text-cyan-500" />
            </div>
          </div>

          {/* Weather details */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-gray-50/80 px-2 py-2 text-center dark:bg-white/5">
              <Droplets size={14} className="mx-auto text-cyan-500" />
              <p className="mt-1 text-[10px] text-gray-500 dark:text-white/50">
                Humidity
              </p>
              <p className="text-xs font-semibold text-gray-800 dark:text-white">
                {weather.relative_humidity_2m}%
              </p>
            </div>

            <div className="rounded-xl bg-gray-50/80 px-2 py-2 text-center dark:bg-white/5">
              <Wind size={14} className="mx-auto text-cyan-500" />
              <p className="mt-1 text-[10px] text-gray-500 dark:text-white/50">
                Wind
              </p>
              <p className="text-xs font-semibold text-gray-800 dark:text-white">
                {Math.round(weather.wind_speed_10m)} km/h
              </p>
            </div>

            <div className="rounded-xl bg-gray-50/80 px-2 py-2 text-center dark:bg-white/5">
              <Navigation size={14} className="mx-auto text-cyan-500" />
              <p className="mt-1 text-[10px] text-gray-500 dark:text-white/50">
                Feels like
              </p>
              <p className="text-xs font-semibold text-gray-800 dark:text-white">
                {Math.round(weather.apparent_temperature)}°
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default WeatherCard;
