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

    const observer = new IntersectionObserver(
      (entries) => {
        // Pilih section yang paling banyak terlihat di viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-sage-500/90 backdrop-blur">
      <nav className="section-shell flex flex-wrap items-center justify-between gap-3 py-2.5">
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
