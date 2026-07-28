import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import {
  FaPlane,
  FaBookmark,
  FaRobot,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center mt-20 text-2xl">Please login first.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white flex items-center justify-center text-6xl font-bold mx-auto shadow-xl ring-4 ring-white">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-4xl font-bold mt-6">{user.name}</h1>

          <p className="text-gray-500 mt-2">{user.email}</p>

          <p className="text-sm text-gray-400 mt-2">Welcome to TravelGenie</p>
        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <FaPlane className="text-blue-600 text-4xl mx-auto mb-4" />

            <h2 className="text-3xl font-bold">{user.trips?.length || 0}</h2>

            <p className="text-gray-500">Trips Created</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <FaBookmark className="text-green-600 text-4xl mx-auto mb-4" />

            <h2 className="text-3xl font-bold">{user.trips?.length || 0}</h2>

            <p className="text-gray-500">Saved Trips</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <FaRobot className="text-purple-600 text-4xl mx-auto mb-4" />

            <h2 className="text-3xl font-bold">{user.trips?.length || 0}</h2>

            <p className="text-gray-500">AI Plans</p>
          </div>
        </div>

        {/* Actions */}

        <div className="bg-white rounded-3xl shadow-xl mt-10 overflow-hidden">
          <Link
            to="/edit-profile"
            className="w-full flex items-center gap-4 p-6 hover:bg-gray-100 transition"
          >
            <FaEdit />
            Edit Profile
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-4 p-6 hover:bg-red-50 text-red-600 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
