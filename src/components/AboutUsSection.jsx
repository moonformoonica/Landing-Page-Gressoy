import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { CONTACT, LOCATION } from '../data/contact.js'
import soybeanHand from '../assets/soybean-hand.png'
import cup from '../assets/cup.png'
import gelas from '../assets/gelas.png'
import kedelai from '../assets/kedelai.png'

const STATS = [
  { value: 'Sejak 2019', label: 'Pionir soya modern' },
  { value: '20+ Varian', label: 'Rasa untuk dipilih' },
  { value: '100%', label: 'Tidak langu' },
  { value: 'Rendah Kalori', label: 'Pemanis alami, Indeks Glikemik rendah' },
]

// Aliran kedelai menabur dari atas (memudar di ujung bawah).
const pourMask = {
  maskImage: 'linear-gradient(to bottom, transparent 0%, #000 18%, #000 55%, transparent 95%)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 18%, #000 55%, transparent 95%)',
}

/**
 * About Us mengikuti komposisi referensi Figma: tangan menyembul dari tepi
 * kiri sedang ditaburi kedelai, cerita singkat di tengah, dan cup + gelas
 * di pojok kanan-bawah dengan aliran kedelai panjang menabur dari atas —
 * semua elemen nempel pojok/tepi supaya terasa natural, tidak bertumpuk.
 */
export default function AboutUsSection() {
  return (
    <section id="about-us" className="relative overflow-hidden py-16 sm:py-20">
      {/* ── Dekorasi desktop ── */}
      {/* Tangan menyembul dari tepi kiri + taburan kedelai besar mengucur ke telapak */}
      <div className="pointer-events-none absolute -left-24 top-44 hidden w-[24rem] lg:block xl:w-[27rem]">
        <img
          src={kedelai}
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={pourMask}
          className="absolute -top-24 left-[46%] w-72 -translate-x-1/2 rotate-3 opacity-95 xl:w-80"
        />
        <img
          src={soybeanHand}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="animate-float-slow relative w-full drop-shadow-2xl"
        />
      </div>

      {/* Aliran kedelai panjang di tepi kanan, mengucur ke cup & gelas di pojok bawah */}
      <div className="pointer-events-none absolute bottom-6 right-0 hidden lg:block xl:right-6">
        <img
          src={kedelai}
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={pourMask}
          className="absolute -top-52 right-0 w-64 -rotate-3 opacity-95 xl:w-72"
        />
        <div className="relative flex items-end">
          <img
            src={gelas}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-28 -rotate-6 drop-shadow-2xl"
          />
          <img
            src={cup}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="animate-float-slow -ml-6 w-32 rotate-3 drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="section-shell relative">
        <SectionHeading tone="ink" title="Kenalan Yuk Sama Gressoy" />

        {/* Versi mobile/tablet: tangan menyembul dari kiri, ditaburi kedelai besar */}
        <Reveal className="lg:hidden">
          <div className="relative -ml-14 mb-2 w-64 sm:w-72">
            <img
              src={kedelai}
              alt=""
              aria-hidden="true"
              loading="lazy"
              style={pourMask}
              className="absolute -top-10 left-[46%] w-44 -translate-x-1/2 opacity-95"
            />
            <img
              src={soybeanHand}
              alt="Kedelai pilihan di telapak tangan"
              loading="lazy"
              className="relative w-full drop-shadow-2xl"
            />
          </div>
        </Reveal>

        {/* Cerita singkat — di tengah, memberi ruang untuk dekorasi tepi */}
        <Reveal delay={120}>
          <div className="mx-auto max-w-2xl rounded-[2.5rem] bg-white/95 p-7 shadow-card sm:p-9 lg:p-10">
            <p className="text-base leading-relaxed text-soya-800/90 sm:text-lg">
              Semuanya berawal di Purwokerto tahun 2019, waktu susu kedelai kekinian
              masih jarang. Sejak itu kami setia mengolah kedelai pilihan jadi 20+ rasa
              yang benar-benar bebas bau langu. Manisnya dari pemanis alami rendah
              kalori, jadi tetap enak walau kamu lagi jaga gula. Nggak cocok susu sapi?
              Punya kami ramah di perut, kok. Tinggal cari <strong>"Gressoy"</strong> di
              Gofood, Grabfood, atau ShopeeFood — atau mampir langsung ke outlet kami.
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
                <p className="font-display text-lg font-bold text-soya-700">{stat.value}</p>
                <p className="mt-1 text-xs text-soya-800/70">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Versi mobile/tablet dari cup + gelas pojok kanan-bawah, kedelai menabur dari atas */}
        <Reveal className="lg:hidden" delay={160}>
          <div className="relative ml-auto mt-10 w-36 pt-14 sm:w-44 sm:pt-16">
            <img
              src={kedelai}
              alt=""
              aria-hidden="true"
              loading="lazy"
              style={pourMask}
              className="absolute -top-2 right-4 w-24 -rotate-3 opacity-95 sm:w-28"
            />
            <div className="relative flex items-end justify-end">
              <img
                src={gelas}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="w-16 -rotate-6 drop-shadow-2xl sm:w-20"
              />
              <img
                src={cup}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="animate-float-slow -ml-3 w-20 rotate-3 drop-shadow-2xl sm:w-24"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
