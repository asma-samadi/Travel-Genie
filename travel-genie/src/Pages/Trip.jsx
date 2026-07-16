import { useParams } from "react-router-dom";
import { useContext , useState} from "react";
import { TripContext } from "../context/TripContext";
import { generateAIResponse } from "../services/ai";
import { itineraryPrompt } from "../utils/prompts";
import  Itinerary  from "../components/Itinerary/Itinerary";

export default function Trip() {
  const { id } = useParams();

  const { trips } = useContext(TripContext);

  const trip = trips.find((trip) => trip.id === id);

  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);

  if (!trip) {
    return <h1 className="text-center text-3xl mt-20">Trip Not Found</h1>;
  }

  const handleGenerateItinerary = async () => {
    setLoading(true);

    try {
      const prompt = itineraryPrompt(trip);

      const result = await generateAIResponse(prompt);

      setItinerary(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-5">
      <h1 className="text-4xl font-bold">{trip.destination}</h1>

      <div className="mt-6 bg-white shadow-lg rounded-xl p-6">
        <p>Budget: ${trip.budget}</p>

        <p>Travel Style: {trip.travelStyle}</p>

        <p>Start: {trip.dates.start}</p>

        <p>End: {trip.dates.end}</p>

        <button
          onClick={handleGenerateItinerary}
          disabled={loading}
          className="mt-6 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "✨ Generate AI Itinerary"}
        </button>
      </div>

      <Itinerary itinerary={itinerary} />
    </div>
  );};