const styles = [
  "Adventure",
  "Luxury",
  "Family",
  "Solo",
  "Romantic",
  "Business",
  "Nature",
  "Cultural",
];

export default function TravelStyleSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-lime-500 dark:border-gray-700 dark:bg-[#1E293B] dark:text-white"
    >
      {styles.map((style) => (
        <option key={style} value={style}>
          {style}
        </option>
      ))}
    </select>
  );
}
