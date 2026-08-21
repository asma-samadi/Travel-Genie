function CalendarCard() {
  return (
    <div
      className="
      rounded-[32px]

      p-6

      bg-white/70

      dark:bg-white/10

      backdrop-blur-xl

      border

      border-gray-200

      dark:border-white/10

      shadow-xl
      "
    >
      <h3
        className="
        text-xl
        font-semibold

        text-gray-900

        dark:text-white
        "
      >
        Travel Calendar
      </h3>

      <p
        className="
        mt-2

        text-sm

        text-gray-500

        dark:text-white/60
        "
      >
        August 2026
      </p>

      <div
        className="
        mt-6

        grid

        grid-cols-7

        gap-3

        text-center

        text-sm
        "
      >
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21,
        ].map((day) => (
          <div
            key={day}
            className="
              p-2

              rounded-xl

              text-gray-700

              dark:text-white/80

              hover:bg-cyan-500

              hover:text-white

              cursor-pointer

              transition
              "
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarCard;
