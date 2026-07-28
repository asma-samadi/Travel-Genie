import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { FaInstagram, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Destinations", "AI Planner", "Travel Memories"],
  },

  {
    title: "Company",
    links: ["About", "Contact", "Careers", "Blog"],
  },

  {
    title: "Resources",
    links: ["Help Center", "Privacy Policy", "Terms", "Support"],
  },
];

const socials = [
  {
    icon: FaInstagram,
    name: "Instagram",
  },

  {
    icon: FaTwitter,
    name: "Twitter",
  },

  {
    icon: FaGithub,
    name: "Github",
  },

  {
    icon: FaLinkedin,
    name: "LinkedIn",
  },
];

function Footer() {
  return (
    <footer
      className="
relative

overflow-hidden

bg-[#F8FAFC]

dark:bg-[#07111F]

text-gray-900

dark:text-white

pt-14

pb-6
"
    >
      {/* Background Glow */}

      <div
        className="
absolute

top-0

left-1/2

h-72

w-72

-translate-x-1/2

rounded-full

bg-cyan-300/20

blur-3xl

dark:bg-cyan-500/10
"
      />

      <div
        className="
relative

mx-auto

max-w-7xl

px-5

sm:px-10

lg:px-20
"
      >
        {/* Footer Main */}

        <div
          className="
grid

grid-cols-1

gap-10

sm:grid-cols-2

lg:grid-cols-5
"
        >
          {/* Brand */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
lg:col-span-2
"
          >
            <div
              className="
flex

items-center

gap-2
"
            >
              <Sparkles
                className="
text-cyan-500
"
              />

              <h3
                className="
text-2xl

font-bold
"
              >
                Travel
                <span className="text-cyan-500">Genie</span>
              </h3>
            </div>

            <p
              className="
mt-4

max-w-sm

leading-7

text-gray-600

dark:text-gray-400
"
            >
              Your AI-powered travel companion. Create smart itineraries,
              discover destinations, and organize unforgettable journeys.
            </p>

            {/* Social Icons */}

            <div
              className="
mt-6

flex

gap-3
"
            >
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <button
                    key={social.name}
                    aria-label={social.name}
                    className="
flex

h-10

w-10

items-center

justify-center

rounded-full

bg-gray-100

text-gray-700

transition

hover:-translate-y-1

hover:bg-cyan-500

hover:text-white

dark:bg-white/10

dark:text-white
"
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Links */}

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4
                className="
font-semibold

text-lg
"
              >
                {section.title}
              </h4>

              <ul
                className="
mt-4

space-y-3

text-gray-600

dark:text-gray-400
"
              >
                {section.links.map((link) => (
                  <li
                    key={link}
                    className="
cursor-pointer

transition

hover:text-cyan-500

hover:translate-x-1
"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}

        <div
          className="
mt-10

border-t

border-gray-200

dark:border-white/10

pt-5

flex

flex-col

gap-3

text-sm

text-gray-500

dark:text-gray-400

sm:flex-row

sm:justify-between

"
        >
          <p>© 2026 TravelGenie. All rights reserved.</p>

          <p>AI Powered Travel Experience</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
