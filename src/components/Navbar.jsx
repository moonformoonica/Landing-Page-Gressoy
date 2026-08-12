import { useEffect, useState } from 'react'
import logo from '../assets/logo-gressoy.webp'

const NAV_ITEMS = [
  { id: 'about-us', label: 'About Us' },
  { id: 'our-products', label: 'Our Products' },
  { id: 'contact-us', label: 'Contact Us' },
]

// Safari lama (iOS < 15.4) tidak mengenal bentuk objek pada window.scrollTo.
// Yang terjadi bukan sekadar "tidak mulus": objeknya dibaca sebagai koordinat
// kosong, jadi halaman malah melompat ke paling atas. Karena itu bentuk objek
// hanya dipakai kalau browsernya memang mendukung; kalau tidak, dipakai bentuk
// dua-argumen yang didukung semua browser.
const supportsSmoothScroll = () =>
  typeof document !== 'undefined' &&
  'scrollBehavior' in document.documentElement.style

// Jarak napas antara garis bawah navbar dan judul section setelah mendarat.
const HEADING_GAP = 30

// Beberapa section minta jarak berbeda. About Us punya dekorasi tinggi
// (kedelai tercurah, cup & gelas, gambar menuang) yang mengapit judul di kiri
// dan kanan; kalau judulnya ditempel rapat ke navbar, dekorasi itu ikut
// terpotong dan section-nya terasa sesak. Angka di sini tinggal diubah kalau
// jaraknya masih terasa kurang atau kelebihan.
const HEADING_GAP_KHUSUS = {
  'about-us': 150,
}

/**
 * Gulung ke sebuah section sampai judulnya berhenti sedikit di bawah navbar.
 *
 * Yang dijadikan patokan sengaja judulnya, bukan tepi atas section. Tiap
 * section punya padding atas 80px; kalau tepi section yang ditempelkan ke
 * navbar, seluruh padding itu ikut terlihat sebagai ruang kosong dan judulnya
 * terlempar jauh ke bawah. Dengan berpatokan pada judul, jarak yang terlihat
 * selalu sama (30px) berapa pun padding section-nya.
 *
 * Tinggi navbar diukur saat diklik, bukan ditulis tetap, karena navbar lebih
 * pendek di layar kecil daripada di desktop — kalau dipatok satu angka,
 * judulnya bisa ketutupan di satu ukuran layar dan terlalu turun di ukuran
 * lain. Diukur ulang tiap klik juga menjaga hasilnya tetap benar setelah layar
 * diputar atau jendela diubah ukurannya.
 */
function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return

  // Hero tidak punya judul; untuk kasus itu tepi section yang dipakai.
  const anchor = target.querySelector('h2') || target

  // Dihitung ulang tiap dipanggil, bukan sekali di awal: posisinya bisa
  // bergeser selagi animasi berjalan.
  const gap = HEADING_GAP_KHUSUS[id] ?? HEADING_GAP

  const posisiTujuan = () => {
    const header = document.querySelector('header')
    const navHeight = header ? header.getBoundingClientRect().height : 0
    return Math.round(
      anchor.getBoundingClientRect().top + window.scrollY - navHeight - gap,
    )
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!supportsSmoothScroll() || reduceMotion) {
    window.scrollTo(0, posisiTujuan())
    return
  }

  window.scrollTo({ top: posisiTujuan(), behavior: 'smooth' })

  // Gerakan mulus menuju satu angka yang dikunci saat animasi dimulai. Kalau di
  // tengah jalan ada gambar/video di atas target yang baru selesai dimuat,
  // seluruh isi halaman bergeser turun dan angka tadi jadi tidak berlaku lagi —
  // hasilnya berhenti sebelum sampai. Jadi setelah gerakannya diam, posisinya
  // dihitung ulang dan dikoreksi kalau meleset.
  //
  // Koreksi dibatalkan begitu pengunjung menggulung/menyentuh sendiri, supaya
  // halaman tidak "melawan" tangan mereka.
  let dibatalkan = false
  const batalkan = () => {
    dibatalkan = true
  }
  const INTERUPSI = ['wheel', 'touchstart', 'keydown']
  INTERUPSI.forEach((e) =>
    window.addEventListener(e, batalkan, { passive: true }),
  )

  const selesai = () => {
    window.clearInterval(pemantau)
    INTERUPSI.forEach((e) => window.removeEventListener(e, batalkan))
  }

  const mulai = Date.now()
  let posisiTerakhir = window.scrollY
  let hitunganDiam = 0

  const pemantau = window.setInterval(() => {
    // Batas waktu: jangan memantau selamanya kalau animasinya tidak pernah diam.
    if (dibatalkan || Date.now() - mulai > 3000) {
      selesai()
      return
    }

    const sekarang = window.scrollY
    hitunganDiam = Math.abs(sekarang - posisiTerakhir) < 1 ? hitunganDiam + 1 : 0
    posisiTerakhir = sekarang
    if (hitunganDiam < 2) return

    selesai()
    const seharusnya = posisiTujuan()
    if (Math.abs(window.scrollY - seharusnya) <= 2) return

    // Koreksinya harus instan. Kalau dibiarkan, window.scrollTo mewarisi
    // `scroll-behavior: smooth` dari CSS halaman dan koreksinya ikut
    // beranimasi — animasi kedua yang bisa meleset lagi dengan sebab yang sama.
    const root = document.documentElement
    const gaya = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, seharusnya)
    root.style.scrollBehavior = gaya
  }, 100)
}

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
      <nav className="flex w-full flex-wrap items-center justify-center gap-3 px-4 py-2.5 sm:justify-end sm:gap-4 sm:pl-6 sm:pr-5 lg:pl-8 lg:pr-6">
        {/* Ikut ditangani sendiri, bukan dibiarkan sebagai anchor biasa: anchor
            biasa menuliskan "#top" ke alamat halaman, dan kalau pengunjung
            me-refresh dengan alamat itu browser langsung melompat ke Hero —
            layar sambutan jadi terlewat. */}
        <a
          href="#top"
          aria-label="Kembali ke atas"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('top')
          }}
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
                  onClick={(e) => {
                    e.preventDefault()
                    setActive(item.id)
                    scrollToSection(item.id)
                  }}
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
