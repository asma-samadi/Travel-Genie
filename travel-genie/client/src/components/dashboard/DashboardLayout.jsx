import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import DashboardHeader from "./DashboardHeader";

import dashboardBg from "../../assets/images/dashboard-bg.jpg";



function DashboardLayout() {
  return (
    <div
      className="
    relative
    min-h-screen
    w-full
    overflow-hidden
  "
    >
      {/* Background */}

      <img
        src={dashboardBg}
        alt="travel background"
        className="
    fixed
    inset-0
    w-full
    h-full
    object-cover
    scale-105
    -z-20
  "
      />

      {/* Overlay */}

      <div
        className="
    fixed
    inset-0
    bg-gradient-to-br
    from-[#071A2B]/80
    via-[#09263F]/70
    to-[#020617]/90
    -z-10
  "
      />

      {/* Glow */}

      <div
        className="
          absolute
          -top-40
          -left-40

          w-[500px]
          h-[500px]

          rounded-full

          bg-cyan-400/20

          blur-[160px]
        "
      />

      <div
        className="
          absolute

          bottom-[-150px]
          right-[-150px]

          w-[450px]
          h-[450px]

          rounded-full

          bg-blue-500/20

          blur-[150px]
        "
      />

      {/* Layout */}

      <div
        className="
    relative
    z-10
    w-full
    p-4
    lg:p-6
  "
      >
        {/* Desktop sidebar */}

        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile sidebar */}

        <div className="lg:hidden">
          <MobileSidebar />
        </div>

        {/* Main content */}

        <div
          className="
    lg:ml-[264px]
    min-w-0
  "
        >
          <DashboardHeader />

          <main
            className="
      px-3
      py-5

      sm:px-6

      lg:px-8

      pb-20
    "
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;