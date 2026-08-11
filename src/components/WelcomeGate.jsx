

import { useEffect } from "react";
import logo from "../assets/logo-gressoy.webp";
import mascot from "../assets/mascot.webp";

/**
 * Layar sambutan yang menutupi halaman sampai pengunjung mengetuk logo.
 *
 * Fungsinya bukan sekadar hiasan: browser melarang audio bersuara sebelum ada
 * interaksi, jadi ketukan di layar ini sekaligus menjadi izin yang diminta
 * browser. Backsound tidak perlu dihubungkan ke sini secara khusus —
 * BackgroundMusic sudah memasang pendengar di document, jadi klik apa pun
 * (termasuk klik logo ini) otomatis membuka suaranya.
 *
 * Warnanya memakai gradasi hijau-kuning yang sudah dipakai landing page:
 * gold-400 -> sage-400 -> soya-700.
 */
export default function WelcomeGate({ onEnter }) {
  // Kunci scroll selama layar sambutan terbuka, biar halaman di belakangnya
  // tidak ikut bergeser. Dikembalikan lagi waktu komponennya dilepas.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Selamat datang di Gressoy"
      className="fixed inset-0 z-[60] overflow-hidden bg-gradient-to-br from-gold-400 via-sage-400 to-soya-700"
    >
      {/* Semburat terang di belakang logo biar bagian tengah tidak datar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream-100/35 blur-3xl sm:h-[34rem] sm:w-[34rem]"
      />

      {/* Maskot menyembul dari pojok kanan-bawah */}
      <img
        src={mascot}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-2 -right-4 w-32 drop-shadow-2xl sm:w-44 lg:w-56"
      />

      <div className="relative flex h-full flex-col items-center justify-center gap-7 px-6 text-center">
        <button
          type="button"
          autoFocus
          onClick={onEnter}
          aria-label="Masuk ke halaman Gressoy"
          className="group relative rounded-full outline-none focus-visible:ring-4 focus-visible:ring-cream-50/70"
        >
          {/* Denyut pelan sebagai ajakan untuk diketuk */}
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-cream-50/40"
          />
          <span className="relative block rounded-full bg-white p-5 shadow-card transition-transform duration-300 group-hover:scale-105 group-active:scale-95 sm:p-7">
            <img
              src={logo}
              alt=""
              className="h-24 w-24 object-contain sm:h-32 sm:w-32"
            />
          </span>
        </button>

        <p className="font-display text-2xl font-bold text-soya-900 drop-shadow-[0_2px_10px_rgba(255,253,242,0.55)] sm:text-4xl">
          Click aku untuk mampir!
        </p>
      </div>
    </div>
  );
}
