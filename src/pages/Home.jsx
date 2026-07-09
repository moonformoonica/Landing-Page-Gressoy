import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import AboutUsSection from "../components/AboutUsSection.jsx";
import OurProductsSection from "../components/OurProductsSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import Footer from "../components/Footer.jsx";

/**
 * Single-page layout: navbar pill (About Us / Our Products / Contact Us)
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/*medium (#7FB77E) di atas menuju hijau tua (#2F6B3F) di bawah, supaya transisinya halus dan tidak terkotak-kotak. */}
        <div className="bg-gradient-to-b from-sage-400 via-sage-500 to-soya-700">
          <Hero />
          <AboutUsSection />
        </div>
        <OurProductsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
