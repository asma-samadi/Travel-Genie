import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import heroImage from "../../assets/images/hero-travel.jpg";

export default function Hero() {
  return (
    <section className="bg-stone-50 transition-colors duration-300 dark:bg-[#0F172A]">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-between gap-12 px-6 py-16 lg:flex-row lg:px-10">
        {/* Left Content */}
        <div className="max-w-2xl text-center lg:text-left">
          <span className="mb-4 inline-block rounded-full bg-lime-100 px-4 py-2 text-sm font-semibold text-lime-700 dark:bg-lime-900/30 dark:text-lime-300">
            ✈️ AI-Powered Travel Planner
          </span>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">
            Plan Your Dream Trip
            <span className="block text-lime-500">Smarter with AI</span>
          </h1>

          <p className="mb-8 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Generate personalized travel itineraries, estimate your budget,
            discover exciting destinations, and create smart packing lists — all
            in seconds with TravelGenie.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              to="/create-trip"
              className="flex items-center justify-center gap-2 rounded-xl bg-lime-500 px-8 py-4 font-semibold text-gray-900 transition hover:bg-lime-400"
            >
              Start Planning
              <FaArrowRight />
            </Link>

            <Link
              to="/saved"
              className="rounded-xl border border-gray-300 px-8 py-4 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              View Saved Trips
            </Link>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex justify-center">
          <div className="flex justify-center">
            <img
              src={heroImage}
              alt="Travel illustration"
              className="w-full max-w-md drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
