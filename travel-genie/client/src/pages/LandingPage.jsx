import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Destinations from "../components/home/Destinations";
import HowItWorks from "../components/home/HowItWorks";
import Footer from "../components/home/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Features />

        <Destinations />

        <HowItWorks />
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;