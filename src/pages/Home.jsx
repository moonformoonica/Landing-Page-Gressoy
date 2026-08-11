import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import AboutUsSection from "../components/AboutUsSection.jsx";
import OurProductsSection from "../components/OurProductsSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import Footer from "../components/Footer.jsx";
import BackgroundMusic from "../components/BackgroundMusic.jsx";
import WelcomeGate from "../components/WelcomeGate.jsx";

// Dijalankan sekali saat modul dimuat, sebelum React sempat merender.
// Tanpa ini browser mengembalikan posisi scroll terakhir waktu halaman
// di-refresh, sehingga pengunjung bisa mendarat di tengah halaman padahal
// scroll-nya sedang dikunci layar sambutan — dan jadi tidak bisa ke mana-mana.
if (typeof history !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Lompat ke paling atas tanpa animasi. scroll-behavior halaman ini "smooth",
// jadi kalau tidak dimatikan sementara, perpindahannya jadi beranimasi dan
// pengunjung sempat melihat halaman tengah tergulung ke atas.
function jumpToTop() {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previous;
}

export default function Home() {
  // Pakai penghitung, bukan boolean: nilainya berubah tiap kali logo diklik,
  // jadi efek scroll ikut jalan lagi kalau pengunjung menggulung balik ke
  // layar sambutan dan mengklik logonya untuk kedua kalinya.
  const [enterCount, setEnterCount] = useState(0);
  const entered = enterCount > 0;

  // Selalu mulai dari layar sambutan setiap kali halaman dibuka/di-refresh.
  useEffect(() => {
    jumpToTop();

    // Kembali ke halaman ini lewat tombol back/forward tidak menjalankan ulang
    // komponen: browser memulihkannya utuh dari cache, lengkap dengan posisi
    // scroll terakhir. Jadi kondisinya perlu dikembalikan manual di sini.
    const onPageShow = (event) => {
      if (!event.persisted) return;
      setEnterCount(0);
      jumpToTop();
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // Scroll sengaja dijalankan lewat efek, bukan langsung di dalam handler
  // klik: kunci scroll body baru dilepas saat cleanup efek WelcomeGate, dan
  // efek anak selalu dibersihkan lebih dulu daripada efek induk. Jadi di titik
  // ini kuncinya dijamin sudah lepas dan scroll-nya pasti bergerak.
  useEffect(() => {
    if (enterCount === 0) return;

    const gate = document.getElementById("welcome-gate");
    if (!gate) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Berhenti tepat di ujung bawah layar sambutan: navbar langsung menempel
    // di paling atas dan tidak ada sisa gradasi yang menggantung. Memakai
    // scrollIntoView ke deretan video akan berhenti di tengah dan menyisakan
    // pita gate di atas navbar.
    window.scrollTo({
      top: gate.offsetTop + gate.offsetHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [enterCount]);

  return (
    <>
      {/* Tetap terpasang setelah diklik: layar sambutan ini yang jadi jarak
          scroll-nya, dan kalau dilepas halaman akan melompat sejauh satu layar
          di tengah animasi. Navbar sengaja ditaruh sesudahnya supaya tidak
          menimpa layar sambutan; ia baru menempel di atas setelah dilewati. */}
      <WelcomeGate
        locked={!entered}
        onEnter={() => setEnterCount((n) => n + 1)}
      />
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
