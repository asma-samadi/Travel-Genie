export function itineraryPrompt(trip) {
  return `

Create a detailed travel itinerary.

Destination:
${trip.destination}

Budget:
${trip.budget}

Dates:
${trip.dates.start}
to
${trip.dates.end}

Travel Style:
${trip.travelStyle}


Return:

Day 1:
Activities:
Notes:

Day 2:
Activities:
Notes:

`;
}
