import { useEffect } from "react";
import logo from "../assets/logo-gressoy.webp";

/**
 * Layar sambutan setinggi satu layar penuh di paling atas halaman.
 *
 * Sengaja ikut mengalir di dalam halaman (bukan overlay melayang) supaya waktu
 * logonya diklik, halaman benar-benar ter-scroll turun ke deretan video —
 * kelihatan bergerak, bukan tiba-tiba berganti layar.
 *
 * Selama belum diklik, scroll halaman dikunci: selain menjaga alurnya, ketukan
 * di sini juga jadi izin yang diminta browser untuk memutar audio bersuara.
 * BackgroundMusic tidak perlu dihubungkan khusus — ia sudah memasang pendengar
 * di document, jadi klik logo ini otomatis membuka suaranya.
 */
export default function WelcomeGate({ locked, onEnter }) {
  useEffect(() => {
    if (!locked) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);

  return (
    <section
      id="welcome-gate"
      className="relative flex h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-br from-gold-400 via-sage-400 to-soya-700 px-6 text-center"
    >
      {/* Semburat terang di belakang logo biar bagian tengah tidak datar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream-100/35 blur-3xl sm:h-[34rem] sm:w-[34rem]"
      />

      <button
        type="button"
        onClick={onEnter}
        aria-label="Masuk ke halaman Gressoy"
        className="group relative rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-cream-50/70"
      >
        {/* Float dan scale dipisah ke dua elemen: keduanya memakai transform,
            kalau ditumpuk di satu elemen yang satu akan menimpa yang lain.
            Kelas drop-shadow bawaan Tailwind juga sengaja tidak dipakai di
            gambarnya: sama-sama mengatur `filter` dengan animate-logo-glow,
            jadi salah satunya pasti tertimpa dan nyalanya tidak muncul. */}
        <span className="animate-float-slow block">
          <img
            src={logo}
            alt="Gressoy"
            className="animate-logo-glow w-64 max-w-[72vw] object-contain transition-transform duration-300 group-hover:scale-105 group-active:scale-95 sm:w-80 lg:w-96"
          />
        </span>
      </button>

      <p className="relative font-display text-2xl font-bold text-soya-900 drop-shadow-[0_2px_10px_rgba(255,253,242,0.55)] sm:text-4xl">
        Click the button above to scroll :)
      </p>
    </section>
  );
}
