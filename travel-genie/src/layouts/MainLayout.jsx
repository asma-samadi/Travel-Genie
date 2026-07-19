import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-gray-900 transition-colors duration-300 dark:bg-[#0F172A] dark:text-gray-100">
      <Navbar />

      <main className="min-h-[80vh]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
