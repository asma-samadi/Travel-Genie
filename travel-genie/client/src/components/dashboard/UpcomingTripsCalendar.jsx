import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  MapPin,
  Plane,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useTrips } from "../../context/TripContext.jsx";

function UpcomingTripsCalendar() {
  const { trips, loading } = useTrips();

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [selectedTrip, setSelectedTrip] = useState(null);

  // ======================================================
  // MONTH INFORMATION
  // ======================================================

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // ======================================================
  // TRIP DATE HELPER
  // ======================================================

  const getTripDate = (trip) => {
    return trip.startDate || trip.start_date || trip.date || trip.start || null;
  };

  // ======================================================
  // TRIPS WITH VALID DATES
  // ======================================================

  const tripsWithDates = useMemo(() => {
    if (!Array.isArray(trips)) return [];

    return trips
      .map((trip) => {
        const dateValue = getTripDate(trip);

        if (!dateValue) return null;

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
          return null;
        }

        return {
          ...trip,
          parsedDate: date,
        };
      })
      .filter(Boolean);
  }, [trips]);

  // ======================================================
  // TRIPS FOR CURRENT MONTH
  // ======================================================

  const monthTrips = useMemo(() => {
    return tripsWithDates.filter((trip) => {
      return (
        trip.parsedDate.getFullYear() === year &&
        trip.parsedDate.getMonth() === month
      );
    });
  }, [tripsWithDates, year, month]);

  // ======================================================
  // UPCOMING TRIPS
  // ======================================================

  const upcomingTrips = useMemo(() => {
    const now = new Date();

    return tripsWithDates
      .filter((trip) => trip.parsedDate >= now)
      .sort((a, b) => a.parsedDate - b.parsedDate)
      .slice(0, 3);
  }, [tripsWithDates]);

  // ======================================================
  // CHANGE MONTH
  // ======================================================

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  // ======================================================
  // CHECK TODAY
  // ======================================================

  const isToday = (day) => {
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  // ======================================================
  // FIND TRIP FOR DAY
  // ======================================================

  const getTripForDay = (day) => {
    return monthTrips.find((trip) => trip.parsedDate.getDate() === day);
  };

  // ======================================================
  // CALENDAR DAYS
  // ======================================================

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <section className="mt-8">
      {/* ==================================================
          MINIMAL HEADER
          ================================================== */}

      <div className="mb-4 flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-2xl
            bg-[#00B1E2]/10
            text-[#00B1E2]
            dark:bg-cyan-500/10
            dark:text-cyan-400
          "
        >
          <CalendarDays size={19} />
        </div>

        <div>
          <h2
            className="
              text-base
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            Travel Calendar
          </h2>

          <p
            className="
              mt-0.5
              text-[11px]
              font-medium
              text-gray-500
              dark:text-white/50
            "
          >
            Upcoming trips
          </p>
        </div>
      </div>

      {/* ==================================================
          MAIN CONTENT
          ================================================== */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        {/* ==================================================
            CALENDAR
            ================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-white/40
            bg-[#B8C0C5]/25
            px-5
            py-4
            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-white/[0.06]
          "
        >
          {/* Glass highlight */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-br
              from-white/20
              via-transparent
              to-transparent
              dark:from-white/[0.03]
            "
          />

          <div className="relative">
            {/* Month Navigation */}

            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={previousMonth}
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/40
                  bg-white/20
                  text-gray-500
                  transition
                  hover:bg-white/40
                  active:scale-90
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white/60
                  dark:hover:bg-white/10
                "
                aria-label="Previous month"
              >
                <ChevronLeft size={14} />
              </button>

              <h3
                className="
                  text-sm
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                {monthName}
              </h3>

              <button
                type="button"
                onClick={nextMonth}
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/40
                  bg-white/20
                  text-gray-500
                  transition
                  hover:bg-white/40
                  active:scale-90
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-white/60
                  dark:hover:bg-white/10
                "
                aria-label="Next month"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Weekdays */}

            <div className="mb-1 grid grid-cols-7">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div
                  key={`${day}-${index}`}
                  className="
                      py-1
                      text-center
                      text-[9px]
                      font-medium
                      text-gray-400
                      dark:text-white/35
                    "
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar */}

            <div className="grid grid-cols-7 gap-y-1">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return (
                    <div key={`empty-${index}`} className="aspect-square" />
                  );
                }

                const trip = getTripForDay(day);
                const todayDay = isToday(day);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      if (trip) {
                        setSelectedTrip(trip);
                      }
                    }}
                    className={`
                      relative
                      flex
                      aspect-square
                      items-center
                      justify-center
                      rounded-full
                      text-[10px]
                      font-medium
                      transition
                      active:scale-90

                      ${
                        todayDay
                          ? "bg-[#00B1E2] font-bold text-white shadow-sm"
                          : "text-gray-600 hover:bg-white/40 dark:text-white/70 dark:hover:bg-white/10"
                      }

                      ${trip && !todayDay ? "ring-1 ring-[#00B1E2]/50" : ""}
                    `}
                    aria-label={`${monthName} ${day}`}
                  >
                    {day}

                    {trip && (
                      <span
                        className={`
                          absolute
                          bottom-1
                          h-1
                          w-1
                          rounded-full
                          ${todayDay ? "bg-white" : "bg-[#00B1E2]"}
                        `}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Trip */}

            {selectedTrip && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  mt-4
                  rounded-2xl
                  border
                  border-[#00B1E2]/20
                  bg-[#00B1E2]/5
                  px-3
                  py-2.5
                  dark:bg-cyan-500/10
                "
              >
                <div className="flex items-center gap-2">
                  <Plane
                    size={15}
                    className="shrink-0 text-[#00B1E2] dark:text-cyan-400"
                  />

                  <div className="min-w-0">
                    <p
                      className="
                        truncate
                        text-xs
                        font-semibold
                        text-gray-800
                        dark:text-white
                      "
                    >
                      {selectedTrip.destination || "Travel Adventure"}
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[10px]
                        text-gray-500
                        dark:text-white/50
                      "
                    >
                      {selectedTrip.parsedDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* ==================================================
            UPCOMING TRIPS
            ================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-white/40
            bg-[#B8C0C5]/25
            px-5
            py-4
            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-white/[0.06]
          "
        >
          {/* Glass highlight */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-br
              from-white/20
              via-transparent
              to-transparent
              dark:from-white/[0.03]
            "
          />

          <div className="relative">
            {/* Minimal Header */}

            <div className="mb-4">
              <h3
                className="
                  text-sm
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                Upcoming Trips
              </h3>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  font-medium
                  text-gray-500
                  dark:text-white/50
                "
              >
                Next adventures
              </p>
            </div>

            {/* Loading */}

            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="
                      h-14
                      animate-pulse
                      rounded-2xl
                      bg-white/30
                      dark:bg-white/5
                    "
                  />
                ))}
              </div>
            ) : upcomingTrips.length === 0 ? (
              <div className="flex min-h-[150px] items-center justify-center">
                <div className="text-center">
                  <CalendarDays
                    size={24}
                    className="
                      mx-auto
                      text-gray-400
                      dark:text-white/20
                    "
                  />

                  <p
                    className="
                      mt-2
                      text-[10px]
                      text-gray-500
                      dark:text-white/40
                    "
                  >
                    No upcoming trips
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {upcomingTrips.map((trip) => (
                  <button
                    key={trip.id}
                    type="button"
                    onClick={() => {
                      setSelectedTrip(trip);

                      setCurrentMonth(
                        new Date(
                          trip.parsedDate.getFullYear(),
                          trip.parsedDate.getMonth(),
                          1,
                        ),
                      );
                    }}
                    className="
                      group
                      w-full
                      rounded-2xl
                      border
                      border-white/40
                      bg-white/20
                      p-3
                      text-left
                      transition
                      hover:-translate-y-0.5
                      hover:bg-white/40
                      hover:shadow-sm
                      dark:border-white/10
                      dark:bg-white/5
                      dark:hover:bg-white/10
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#00B1E2]/10
                          text-[#00B1E2]
                          dark:bg-cyan-500/10
                          dark:text-cyan-400
                        "
                      >
                        <MapPin size={16} />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            text-xs
                            font-semibold
                            text-gray-800
                            dark:text-white
                          "
                        >
                          {trip.destination || "Travel Adventure"}
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-[10px]
                            text-gray-500
                            dark:text-white/45
                          "
                        >
                          {trip.parsedDate.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpcomingTripsCalendar;
