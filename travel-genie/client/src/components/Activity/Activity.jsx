export default function Activity({ activities }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Recommended Activities</h2>

      <ul>
        {activities?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
