import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

import ThemeSwitcher from "../common/ThemeSwitcher";

function Navbar() {
  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className={`
      
      sticky

      top-0

      z-50

      w-full

      transition-all

      duration-500


      ${
        scrolled
          ? `
        bg-white/80

        dark:bg-[#07111F]/80

        backdrop-blur-xl

        shadow-lg

        border-b

        border-gray-200

        dark:border-white/10
        `
          : `
        bg-white/60

        dark:bg-[#07111F]/60

        backdrop-blur-lg
        `
      }

      `}
    >
      <div
        className="
      max-w-7xl

      mx-auto

      h-20

      px-5

      sm:px-10

      lg:px-20

      flex

      items-center

      justify-between
      "
      >
        {/* LOGO */}

        <a
          href="/"
          className="
      text-2xl

      font-bold

      text-gray-900

      dark:text-white

      transition-colors
      "
        >
          Travel
          <span className="text-cyan-500">Genie</span>
        </a>

        {/* DESKTOP NAVIGATION */}

        <div
          className="
      hidden

      lg:flex

      items-center

      gap-10

      text-gray-700

      dark:text-gray-300

      "
        >
          <a
            href="#guide"
            className="
      hover:text-cyan-500
      transition
      "
          >
            Guide
          </a>

          <a
            href="#destinations"
            className="
      hover:text-cyan-500
      transition
      "
          >
            Destinations
          </a>

          <a
            href="#features"
            className="
      hover:text-cyan-500
      transition
      "
          >
            Features
          </a>

          <a
            href="#about"
            className="
      hover:text-cyan-500
      transition
      "
          >
            About
          </a>
        </div>

        {/* DESKTOP BUTTONS */}

        <div
          className="
      hidden

      lg:flex

      items-center

      gap-4

      "
        >
          <ThemeSwitcher />

          <button
            className="
      px-5

      py-2

      rounded-full

      text-gray-700

      dark:text-gray-200

      hover:text-cyan-500

      transition
      "
          >
            Login
          </button>

          <button
            className="
      px-6

      py-3

      rounded-full

      bg-cyan-500

      text-white

      font-semibold

      hover:bg-cyan-400

      hover:scale-105

      transition
      "
          >
            Get Started
          </button>
        </div>

        {/* MOBILE BUTTONS */}

        <div
          className="
      flex

      items-center

      gap-3

      lg:hidden
      "
        >
          <ThemeSwitcher />

          <button
            onClick={() => setOpen(!open)}
            className="
      text-gray-900

      dark:text-white
      "
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}

      {open && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          transition={{
            duration: 0.3,
          }}
          className="
        lg:hidden

        bg-white/90

        dark:bg-[#07111F]/90

        backdrop-blur-xl

        border-t

        border-gray-200

        dark:border-white/10
        "
        >
          <div
            className="
        px-5

        py-6

        flex

        flex-col

        gap-5

        text-gray-700

        dark:text-gray-200
        "
          >
            {["Guide", "Destinations", "Features", "About"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={closeMenu}
                className="
          hover:text-cyan-500

          transition
          "
              >
                {item}
              </a>
            ))}

            <button
              className="
        rounded-full

        bg-cyan-500

        py-3

        text-white

        font-semibold
        "
            >
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
