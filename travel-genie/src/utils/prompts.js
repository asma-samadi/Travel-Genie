export function itineraryPrompt(trip) {
  return `
Create a travel itinerary for ${trip.destination}.

Budget: ${trip.budget}
Start: ${trip.dates.start}
End: ${trip.dates.end}

Format exactly like this:

Day 1
Notes: Short description
Activities:
- Activity 1
- Activity 2

Day 2
Notes: Short description
Activities:
- Activity 1
- Activity 2

Do not use JSON.
Do not use special characters.
Do not explain anything else.
`;
}
