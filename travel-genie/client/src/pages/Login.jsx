import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

        await login(formData);

        navigate("/dashboard");

    } catch(err) {

        console.log("LOGIN ERROR:", err);

        setError("Invalid username or password");

    } finally {

        setLoading(false);

    }

};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#07111F]">
      <form
        onSubmit={handleSubmit}
        className="
        w-full
        max-w-md
        rounded-3xl
        bg-white
        dark:bg-[#111827]
        p-8
        shadow-xl
        "
      >
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
        text-gray-500
        dark:text-gray-300
        "
        >
          Login to continue your journey
        </p>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="
          mt-6
          w-full
          rounded-xl
          border
          p-3
          dark:bg-gray-800
          dark:text-white
          "
        />

        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="
          mt-4
          w-full
          rounded-xl
          border
          p-3
          dark:bg-gray-800
          dark:text-white
          "
        />

        <button
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
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
