import { useAuth } from "../context/AuthContext.jsx";

function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07111F] p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Welcome to TravelGenie Dashboard 🌍
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Your travel journey starts here.
        </p>

        <button
          onClick={logout}
          className="
            mt-6
            rounded-xl
            bg-red-500
            px-6
            py-3
            font-semibold
            text-white
            hover:bg-red-600
            transition
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
