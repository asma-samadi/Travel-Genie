export function itineraryPrompt(trip) {
  return `
Create a ${trip.travelStyle} travel itinerary for ${trip.destination}.

Budget: $${trip.budget}
Start Date: ${trip.dates.start}
End Date: ${trip.dates.end}

Write a clear travel itinerary.

Use exactly this format:

Day 1
Notes:
Arrival and explore the city.

Activities:
- Activity 1
- Activity 2
- Activity 3

Day 2
Notes:
Short description.

Activities:
- Activity 1
- Activity 2
- Activity 3

Continue until the trip ends.

Do NOT use JSON.
Do NOT use markdown.
Do NOT use code blocks.
Return only the itinerary.
`;
}
