import { useEffect, useState } from "react";
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

  // Scroll sengaja dijalankan lewat efek, bukan langsung di dalam handler
  // klik: kunci scroll body baru dilepas saat cleanup efek WelcomeGate, dan
  // itu terjadi SESUDAH requestAnimationFrame. Kalau dipaksa lebih awal,
  // scrollIntoView dipanggil selagi halaman masih terkunci dan tidak
  // menghasilkan gerakan apa pun. Efek anak selalu dibersihkan lebih dulu
  // daripada efek induk, jadi di titik ini kuncinya dijamin sudah lepas.
  useEffect(() => {
    if (!entered) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.getElementById("showcase")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  }, [entered]);

  return (
    <>
      {/* Tetap terpasang setelah diklik: layar sambutan ini yang jadi jarak
          scroll-nya, dan kalau dilepas halaman akan melompat sejauh satu layar
          di tengah animasi. Navbar sengaja ditaruh sesudahnya supaya tidak
          menimpa layar sambutan; ia baru menempel di atas setelah dilewati. */}
      <WelcomeGate locked={!entered} onEnter={() => setEntered(true)} />
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
