export default function TripForm() {
  return (
    <section className="py-16 px-5">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Create Your Trip Plan
        </h2>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Destination"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="Budget ($)"
            className="w-full border rounded-lg p-3"
          />

          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="border rounded-lg p-3" />

            <input type="date" className="border rounded-lg p-3" />
          </div>

          <select className="w-full border rounded-lg p-3">
            <option>Select Travel Style</option>

            <option>Adventure</option>

            <option>Relaxation</option>

            <option>Cultural</option>

            <option>Family</option>
          </select>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Generate Trip
          </button>
        </form>
      </div>
    </section>
  );
}
