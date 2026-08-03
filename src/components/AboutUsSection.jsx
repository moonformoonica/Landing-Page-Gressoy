import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { CONTACT, LOCATION } from "../data/contact.js";
import cup from "../assets/cup.png";
import gelas from "../assets/gelas.png";
import menuang from "../assets/video/menuangkan.gif";
import kedelai from "../assets/kedelai.png";

// Aliran kedelai menabur dari atas (memudar di ujung bawah).
const pourMask = {
  maskImage:
    "linear-gradient(to bottom, transparent 0%, #000 18%, #000 55%, transparent 95%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, #000 18%, #000 55%, transparent 95%)",
};

const STATS = [
  { value: "Sejak 2019", label: "Pionir soya modern" },
  { value: "16 Varian", label: "Rasa untuk dipilih" },
  { value: "100%", label: "Tidak langu" },
  { value: "Rendah Kalori", label: "Pemanis alami, Indeks Glikemik rendah" },
];

export default function AboutUsSection() {
  return (
    <section id="about-us" className="relative overflow-hidden py-16 sm:py-20">
      {/* ── Dekorasi desktop ── */}
      {/* Kedelai mengucur ke cup & gelas di pojok kiri-bawah */}
      <div className="pointer-events-none absolute bottom-10 left-0 hidden lg:block xl:left-6">
        <img
          src={kedelai}
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={pourMask}
          className="absolute -top-52 -left-7 w-64 opacity-95 xl:w-72"
        />
        <div className="relative flex items-start mt-8">
          <div className="animate-float-slow">
            <img
              src={cup}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="w-[120px] drop-shadow-2xl"
            />
          </div>
          <img
            src={gelas}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="mb-1 w-[110px] rotate-[10deg] drop-shadow-2xl ml-1 mt-8"
          />
        </div>
      </div>

      {/* GIF menuang, disejajarkan dengan baris stat card */}
      <div className="pointer-events-none absolute -right-16 top-[170px] hidden w-72 lg:block xl:w-80">
        <img
          src={menuang}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="relative w-full drop-shadow-2xl"
        />
      </div>

      <div className="section-shell relative">
        <SectionHeading tone="ink" title="Kenalan Yuk Sama Gressoy" />

        {/* Versi mobile/tablet: kedelai + cup & gelas menyembul dari kiri */}
        <Reveal className="lg:hidden">
          <div className="relative -ml-10 mb-2 mt-6 w-36 pt-14 sm:w-44 sm:pt-16">
            <img
              src={kedelai}
              alt=""
              aria-hidden="true"
              loading="lazy"
              style={pourMask}
              className="absolute -top-4 left-10 w-24 -rotate-3 opacity-95 sm:w-28"
            />
            <div className="relative ml-auto flex w-fit translate-x-6 -translate-y-4 items-end">
              <div className="animate-float-slow"></div>
                <img
                  src={cup}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="w-16 drop-shadow-2xl sm:w-[120px]"
                />
                <img
                  src={gelas}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="mb-1 ml-1 mt-8 w-14 rotate-[10deg] drop-shadow-2xl sm:w-[110px]"
                />
            </div>
          </div>
        </Reveal>

        {/* Cerita singkat di tengah, memberi ruang untuk dekorasi tepi */}
        <Reveal delay={120}>
          <div className="mx-auto max-w-2xl rounded-[2.5rem] bg-white/95 p-7 shadow-card sm:p-9 lg:p-10">
            <p className="text-base leading-relaxed text-soya-800/90 sm:text-lg">
              Semuanya berawal di Purwokerto tahun 2019, waktu susu kedelai
              kekinian masih jarang. Sejak itu kami setia mengolah kedelai
              pilihan jadi 16 rasa yang benar-benar bebas bau langu. Manisnya
              dari gula kelapa alami rendah kalori, jadi tetap enak walau kamu lagi
              jaga gula. Nggak cocok susu sapi? Punya kami ramah di perut, kok.
              Tinggal cari <strong>"Gressoy"</strong> di Gofood, Grabfood, atau
              ShopeeFood, atau mampir langsung ke outlet kami untuk Dine In maupun Take Away :)
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href={CONTACT.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold-500 px-5 py-2.5 text-base font-semibold text-soya-900 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
              >
                Follow {CONTACT.instagram.handle}
              </a>
              <a
                href={LOCATION.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-soya-300 px-5 py-2.5 text-base font-semibold text-soya-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-soya-500 hover:bg-soya-50"
              >
                Kunjungi Outlet Kami
              </a>
            </div>
          </div>
        </Reveal>

        {/* Badge/stat kecil biar scannable */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 100}>
              <div className="flex h-full flex-col justify-center rounded-2xl bg-cream-100 px-3 py-4 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:rotate-1">
                <p className="font-display text-lg font-bold text-soya-700">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-soya-800/70">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Versi mobile/tablet: GIF menuang di pojok kanan-bawah */}
        <Reveal className="lg:hidden" delay={160}> 
          <div className="relative -mr-5 ml-auto mt-4 h-40 w-40 sm:h-44 sm:w-44">
            <img
              src={menuang}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="animate-float-slow absolute -bottom-24 right-0 w-40 sm:w-52 drop-shadow-2xl"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}