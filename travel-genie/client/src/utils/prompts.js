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
- No markdown.
- No explanations.


Return:

{
"title":"",
"duration":"",
"days":[
{
"title":"",
"morning":"",
"afternoon":"",
"evening":""
}
],
"budget":{
"accommodation":0,
"food":0,
"transport":0,
"activities":0,
"total":${trip.budget}
},
"packing":[]
}

`;
}
