import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

export default function EditProfile() {
  const { user, updateProfile } = useContext(AuthContext);

  const navigate = useNavigate();

  const [name, setName] = useState(user.name);

  const [saving, setSaving] = useState(false);

  function handleSave() {
    setSaving(true);

    setTimeout(() => {
      updateProfile(name);

      setSaving(false);

      navigate("/profile");
    }, 500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-14 px-5">
      <div className="max-w-3xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <FaArrowLeft />
            Back to Profile
          </button>
        </div>

        {/* Card */}

        <div className="bg-white rounded-3xl shadow-xl p-10">
          {/* Avatar */}

          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center text-6xl font-bold shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center mb-10">Edit Profile</h1>

          {/* Name */}

          <div className="mb-6">
            <label className="font-semibold text-gray-700">Full Name</label>

            <div className="flex items-center mt-2 border rounded-xl p-3">
              <FaUser className="text-gray-400 mr-3" />

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Email */}

          <div className="mb-6">
            <label className="font-semibold text-gray-700">Email</label>

            <div className="flex items-center mt-2 border rounded-xl p-3 bg-gray-100">
              <FaEnvelope className="text-gray-400 mr-3" />

              <input
                value={user.email}
                disabled
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Account date */}

          <div className="mb-8">
            <label className="font-semibold text-gray-700">Member Since</label>

            <div className="flex items-center mt-2 border rounded-xl p-3 bg-gray-100">
              <FaCalendar className="text-gray-400 mr-3" />

              <span>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "New Member"}
              </span>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <FaSave />

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
