import {
  CalendarDays,
  Plane,
  CloudSun,
  MessageCircle,
  MapPin,
  Compass,
} from "lucide-react";

import HeroCard from "../../components/dashboard/HeroCard";
import ExchangeCard from "../../components/dashboard/ExchangeCard.jsx";
import CalendarCard from "../../components/dashboard/CalendarCard.jsx";
import UpcomingTrips from "../../components/dashboard/UpcomingTrips.jsx";
import TripRoute from "../../components/dashboard/TripRoute.jsx";
import WeatherCard from "../../components/dashboard/WeatherCard.jsx";
import MessagesCard from "../../components/dashboard/MessagesCard.jsx";

function Dashboard() {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-4">
        {/* =====================================================
      TOP ROW
      Exchange | Calendar | Current Trip
      ===================================================== */}

        <div
          className="
      grid
      grid-cols-1
      gap-4
      lg:grid-cols-3
      lg:items-stretch
    "
        >
          {/* Exchange */}
          <div className="min-w-0 lg:h-[250px]">
            <ExchangeCard />
          </div>

          {/* Calendar */}
          <div className="min-w-0 lg:h-[250px]">
            <CalendarCard />
          </div>

          {/* Current Trip / Recent Trip */}
          <div className="min-w-0 lg:h-[250px]">
            <HeroCard />
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
            Journey | Upcoming Tours + Weather
            ===================================================== */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-3
            lg:min-h-[430px]
          "
        >
          {/* =================================================
    JOURNEY
    ================================================= */}
          <section
            className="
    relative
    flex
    min-h-[380px]
    flex-col
    overflow-hidden
    rounded-[28px]
    border
    border-gray-200/70
    bg-white/80
    p-6
    shadow-[0_8px_30px_rgba(0,0,0,0.04)]
    backdrop-blur-xl
    dark:border-white/10
    dark:bg-white/5
    lg:col-span-2
    lg:min-h-0
  "
          >
            {/* Decorative background */}
            <div
              className="
      pointer-events-none
      absolute
      -right-20
      -top-20
      h-52
      w-52
      rounded-full
      bg-cyan-400/10
      blur-3xl
    "
            />

            <div
              className="
      pointer-events-none
      absolute
      -bottom-24
      -left-20
      h-52
      w-52
      rounded-full
      bg-cyan-500/10
      blur-3xl
    "
            />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-cyan-500/10
          text-cyan-500
        "
                >
                  <Compass size={22} />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                    Your Journey
                  </h2>

                  <p className="text-xs text-gray-500 dark:text-white/50">
                    Your travel route
                  </p>
                </div>
              </div>

              <div
                className="
        hidden
        items-center
        gap-1.5
        rounded-full
        bg-cyan-500/10
        px-3
        py-1.5
        text-xs
        font-medium
        text-cyan-600
        dark:text-cyan-400
        sm:flex
      "
              >
                <MapPin size={13} />
                Travel plan
              </div>
            </div>

            {/* Trip Route */}
            <div className="relative z-10 flex flex-1 items-center justify-center">
              <TripRoute />
            </div>
          </section>

          {/* =================================================
              RIGHT SIDE
              Upcoming Tours + Weather
              ================================================= */}
          <div
            className="
              grid
              min-h-[380px]
              grid-rows-2
              gap-4
              lg:min-h-0
            "
          >
            {/* Upcoming Tours */}
            <UpcomingTrips />

            {/* Weather */}
            <WeatherCard />
          </div>
        </div>

        {/* =====================================================
          BOTTOM ROW
          Messages
          ===================================================== */}
        <MessagesCard />
      </div>
    </div>
  );
}

export default Dashboard;