import { CONTACT, LOCATION } from '../data/contact.js'
import { InstagramIcon, TiktokIcon, WhatsappIcon, GmapsIcon } from './icons.jsx'

const LINKS = [
  {
    label: 'WhatsApp',
    url: CONTACT.whatsapp.url,
    icon: <WhatsappIcon className="h-4 w-4 text-[#25D366]" />,
  },
  { label: 'Instagram', url: CONTACT.instagram.url, icon: <InstagramIcon className="h-4 w-4" /> },
  { label: 'TikTok', url: CONTACT.tiktok.url, icon: <TiktokIcon className="h-4 w-4" /> },
  { label: 'Google Maps', url: LOCATION.mapsUrl, icon: <GmapsIcon className="h-4 w-4" /> },
]

export default function Footer() {
  return (
    <footer className="bg-soya-900 py-8 text-cream-100">
      <div className="section-shell flex flex-col items-center gap-3 text-center text-sm">
        <p className="font-display text-lg font-bold">Gressoy Indonesia</p>
        <p className="max-w-md text-cream-100/70">{LOCATION.addressLines.join(' ')}</p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          {LINKS.map(({ label, url, icon }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cream-100/90 transition-colors hover:text-gold-400"
            >
              {/* chip putih kecil biar logo berwarna tetap terbaca di bg gelap */}
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white shadow-soft">
                {icon}
              </span>
              {label}
            </a>
          ))}
        </div>
        <p className="text-cream-100/50">
          © {new Date().getFullYear()} Gressoy Indonesia. Susu kedelai asli Purwokerto.
        </p>
      </div>
    </footer>
  )
}
