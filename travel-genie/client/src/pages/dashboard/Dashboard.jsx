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
          <div className="min-w-0">
            <ExchangeCard />
          </div>

          {/* Calendar */}
          <div className="min-w-0">
            <CalendarCard />
          </div>

          {/* Current Trip */}
          <div className="min-w-0">
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

            {/* Empty Journey State */}
            <div
              className="
                relative
                z-10
                flex
                flex-1
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-cyan-500/10
                  text-cyan-500
                "
              >
                <Plane size={34} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
                Your journey starts here
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-white/50">
                Your destination, route, and travel activities will appear here
                once you create a trip.
              </p>
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
              <div
                className="
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
                    Destination forecast
                  </p>
                </div>
              </div>

              <div className="relative mt-5 flex items-center justify-center">
                <p className="text-xs text-gray-400 dark:text-white/40">
                  Select a destination to see weather
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* =====================================================
            BOTTOM ROW
            Messages
            ===================================================== */}

        <section
          className="
            relative
            min-h-[120px]
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
          <div
            className="
              absolute
              -right-12
              -top-12
              h-36
              w-36
              rounded-full
              bg-cyan-400/10
              blur-3xl
            "
          />

          <div className="relative flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-cyan-500/10
                text-cyan-500
              "
            >
              <MessageCircle size={21} />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Messages
              </h2>

              <p className="mt-1 text-xs text-gray-500 dark:text-white/50">
                Important travel updates and messages will appear here.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
