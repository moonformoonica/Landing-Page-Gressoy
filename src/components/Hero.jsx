import { CONTACT } from "../data/contact.js";
import Reveal from "./Reveal.jsx";
import VideoShowcase from "./VideoShowcase.jsx";
import { WhatsappIcon } from "./icons.jsx";
import mascot from "../assets/mascot.png";
import kedelai from "../assets/kedelai.png";

// Mask lembut supaya taburan kedelai memudar di tepinya.
const softMask = {
  maskImage: "radial-gradient(ellipse at center, #000 38%, transparent 78%)",
  WebkitMaskImage:
    "radial-gradient(ellipse at center, #000 38%, transparent 78%)",
};

// Maskot memudar di sisi bawah supaya menyatu dengan background
const mascotFade = {
  maskImage: "linear-gradient(to bottom, #000 52%, transparent 94%)",
  WebkitMaskImage: "linear-gradient(to bottom, #000 52%, transparent 94%)",
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Kedelai menuang miring dari kedua sudut atas, tepinya memudar */}
      <img
        src={kedelai}
        alt=""
        aria-hidden="true"
        style={softMask}
        className="pointer-events-none absolute -left-20 -top-16 w-72 rotate-[18deg] opacity-40 sm:w-[26rem]"
      />
      <img
        src={kedelai}
        alt=""
        aria-hidden="true"
        style={softMask}
        className="pointer-events-none absolute -right-20 -top-16 w-72 -rotate-[18deg] -scale-x-100 opacity-40 sm:w-[26rem]"
      />

      <div className="animate-float-slow pointer-events-none absolute bottom-0 left-0">
        <img
          src={mascot}
          alt=""
          aria-hidden="true"
          style={mascotFade}
          className="w-20 -scale-x-100 sm:w-28 md:w-40 lg:w-56 xl:w-72"
        />
      </div>
      <div className="animate-float-slow pointer-events-none absolute bottom-0 right-0">
        <img
          src={mascot}
          alt="Maskot GresSOY memeluk botol-botol susu kedelai"
          style={mascotFade}
          className="w-20 sm:w-28 md:w-40 lg:w-56 xl:w-72"
        />
      </div>

      <div className="section-shell relative flex flex-col gap-12 py-12 sm:gap-14 sm:py-16">
        {/* Tiga video suasana */}
        <VideoShowcase />

        {/* Headline */}
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 pb-6 text-center lg:pb-16">
          <Reveal>
            <span className="whitespace-nowrap rounded-full bg-cream-100/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-normal text-soya-800 sm:px-4 sm:text-xs sm:tracking-widest">
              Susu Soya Premium · Pertama di Purwokerto
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="font-display text-xl font-black leading-tight text-gold-300 drop-shadow-md sm:text-6xl lg:text-7xl">
              Dijamin 100% tidak langu!
            </h1>
          </Reveal>

          <Reveal delay={111}>
            <p className="max-w-xl text-pretty text-base text-cream-50/90 sm:text-lg">
              Susu kedelai premium sejak 2019, hadir dalam 16 varian rasa dengan
              pemanis gula kelapa alami yang rendah kalori, segar, higienis, dan ramah
              untuk kamu yang intoleran laktosa.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#our-products"
                className="rounded-full bg-cream-100 px-6 py-3 font-display text-base font-bold text-soya-800 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Lihat Menu &amp; Harga
              </a>
              <a
                href={CONTACT.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-cream-100 px-6 py-3 font-display text-base font-bold text-cream-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream-100 hover:text-soya-800"
              >
                <WhatsappIcon className="h-4 w-4" />
                Order via WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
