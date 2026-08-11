import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import AboutUsSection from "../components/AboutUsSection.jsx";
import OurProductsSection from "../components/OurProductsSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import Footer from "../components/Footer.jsx";
import BackgroundMusic from "../components/BackgroundMusic.jsx";
import WelcomeGate from "../components/WelcomeGate.jsx";

export default function Home() {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);

    // Dua frame: satu untuk melepas layar sambutan, satu lagi supaya scroll
    // dihitung setelah kunci scroll body benar-benar dilepas.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        document.getElementById("showcase")?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "center",
        });
      });
    });
  };

  return (
    <>
      {!entered && <WelcomeGate onEnter={handleEnter} />}
      <Navbar />
      <main>
        <div className="bg-gradient-to-b from-sage-400 via-sage-500 to-soya-700">
          <Hero />
          <AboutUsSection />
        </div>
        <OurProductsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackgroundMusic />
    </>
  );
}
