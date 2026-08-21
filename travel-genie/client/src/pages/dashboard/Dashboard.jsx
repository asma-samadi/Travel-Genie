import HeroCard from "../../components/dashboard/HeroCard";
import StatsCards from "../../components/dashboard/statsCards";
import RecentTrips from "../../components/dashboard/RecentTrips";
import AISuggestions from "../../components/dashboard/AISuggestions";

function Dashboard() {
  return (
    <div
      className="
space-y-8
"
    >
      <HeroCard />

      <StatsCards />

      <AISuggestions />

      <RecentTrips />
    </div>
  );
}

export default Dashboard;
