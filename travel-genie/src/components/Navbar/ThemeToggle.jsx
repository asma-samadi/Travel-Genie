import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  const buttonClass = (value) =>
    `p-2 rounded-full transition ${
      theme === value
        ? "bg-lime-400 text-black"
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1 dark:bg-[#1E293B]">
      <button
        onClick={() => setTheme("light")}
        className={buttonClass("light")}
        title="Light"
      >
        <FaSun />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={buttonClass("dark")}
        title="Dark"
      >
        <FaMoon />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={buttonClass("system")}
        title="System"
      >
        <FaDesktop />
      </button>
    </div>
  );
}
