export function saveTrips(trips) {
  localStorage.setItem("travelTrips", JSON.stringify(trips));
}

export function getTrips() {
  const trips = localStorage.getItem("travelTrips");

  return trips ? JSON.parse(trips) : [];
}
