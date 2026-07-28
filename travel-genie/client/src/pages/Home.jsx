import Hero from "../components/Hero/Hero";
import TripForm from '../components/TripForm/TripForm'
import SuggestedDestinations from "../components/SuggestedDestinations/SuggestedDestinations";
import RecentSavedTrips from "../components/RecentSavedTrips/RecentSavedTrips";
import Features from "../components/Features/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <SuggestedDestinations />
      <Features />
      <TripForm />
      <RecentSavedTrips />
    </>
  );
}
