import Hero from "../components/Hero/Hero";
import TripForm from '../components/TripForm/TripForm'
import SuggestedDestinations from "../components/SuggestedDestinations/SuggestedDestinations";
import RecentSavedTrips from "../components/RecentSavedTrips/RecentSavedTrips";

export default function Home() {
  return (
    <>
      <Hero />
      <TripForm />
      <SuggestedDestinations />
      <RecentSavedTrips />
    </>
  );
}
