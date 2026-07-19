export default function Budget({ cost }) {
  if (!cost) {
    return (
      <div className="text-center mt-20 text-2xl">
        Generate a trip first to see your budget estimate ✈️
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white rounded-3xl shadow-xl p-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        💰 Budget Estimate
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-xl">🏨 Accommodation</h3>
          <p className="text-2xl mt-3">${cost.accommodation}</p>
        </div>

        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="font-bold text-xl">🍔 Food</h3>
          <p className="text-2xl mt-3">${cost.food}</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="font-bold text-xl">🚗 Transport</h3>
          <p className="text-2xl mt-3">${cost.transport}</p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6">
          <h3 className="font-bold text-xl">🎯 Activities</h3>
          <p className="text-2xl mt-3">${cost.activities}</p>
        </div>
      </div>

      <div className="mt-10 bg-gray-100 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold">Total Estimated Cost</h3>

        <p className="text-4xl font-bold mt-3">
          ${cost.accommodation + cost.food + cost.transport + cost.activities}
        </p>
      </div>
    </div>
  );
}
