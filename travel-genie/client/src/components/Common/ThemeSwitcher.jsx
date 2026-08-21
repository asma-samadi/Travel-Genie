import { Sun, Moon, Monitor } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();

  return (
    <div
      className="
      flex
      items-center
      gap-1

      rounded-full

      bg-white/10

      backdrop-blur-xl

      border
      border-white/10

      p-1
      "
    >
      <button
        onClick={() => changeTheme("light")}
        className={`
        p-2
        rounded-full
        transition-all
        duration-300

        ${
          theme === "light"
            ? "bg-cyan-500 text-white shadow-lg"
            : "text-white/60 hover:bg-white/10"
        }
      `}
      >
        <Sun size={18} />
      </button>

      <button
        onClick={() => changeTheme("dark")}
        className={`
        p-2
        rounded-full
        transition-all
        duration-300

        ${
          theme === "dark"
            ? "bg-cyan-500 text-white shadow-lg"
            : "text-white/60 hover:bg-white/10"
        }
      `}
      >
        <Moon size={18} />
      </button>

      <button
        onClick={() => changeTheme("system")}
        className={`
        p-2
        rounded-full
        transition-all
        duration-300

        ${
          theme === "system"
            ? "bg-cyan-500 text-white shadow-lg"
            : "text-white/60 hover:bg-white/10"
        }
      `}
      >
        <Monitor size={18} />
      </button>
    </div>
  );
}

export default ThemeSwitcher;
