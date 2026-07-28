import FeatureCard from "./FeatureCard";
import features from "../../data/features";

export default function Features() {
  return (
    <section className="bg-white py-20 dark:bg-[#111827]">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-4 text-center text-4xl font-bold dark:text-white">
          Why Choose TravelGenie?
        </h2>

        <p className="mx-auto mb-14 max-w-2xl text-center text-gray-600 dark:text-gray-300">
          Everything you need to plan smarter, travel confidently, and enjoy
          unforgettable adventures with AI.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
