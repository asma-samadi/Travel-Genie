export default function Itinerary({ itinerary }) {
  return (
    <section className="mt-10">

      <h2 className="text-3xl font-bold mb-6">
        AI Itinerary
      </h2>

      <div className="space-y-6">
        {itinerary.map((day) => (
          <div
            key={day.day}
            className="bg-white rounded-2xl shadow-md p-6 border"
          >

            <h3 className="text-2xl font-bold mb-3">
              Day {day.day}
            </h3>

            <p className="text-gray-600 mb-4">
              {day.notes}
            </p>

            <h4 className="font-semibold mb-2">
              Activities:
            </h4>

            <ul className="space-y-2">
              {day.activities.map((activity, index) => (
                <li
                  key={index}
                  className="bg-gray-100 rounded-lg p-3"
                >
                  {activity}
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>

    </section>
  );
}