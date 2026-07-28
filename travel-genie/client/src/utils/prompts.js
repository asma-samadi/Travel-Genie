export function itineraryPrompt(trip) {
  const start = new Date(trip.dates.start);
  const end = new Date(trip.dates.end);

  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  return `
Create a travel itinerary.

Destination: ${trip.destination}
Budget: $${trip.budget}
Travel Style: ${trip.travelStyle}
Travelers: ${trip.travelers}
Duration: ${days} days

Rules:
- Create exactly ${days} days.
- Every day must include morning, afternoon, and evening.
- Budget total must equal the trip budget.
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT write explanations.
- Do NOT use \`\`\`json.

Return EXACTLY this structure:

{
  "title": "Trip title",
  "duration": "${days} days",
  "days": [
    {
      "title": "Day title",
      "morning": "Morning activity",
      "afternoon": "Afternoon activity",
      "evening": "Evening activity"
    }
  ],
  "budget": {
    "accommodation": 0,
    "food": 0,
    "transport": 0,
    "activities": 0,
    "total": ${trip.budget}
  },
  "packing": [
    "Item 1",
    "Item 2",
    "Item 3"
  ]
}
`;
}
