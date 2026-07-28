import { Sun, Moon, Monitor } from "lucide-react";

import { useTheme } from "../../context/ThemeContext.jsx";

function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();

  return (
    <div
      className="
flex
items-center
gap-2
bg-gray-100
dark:bg-gray-800
rounded-full
p-1
"
    >
      <button
        onClick={() => changeTheme("light")}
        className={`
p-2
rounded-full
transition

${theme === "light" ? "bg-white shadow text-cyan-500" : "text-gray-500"}

`}
      >
        <Sun size={18} />
      </button>

      <button
        onClick={() => changeTheme("dark")}
        className={`
p-2
rounded-full
transition

${theme === "dark" ? "bg-white shadow text-cyan-500" : "text-gray-500"}

`}
      >
        <Moon size={18} />
      </button>

      <button
        onClick={() => changeTheme("system")}
        className={`
p-2
rounded-full
transition

${theme === "system" ? "bg-white shadow text-cyan-500" : "text-gray-500"}

`}
      >
        <Monitor size={18} />
      </button>
    </div>
  );
}

export default ThemeSwitcher;
