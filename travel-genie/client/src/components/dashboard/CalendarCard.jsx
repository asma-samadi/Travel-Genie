import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTrips } from "../../context/TripContext.jsx";

function CalendarCard() {
  const { trips } = useTrips();

  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();

  // =====================================================
  // GET TRIP START DATE
  // =====================================================

  const getTripStartDate = (trip) =>
    trip.startDate ||
    trip.start_date ||
    trip.start ||
    trip.departureDate ||
    trip.departure_date ||
    trip.dates?.start ||
    null;

  // =====================================================
  // GET TRIP END DATE
  // =====================================================

  const getTripEndDate = (trip) =>
    trip.endDate ||
    trip.end_date ||
    trip.end ||
    trip.returnDate ||
    trip.return_date ||
    trip.dates?.end ||
    null;

  // =====================================================
  // PREPARE TRIP DATE RANGES
  // =====================================================

  const tripRanges = useMemo(() => {
    if (!Array.isArray(trips)) return [];

    return trips
      .map((trip) => {
        const startValue = getTripStartDate(trip);
        const endValue = getTripEndDate(trip);

        if (!startValue) return null;

        const start = new Date(startValue);

        const end = endValue ? new Date(endValue) : new Date(startValue);

        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
          return null;
        }

        // Remove time for accurate date comparison
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        return {
          id: trip.id,
          start,
          end: end < start ? start : end,
        };
      })
      .filter(Boolean);
  }, [trips]);

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handlePreviousMonth = () => {
    setCurrentDate(
      (previousDate) =>
        new Date(previousDate.getFullYear(), previousDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (previousDate) =>
        new Date(previousDate.getFullYear(), previousDate.getMonth() + 1, 1),
    );
  };

  // =====================================================
  // DATE HELPERS
  // =====================================================

  const isSameDate = (dateA, dateB) =>
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate();

  // =====================================================
  // GET DATE STATUS
  // =====================================================

  const getDateStatus = (day) => {
    const date = new Date(year, month, day);

    date.setHours(0, 0, 0, 0);

    for (const trip of tripRanges) {
      const isStart = isSameDate(date, trip.start);
      const isEnd = isSameDate(date, trip.end);

      // One-day trip
      if (isStart && isEnd) {
        return "single";
      }

      // Trip start
      if (isStart) {
        return "start";
      }

      // Trip end
      if (isEnd) {
        return "end";
      }

      // Dates between start and end
      if (date > trip.start && date < trip.end) {
        return "between";
      }
    }

    return null;
  };

  // =====================================================
  // TODAY
  // =====================================================

  const isToday = (day) => {
    const date = new Date(year, month, day);

    return isSameDate(date, today);
  };

  // =====================================================
  // CALENDAR CELLS
  // =====================================================

  const calendarCells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  return (
    <section
      className="
    relative
    h-full
    min-h-[220px]
    overflow-hidden
    rounded-[28px]

    border
    border-white/50

    bg-[#B8C0C5]

    px-4
    py-3

    shadow-[0_8px_30px_rgba(0,0,0,0.05)]

    backdrop-blur-xl

    dark:border-white/10
    dark:bg-white/[0.06]
  "
    >
      {/* =====================================================
          GLASS HIGHLIGHT
      ===================================================== */}

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

      <div className="relative flex h-full flex-col">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex shrink-0 items-center justify-between">
          <div>
            <h3
              className="
                text-sm
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              Travel Calendar
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
              {monthNames[month]} {year}
            </p>
          </div>

          {/* Navigation */}

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePreviousMonth}
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full

                border
                border-gray-200

                bg-gray-50

                text-gray-600

                transition

                hover:bg-gray-100

                active:scale-90

                dark:border-white/10
                dark:bg-white/5
                dark:text-white/60
                dark:hover:bg-white/10
              "
              aria-label="Previous month"
            >
              <ChevronLeft size={13} />
            </button>

            <button
              type="button"
              onClick={handleNextMonth}
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full

                border
                border-gray-200

                bg-gray-50

                text-gray-600

                transition

                hover:bg-gray-100

                active:scale-90

                dark:border-white/10
                dark:bg-white/5
                dark:text-white/60
                dark:hover:bg-white/10
              "
              aria-label="Next month"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* =====================================================
            CALENDAR
        ===================================================== */}

        <div className="mt-3 flex min-h-0 flex-1 flex-col">
          {/* Weekdays */}

          <div className="grid grid-cols-7 pb-1 text-center">
            {days.map((day, index) => (
              <span
                key={`${day}-${index}`}
                className="
                  text-[8px]
                  font-semibold
                  text-gray-400
                  dark:text-white/35
                "
              >
                {day}
              </span>
            ))}
          </div>

          {/* Dates */}

          <div
            className="
              mt-1
              grid
              flex-1
              grid-cols-7
              grid-rows-6
              text-center
            "
          >
            {Array.from({ length: 42 }, (_, index) => {
              const day = calendarCells[index];

              if (!day) {
                return <span key={`empty-${index}`} />;
              }

              const status = getDateStatus(day);
              const todayDate = isToday(day);

              return (
                <button
                  key={day}
                  type="button"
                  className={`
                    relative
                    flex
                    min-h-[22px]
                    items-center
                    justify-center

                    text-[9px]
                    font-medium

                    transition

                    active:scale-90

                    ${
                      status === "between"
                        ? `
                          bg-gradient-to-r
                          from-cyan-500/10
                          via-blue-500/10
                          to-purple-500/10

                          text-blue-700

                          dark:text-cyan-300
                        `
                        : ""
                    }

                    ${
                      status === "start"
                        ? `
                          rounded-l-full

                          bg-gradient-to-r
                          from-cyan-500
                          via-blue-500
                          to-purple-500

                          text-white

                          shadow-[0_3px_10px_rgba(59,130,246,0.25)]
                        `
                        : ""
                    }

                    ${
                      status === "end"
                        ? `
                          rounded-r-full

                          bg-gradient-to-r
                          from-cyan-500
                          via-blue-500
                          to-purple-500

                          text-white

                          shadow-[0_3px_10px_rgba(139,92,246,0.25)]
                        `
                        : ""
                    }

                    ${
                      status === "single"
                        ? `
                          rounded-full

                          bg-gradient-to-r
                          from-cyan-500
                          via-blue-500
                          to-purple-500

                          text-white

                          shadow-[0_3px_10px_rgba(59,130,246,0.25)]
                        `
                        : ""
                    }

                    ${
                      !status && todayDate
                        ? `
                          rounded-full

                          border
                          border-[#00B1E2]

                          text-[#009AC5]

                          dark:text-cyan-300
                        `
                        : ""
                    }

                    ${
                      !status && !todayDate
                        ? `
                          rounded-full

                          text-gray-700

                          hover:bg-gray-100

                          dark:text-white/70
                          dark:hover:bg-white/10
                        `
                        : ""
                    }
                  `}
                  aria-label={`${monthNames[month]} ${day}, ${year}`}
                >
                  {day}

                  {/* =================================================
                      TODAY DOT INSIDE A TRIP
                  ================================================= */}

                  {todayDate && status && (
                    <span
                      className="
                        absolute
                        bottom-0.5
                        h-1
                        w-1
                        rounded-full
                        bg-white
                      "
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CalendarCard;
