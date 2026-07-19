export default function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-[#1E293B]">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-100 text-3xl text-lime-600 dark:bg-lime-900/30">
        <Icon />
      </div>

      <h3 className="mb-4 text-2xl font-bold dark:text-white">
        {feature.title}
      </h3>

      <p className="leading-7 text-gray-600 dark:text-gray-300">
        {feature.description}
      </p>
    </div>
  );
}
