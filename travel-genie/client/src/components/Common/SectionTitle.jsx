function SectionTitle({
  title,

  subtitle,
}) {
  return (
    <div className="mb-14">
      <p
        className="
uppercase
tracking-[6px]

text-[#3ED6D2]

font-semibold
"
      >
        {subtitle}
      </p>

      <h2
        className="
mt-3

text-4xl

lg:text-5xl

font-bold

text-slate-900

dark:text-white
"
      >
        {title}
      </h2>
    </div>
  );
}

export default SectionTitle;
