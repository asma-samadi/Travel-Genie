export default function Hero() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center bg-blue-50 px-5">
      <h1 className="text-5xl font-bold text-blue-700 mb-5">
        Plan Your Dream Trip With AI
      </h1>

      <p className="max-w-2xl text-gray-600 text-lg mb-8">
        TravelGenie creates personalized travel plans, estimates budgets,
        suggests activities, and builds packing lists using AI.
      </p>

      <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
        Start Planning
      </button>
    </section>
  );
}
