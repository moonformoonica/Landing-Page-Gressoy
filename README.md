# SoyaCore Landing Page — GresSOY by Gressoy Indonesia

Landing page single-page untuk GresSOY (susu kedelai asli Purwokerto): Hero, About Us, Our Products (menu & harga lengkap), dan Contact Us (Google Maps + kontak).

**Stack:** React 18 + Vite 5 + TailwindCSS 3.

## Menjalankan di Lokal (VS Code)

```bash
# 1. Install dependencies (sekali saja)
npm install

# 2. Jalankan dev server
npm run dev
# buka http://localhost:5173

# 3. Build production
npm run build
# hasil build ada di folder dist/

# (opsional) preview hasil build
npm run preview
```

## Struktur Project

```
src/
├── assets/          # logo, maskot, foto brand (PNG) + video/ (klip suasana .mp4)
├── components/      # Navbar, Hero, AboutUsSection, OurProductsSection,
│                    # MenuCard, ContactSection, MapEmbed, Footer, SectionHeading
├── pages/Home.jsx   # single-page layout berisi semua section
├── data/menu.js     # ★ data menu & harga — edit di sini kalau harga berubah
├── data/contact.js  # ★ alamat, rating, jam buka, WA, sosmed, link Maps
└── styles/          # Tailwind entry + util global
```

**Mengedit harga/menu:** cukup ubah `src/data/menu.js` (harga `null` = ukuran tidak tersedia, otomatis disembunyikan dari kartu).
**Mengedit kontak/lokasi:** cukup ubah `src/data/contact.js`.
**Mengedit warna/font brand:** semua design token terpusat di `tailwind.config.js` — warna diambil presisi (pixel-sampled) dari logo & maskot resmi: hijau `#00A742`, daun `#006738`, oranye `#FFA800`, hijau tua `#1A4A2A`.

## Deploy Gratis ke Vercel (paling simpel)

### Cara A — via GitHub (auto-deploy tiap push, direkomendasikan)

1. Push project ini ke repository GitHub:
   ```bash
   git init
   git add .
   git commit -m "SoyaCore landing page"
   git branch -M main
   git remote add origin https://github.com/<moonformoonica>/soyacore-landing.git
   git push -u origin main
   ```
2. Buka [vercel.com](https://vercel.com) → login dengan GitHub → **Add New → Project**.
3. Pilih repo `soyacore-landing` → Vercel otomatis mendeteksi **Vite** (build: `npm run build`, output: `dist`) → klik **Deploy**.
4. Selesai — dapat URL `https://soyacore-landing.vercel.app`. Setiap `git push` berikutnya otomatis ter-deploy.

### Cara B — via CLI (tanpa GitHub)

```bash
npm install -g vercel
vercel          # ikuti prompt, terima default
vercel --prod   # deploy ke production
```

## Catatan

- Tidak ada API key/secret apa pun di project ini — Google Maps memakai embed publik (`output=embed`), tanpa key.
- Nomor WhatsApp & alamat outlet adalah informasi publik bisnis.
- Asset di `src/assets/` adalah asset resmi brand (logo GresSOY, maskot, foto kedelai) yang sudah di-resize untuk web. Kalau ingin mengganti, timpa file dengan nama yang sama tanpa perlu mengubah kode.
