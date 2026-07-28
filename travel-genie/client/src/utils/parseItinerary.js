export function parseItinerary(text) {
  const days = text.split(/Day \d+/).filter(Boolean);

  return days.map((dayText, index) => {
    const notesMatch = dayText.match(/Notes:(.*)/);

    const activitiesMatch = dayText.match(
      /Activities:\s*([\s\S]*)/
    );

    const activities = activitiesMatch
      ? activitiesMatch[1]
          .split("-")
          .filter(Boolean)
          .map((item) => item.trim())
      : [];

    return {
      day: index + 1,
      notes: notesMatch ? notesMatch[1].trim() : "",
      activities,
    };
  });
}
