import { NavLink } from "react-router-dom";

import { LayoutDashboard, Map, User, Settings } from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Trips",
    path: "/dashboard/trips",
    icon: Map,
  },
];

function Sidebar() {
  return (
    <aside
      className="
        fixed
        z-50
        top-6
        left-6
        w-[240px]
        h-[calc(100vh-64px)]
        rounded-[28px]
        p-5
        flex
        flex-col
        bg-white/70
        dark:bg-[#071625]/70
        backdrop-blur-3xl
        border
        border-gray-200
        dark:border-white/10
        shadow-xl
        transition-all
        duration-300
      "
    >
      {/* Logo */}

      <div>
        <h1
          className="
            text-2xl
            font-bold
            bg-gradient-to-r
            from-cyan-400
            to-blue-600
            bg-clip-text
            text-transparent
          "
        >
          TravelGenie
        </h1>
      </div>

      {/* Menu */}

      <nav
        className="
          mt-8
          flex-1
          space-y-1
        "
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  transition-all
                  duration-300
                  hover:translate-x-1
                  ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 dark:text-white/70 dark:hover:bg-white/10"
                  }
                `
              }
            >
              <Icon size={18} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Divider */}

      <div
        className="
          my-3
          border-t
          border-gray-200
          dark:border-white/10
        "
      />

      {/* Bottom */}

      <div className="space-y-1">
        <button
          type="button"
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            text-sm
            text-gray-500
            dark:text-white/50
            cursor-not-allowed
          "
          disabled
        >
          <User size={18} />

          <span>Profile</span>
        </button>

        <button
          type="button"
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            text-sm
            text-gray-500
            dark:text-white/50
            cursor-not-allowed
          "
          disabled
        >
          <Settings size={18} />

          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
