import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaPlaneDeparture, FaSearch } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3 font-bold text-2xl text-blue-600"
        >
          <FaPlaneDeparture className="text-3xl" />
          TravelGenie
        </Link>

        {/* Navigation */}

        <div className="hidden lg:flex gap-8 font-medium text-gray-700 dark:text-gray-200">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/saved">Saved Trips</NavLink>

          <NavLink to="/budget">Budget</NavLink>

          <NavLink to="/packing">Packing</NavLink>

          <NavLink to="/about">About</NavLink>
        </div>

        {/* Right Side */}

        <div className="flex items-center gap-5">
          {/* Search */}

          <div className="hidden md:flex items-center bg-gray-100 dark:bg-[#1E293B] rounded-full px-4 py-2">
            <FaSearch className="text-gray-500 mr-2" />

            <input
              placeholder="Search..."
              className="w-36 bg-transparent text-gray-900 outline-none placeholder:text-gray-500 dark:text-white dark:placeholder:text-gray-400"
            />
          </div>

          {/* Theme */}

          <ThemeToggle />

          {/* Profile */}

          {user ? (
            <Link
              to="/profile"
              className="w-11 h-11 rounded-full  flex bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 items-center justify-center text-white font-bold shadow-lg"
            >
              {user.name[0].toUpperCase()}
            </Link>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="rounded-xl border border-gray-300 px-5 py-2 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-xl bg-lime-500 px-5 py-2 font-semibold text-black transition hover:bg-lime-400"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
