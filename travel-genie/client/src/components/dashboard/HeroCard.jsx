import { useEffect, useMemo, useState } from "react";
import { MapPin, CalendarDays, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../../context/TripContext.jsx";

function HeroCard() {
  const navigate = useNavigate();
  const { trips, loading } = useTrips();

  const [backgroundImage, setBackgroundImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  // ======================================================
  // DATE HELPERS
  // ======================================================

  const getStartDate = (trip) => {
    return (
      trip?.dates?.start ||
      trip?.startDate ||
      trip?.start_date ||
      trip?.date ||
      trip?.start ||
      null
    );
  };

  const getEndDate = (trip) => {
    return (
      trip?.dates?.end ||
      trip?.endDate ||
      trip?.end_date ||
      trip?.returnDate ||
      trip?.return_date ||
      trip?.end ||
      null
    );
  };

  const parseDate = (value) => {
    if (!value) return null;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    date.setHours(0, 0, 0, 0);

    return date;
  };

  // ======================================================
  // GET ACTIVE / NEAREST TRIP
  //
  // Priority:
  // 1. Currently active trip
  // 2. Nearest upcoming trip
  // 3. Most recent past trip
  // ======================================================

  const heroTrip = useMemo(() => {
    if (!Array.isArray(trips) || trips.length === 0) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const validTrips = trips
      .map((trip) => {
        const start = parseDate(getStartDate(trip));
        const end = parseDate(getEndDate(trip)) || start;

        if (!start) {
          return null;
        }

        return {
          ...trip,
          parsedStart: start,
          parsedEnd: end,
        };
      })
      .filter(Boolean);

    // ------------------------------------------------------
    // 1. CURRENTLY ACTIVE TRIP
    // ------------------------------------------------------

    const activeTrips = validTrips
      .filter((trip) => trip.parsedStart <= today && trip.parsedEnd >= today)
      .sort((a, b) => a.parsedStart - b.parsedStart);

    if (activeTrips.length > 0) {
      return activeTrips[0];
    }

    // ------------------------------------------------------
    // 2. NEXT UPCOMING TRIP
    // ------------------------------------------------------

    const upcomingTrips = validTrips
      .filter((trip) => trip.parsedStart > today)
      .sort((a, b) => a.parsedStart - b.parsedStart);

    if (upcomingTrips.length > 0) {
      return upcomingTrips[0];
    }

    // ------------------------------------------------------
    // 3. NO FUTURE TRIP
    // SHOW MOST RECENT PAST TRIP
    // ------------------------------------------------------

    const pastTrips = validTrips
      .filter((trip) => trip.parsedStart <= today)
      .sort((a, b) => b.parsedStart - a.parsedStart);

    return pastTrips[0] || null;
  }, [trips]);

  // ======================================================
  // DETERMINE TRIP STATUS
  // ======================================================

  const tripStatus = useMemo(() => {
    if (!heroTrip) return "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (heroTrip.parsedStart <= today && heroTrip.parsedEnd >= today) {
      return "Active now";
    }

    if (heroTrip.parsedStart > today) {
      return "Upcoming trip";
    }

    return "Recent trip";
  }, [heroTrip]);

  // ======================================================
  // LOAD REAL DESTINATION IMAGE
  // ======================================================

  useEffect(() => {
    const loadDestinationImage = async () => {
      if (!heroTrip?.destination) {
        setBackgroundImage("");
        setImageLoading(false);
        return;
      }

      try {
        setImageLoading(true);
        setBackgroundImage("");

        const destination = heroTrip.destination;

        const response = await fetch(
          `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
            `${destination} landmark travel`,
          )}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json&origin=*`,
        );

        if (!response.ok) {
          throw new Error("Failed to load destination image.");
        }

        const data = await response.json();

        const pages = data?.query?.pages ? Object.values(data.query.pages) : [];

        const image = pages.find((page) => {
          const url = page?.imageinfo?.[0]?.thumburl || "";

          const title = page?.title?.toLowerCase() || "";

          return (
            url &&
            !title.includes(".svg") &&
            !title.includes("flag") &&
            !title.includes("map") &&
            !title.includes("logo") &&
            !title.includes("icon")
          );
        });

        if (image?.imageinfo?.[0]?.thumburl) {
          setBackgroundImage(image.imageinfo[0].thumburl);
        }
      } catch (error) {
        console.error("Failed to load destination image:", error);

        setBackgroundImage("");
      } finally {
        setImageLoading(false);
      }
    };

    loadDestinationImage();
  }, [heroTrip?.destination]);

  // ======================================================
  // LOADING STATE
  // ======================================================

  if (loading) {
    return (
      <div className="h-[300px] animate-pulse rounded-3xl bg-gray-200 dark:bg-white/10" />
    );
  }

  // ======================================================
  // NO TRIPS
  // ======================================================

  if (!heroTrip) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 p-6 text-white sm:p-8">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-md">
            <Sparkles size={16} />
            Welcome to TravelGenie
          </div>

          <h1 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
            Your next adventure starts here ✈️
          </h1>

          <p className="mt-3 max-w-xl text-white/80">
            Create a trip and let TravelGenie help you plan an unforgettable
            journey.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/create-trip")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-cyan-600 transition hover:scale-105"
          >
            Plan a Trip
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ======================================================
  // DISPLAY DATES
  // ======================================================

  const startDate = getStartDate(heroTrip) || "No date";

  const endDate = getEndDate(heroTrip) || startDate;

  // ======================================================
  // HERO CARD
  // ======================================================

  return (
    <section
      onClick={() => navigate(`/dashboard/trips/${heroTrip.id}`)}
      className="
        relative
        min-h-[300px]
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        shadow-xl
        transition
        hover:scale-[1.01]
      "
    >
      {/* REAL DESTINATION IMAGE */}

      {backgroundImage && (
        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
            transition-opacity
            duration-500
          "
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      )}

      {/* FALLBACK */}

      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700" />
      )}

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/10 via-transparent to-purple-950/20" />

      {/* CONTENT */}

      <div className="relative z-10 flex min-h-[300px] flex-col justify-between p-6 sm:p-8">
        <div>
          {/* STATUS */}

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md">
            <MapPin size={16} />

            {tripStatus}
          </div>

          {/* TITLE */}

          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {heroTrip.title || heroTrip.destination}
          </h1>

          {/* DESTINATION */}

          <div className="mt-3 flex items-center gap-2 text-sm text-white/85 sm:text-base">
            <MapPin size={18} className="shrink-0" />

            <span>{heroTrip.destination}</span>
          </div>
        </div>

        {/* DATE */}

        <div className="mt-8 flex items-center gap-2 text-sm text-white/90">
          <CalendarDays size={18} />

          <span>
            {formatDate(startDate)} — {formatDate(endDate)}
          </span>
        </div>

        {imageLoading && !backgroundImage && (
          <div className="absolute bottom-4 right-5 text-xs text-white/60">
            Finding destination photo...
          </div>
        )}
      </div>
    </section>
  );
}

// ======================================================
// FORMAT DATE
// ======================================================

function formatDate(value) {
  if (!value) return "No date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default HeroCard;
