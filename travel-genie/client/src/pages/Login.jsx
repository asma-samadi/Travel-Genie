import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);

    try {
      await login(formData);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        bg-gray-100
        dark:bg-[#07111F]
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white
          dark:bg-[#111827]
          p-6
          sm:p-8
          shadow-xl
          border
          border-gray-200
          dark:border-white/10
        "
      >
        {/* Header */}

        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          Welcome Back
        </h1>

        <p
          className="
            mt-2
            text-gray-600
            dark:text-gray-300
          "
        >
          Login to continue your journey.
        </p>

        {/* Error */}

        {error && (
          <div
            className="
              mt-5
              rounded-xl
              bg-red-50
              dark:bg-red-500/10
              border
              border-red-200
              dark:border-red-500/20
              p-3
              text-sm
              text-red-600
              dark:text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* Username */}

        <label
          className="
            block
            mt-6
            text-sm
            font-medium
            text-gray-700
            dark:text-gray-200
          "
        >
          Username
        </label>

        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          autoComplete="username"
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-gray-300
            dark:border-white/10
            bg-white
            dark:bg-gray-800
            p-3
            text-gray-900
            dark:text-white
            placeholder:text-gray-400
            dark:placeholder:text-gray-500
            outline-none
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-500/20
            transition
          "
        />

        {/* Password */}

        <label
          className="
            block
            mt-5
            text-sm
            font-medium
            text-gray-700
            dark:text-gray-200
          "
        >
          Password
        </label>

        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="current-password"
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-gray-300
            dark:border-white/10
            bg-white
            dark:bg-gray-800
            p-3
            text-gray-900
            dark:text-white
            placeholder:text-gray-400
            dark:placeholder:text-gray-500
            outline-none
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-500/20
            transition
          "
        />

        {/* Login Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            mt-6
            w-full
            rounded-xl
            bg-cyan-500
            py-3
            font-semibold
            text-white
            hover:bg-cyan-400
            disabled:opacity-60
            disabled:cursor-not-allowed
            transition
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Sign Up Link */}

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-white/60">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="
              font-semibold
              text-cyan-500
              transition
              hover:text-cyan-400
            "
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
