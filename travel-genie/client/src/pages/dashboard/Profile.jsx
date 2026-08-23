import { User, Mail, Calendar, Shield, Edit3 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import GlassCard from "../../components/common/GlassCard";

function Profile() {
  const { user } = useAuth();

  const username = user?.username || user?.name || "Travel Explorer";

  const email = user?.email || "No email available";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          My Profile
        </h1>

        <p className="mt-2 text-white/70">
          Manage your personal information and TravelGenie account.
        </p>
      </div>

      {/* Profile Header */}
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-3xl font-bold text-white shadow-lg">
            {username.charAt(0).toUpperCase()}
          </div>

          {/* User Information */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {username}
            </h2>

            <p className="mt-2 text-gray-600 dark:text-white/70">
              TravelGenie Explorer
            </p>

            <div className="mt-4 flex justify-center sm:justify-start">
              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300">
                Active Traveler
              </span>
            </div>
          </div>

          {/* Edit Button - visual for now */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        </div>
      </GlassCard>

      {/* Account Information */}
      <section>
        <h2 className="mb-5 text-2xl sm:text-3xl font-bold text-white">
          Account Information
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProfileInfo
            icon={<User size={21} />}
            label="Username"
            value={username}
          />

          <ProfileInfo
            icon={<Mail size={21} />}
            label="Email Address"
            value={email}
          />

          <ProfileInfo
            icon={<Shield size={21} />}
            label="Account Status"
            value="Active"
          />

          <ProfileInfo
            icon={<Calendar size={21} />}
            label="Member Since"
            value="TravelGenie Member"
          />
        </div>
      </section>
    </div>
  );
}

function ProfileInfo({ icon, label, value }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm text-gray-500 dark:text-white/60">{label}</p>

          <p className="mt-1 truncate font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

export default Profile;
