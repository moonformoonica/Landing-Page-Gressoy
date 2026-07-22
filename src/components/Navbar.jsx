import { useEffect, useState } from 'react'
import logo from '../assets/logo-gressoy.png'

const NAV_ITEMS = [
  { id: 'about-us', label: 'About Us' },
  { id: 'our-products', label: 'Our Products' },
  { id: 'contact-us', label: 'Contact Us' },
]

export default function Navbar() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean)
    if (sections.length === 0) return

    // Scrollspy berbasis posisi: highlight mengikuti section yang sedang
    // melewati garis pemicu (±38% dari atas viewport). Pendekatan ini
    // deterministik untuk section yang tinggi & tidak "macet" saat berpindah
    // (mis. About Us -> Our Products), berbeda dengan perbandingan
    // intersectionRatio yang tidak andal untuk section berukuran besar.
    let ticking = false

    const updateActive = () => {
      ticking = false
      const triggerLine = window.innerHeight * 0.38

      // Mulai tanpa highlight: saat masih di Hero (belum sampai About Us),
      // tidak ada menu yang aktif. Highlight baru muncul setelah section
      // pertama melewati garis pemicu.
      let current = ''
      for (const section of sections) {
        // Section dianggap aktif jika bagian atasnya sudah melewati garis pemicu.
        if (section.getBoundingClientRect().top <= triggerLine) {
          current = section.id
        }
      }
      setActive(current)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateActive)
    }

    updateActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-sage-500/90 backdrop-blur">
      <nav className="section-shell flex flex-wrap items-center justify-end gap-3 py-2.5 sm:gap-4">
        <a
          href="#top"
          aria-label="Kembali ke atas"
          className="transition-transform duration-300 hover:scale-[1.03]"
        >
          <img
            src={logo}
            alt="GresSOY — Plant Based Milk"
            className="h-10 w-auto drop-shadow-[0_2px_6px_rgba(18,53,30,0.35)] sm:h-11"
          />
        </a>

        <ul className="flex items-center gap-0.5 rounded-full bg-gold-500 p-1 shadow-soft sm:gap-1 sm:p-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setActive(item.id)}
                  className={`inline-block rounded-full px-2.5 py-1.5 font-display text-xs font-semibold transition-all duration-300 sm:px-4 sm:text-sm ${
                    isActive
                      ? 'bg-cream-50 text-soya-900 shadow-soft'
                      : 'text-soya-900/85 hover:bg-gold-400 hover:text-soya-900'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
