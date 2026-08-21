import { useState } from "react";
import { Search, Crown } from "lucide-react";

import ThemeSwitcher from "../Common/ThemeSwitcher";

function DashboardHeader() {
  const [search, setSearch] = useState("");

  return (
    <header
      className="
      w-full

      flex
      items-center

      gap-4

      mb-8

      flex-wrap

      lg:flex-nowrap

      "
    >
      {/* Upgrade Pro */}

      <button
        className="
        flex

        items-center

        gap-2


        rounded-2xl


        px-5

        py-3


        bg-gradient-to-r

        from-cyan-500

        to-blue-600


        text-white

        text-sm

        font-medium


        shadow-lg


        transition-all

        duration-300


        hover:scale-105

        "
      >
        <Crown size={18} />

        <span className="hidden sm:block">Upgrade Pro</span>
      </button>

      {/* Search */}

      <div
        className="
        flex-1

        min-w-[220px]

        "
      >
        <div
          className="
          relative

          w-full

          "
        >
          <Search
            size={20}
            className="
  absolute
  left-5
  top-1/2
  -translate-y-1/2
  text-gray-500
  dark:text-white
  z-10
  "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destinations, trips, memories..."
            className="
            
            w-full


            rounded-2xl


            px-5

            py-3


            pl-12


            text-sm



            bg-white/70

            dark:bg-white/10



            border

            border-gray-200

            dark:border-white/10



            text-gray-800

            dark:text-white



            placeholder:text-gray-400

            dark:placeholder:text-white/50



            backdrop-blur-xl



            outline-none



            transition-all

            duration-300



            focus:ring-2

            focus:ring-cyan-400



            "
          />
        </div>
      </div>

      {/* Theme */}

      <ThemeSwitcher />

      {/* Profile */}

      <button
        className="
        h-11

        w-11



        rounded-full



        flex

        items-center

        justify-center



        bg-gradient-to-r

        from-cyan-500

        to-blue-600



        text-white


        text-sm

        font-bold



        shadow-lg



        transition-all

        duration-300



        hover:scale-110

        "
      >
        A
      </button>
    </header>
  );
}

export default DashboardHeader;
