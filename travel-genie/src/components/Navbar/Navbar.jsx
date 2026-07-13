import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-5 shadow">
      <h1 className="text-2xl font-bold text-blue-600">TravelGenie</h1>

      <div className="flex gap-5">
        <Link to="/">Home</Link>

        <Link to="/saved">Saved Trips</Link>
      </div>
    </nav>
  );
}
