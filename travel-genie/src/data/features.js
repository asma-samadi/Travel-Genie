import {
  FaRobot,
  FaMoneyBillWave,
  FaSuitcaseRolling,
  FaMapMarkedAlt,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "AI Itinerary",
    description:
      "Generate personalized day-by-day travel plans based on your destination, budget, and travel style.",
    icon: FaRobot,
  },
  {
    id: 2,
    title: "Budget Planner",
    description:
      "Estimate accommodation, food, transport, and activity costs before your trip.",
    icon: FaMoneyBillWave,
  },
  {
    id: 3,
    title: "Packing Assistant",
    description:
      "Receive a smart packing checklist based on your destination and season.",
    icon: FaSuitcaseRolling,
  },
  {
    id: 4,
    title: "Activity Finder",
    description:
      "Discover popular attractions, restaurants, and experiences for your destination.",
    icon: FaMapMarkedAlt,
  },
];

export default features;
