export default function Budget({ cost }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold">Budget Estimate</h2>

      <p>Accommodation: ${cost.accommodation}</p>

      <p>Food: ${cost.food}</p>

      <p>Transport: ${cost.transport}</p>

      <p>Activities: ${cost.activities}</p>
    </div>
  );
}
