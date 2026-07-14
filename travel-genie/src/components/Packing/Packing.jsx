export default function Packing({ items }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Packing Checklist</h2>

      {items?.map((item, index) => (
        <p key={index}>☐ {item}</p>
      ))}
    </div>
  );
}
