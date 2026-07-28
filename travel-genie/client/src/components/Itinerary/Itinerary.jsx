export default function Itinerary({ itinerary }) {
  if (!itinerary) return null;

  const days = itinerary.split(/Day\s+\d+/).filter(Boolean);

  const dayNumbers = [...itinerary.matchAll(/Day\s+(\d+)/g)].map(
    (match) => match[1],
  );

  return (
    <section className="max-w-6xl mx-auto mt-12">
      <h2 className="text-4xl font-bold text-center mb-10">
        ✈️ AI Travel Itinerary
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {days.map((content, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition duration-300"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-bold text-blue-600">
                Day {dayNumbers[index]}
              </h3>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                Travel
              </span>
            </div>

            <div className="whitespace-pre-wrap leading-8 text-gray-700">
              {content.trim()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
