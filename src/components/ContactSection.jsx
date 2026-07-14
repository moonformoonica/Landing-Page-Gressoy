import SectionHeading from "./SectionHeading.jsx";
import MapEmbed from "./MapEmbed.jsx";
import Reveal from "./Reveal.jsx";
import {
  InstagramIcon,
  TiktokIcon,
  WhatsappIcon,
  GmapsIcon,
} from "./icons.jsx";
import { CONTACT, LOCATION } from "../data/contact.js";

export default function ContactSection() {
  return (
    <section id="contact-us" className="bg-cream-50 py-16 sm:py-20">
      <div className="section-shell space-y-10">
        <SectionHeading
          title="Our Location"
          subtitle="Mampir langsung ke outlet kami di Purwokerto, atau sapa kami lewat kanal di bawah."
        />

        {/* Peta full-width + info card overlay */}
        <Reveal>
          <MapEmbed
            name={LOCATION.name}
            addressLines={LOCATION.addressLines}
            rating={LOCATION.rating}
            reviewCount={LOCATION.reviewCount}
            mapsUrl={LOCATION.mapsUrl}
            embedSrc={LOCATION.embedSrc}
          />
        </Reveal>

        {/* Info kontak pendukung */}
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "Jam Operasional",
              body: (
                <p className="mt-2 text-sm text-soya-800/80">
                  {LOCATION.hours}
                </p>
              ),
            },
            {
              title: "Hubungi Kami",
              body: (
                <>
                  <p className="mt-2 text-sm text-soya-800/80">
                    {CONTACT.whatsapp.display}
                  </p>
                  <a
                    href={CONTACT.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
                  >
                    <WhatsappIcon className="h-4 w-4" />
                    Order via WhatsApp
                  </a>
                </>
              ),
            },
            {
              title: "Sosial Media",
              body: (
                <div className="mt-3 flex flex-col items-center gap-2.5 text-sm">
                  <a
                    href={CONTACT.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-semibold text-soya-700 transition-colors hover:text-gold-600"
                  >
                    <InstagramIcon className="h-5 w-5" />
                    Instagram {CONTACT.instagram.handle}
                  </a>
                  <a
                    href={CONTACT.tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-semibold text-soya-700 transition-colors hover:text-gold-600"
                  >
                    <TiktokIcon className="h-5 w-5" />
                    TikTok {CONTACT.tiktok.handle}
                  </a>
                  <a
                    href={LOCATION.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-semibold text-soya-700 transition-colors hover:text-gold-600"
                  >
                    <GmapsIcon className="h-5 w-5" />
                    Google Maps
                  </a>
                </div>
              ),
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 110}>
              <div className="h-full rounded-3xl bg-white p-6 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1">
                <h3 className="font-display text-lg font-bold text-soya-700">
                  {card.title}
                </h3>
                {card.body}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Order online — background cream supaya tombol Gofood (hijau) tidak
            menyaru; tiap tombol deep-link langsung ke etalase resmi Gressoy */}
        <Reveal>
          <div className="rounded-3xl border-2 border-gold-400 bg-cream-100 p-8 text-center shadow-soft">
            <h3 className="font-display text-xl font-bold text-soya-800">
              Pesan Online dengan{" "}
              <span className="text-gold-600">"Gressoy"</span>
            </h3>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {CONTACT.orderPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${platform.color} rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110`}
                >
                  {platform.name}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
