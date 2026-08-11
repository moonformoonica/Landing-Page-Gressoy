/**
 * Embed Google Maps full-width + kartu detail tempat.
 *
 * Kartu detailnya datang dari dua sumber, tergantung lebar layar:
 *
 * - Layar lebar (lg ke atas): dipakai kartu bawaan Google di dalam iframe.
 *   Isinya (nama, alamat, rating, tombol rute) selalu live dan tidak perlu
 *   kita urus. Kartu kita sengaja disembunyikan di sini, karena dulu keduanya
 *   sama-sama menempel di pojok kiri-atas dan selalu bertumpuk — isi iframe
 *   tidak bisa kita geser sama sekali karena beda domain.
 *
 * - Layar sempit: Google menyembunyikan sendiri kartu bawaannya kalau iframe
 *   terlalu sempit, jadi di sini kartu kita yang dipakai. Ditaruh di bawah
 *   peta (bukan menimpa) supaya tidak mungkin bertumpuk seandainya Google
 *   berubah pikiran soal ambang lebarnya.
 */
export default function MapEmbed({
  name,
  addressLines,
  rating,
  reviewCount,
  mapsUrl,
  embedSrc,
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-card">
      <iframe
        title={`Lokasi ${name}`}
        src={embedSrc}
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block w-full"
      />

      {/* Kartu detail versi layar sempit */}
      <div className="border-t border-gray-100 p-4 lg:hidden">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-gray-900">{name}</h3>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buka ${name} di Google Maps (tab baru)`}
            className="mt-0.5 shrink-0 text-gray-400 transition-colors hover:text-gray-600"
          >
            {/* icon: external link */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        <p className="mt-1 text-xs leading-snug text-gray-600">
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className="font-semibold text-gray-800">
            {rating.toFixed(1)}
          </span>
          <span
            className="text-gold-500"
            aria-label={`Rating ${rating} dari 5 bintang`}
          >
            {"★".repeat(Math.round(rating))}
          </span>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            ({reviewCount})
          </a>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
        >
          {/* icon: directions */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.71 11.29 12.71 2.3a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.41l9 9a1 1 0 0 0 1.42 0l9-9a1 1 0 0 0 0-1.42ZM14 14.5V12h-4v3H8v-4a1 1 0 0 1 1-1h5V7.5l3.5 3.5Z" />
          </svg>
          Rute ke sini
        </a>
      </div>
    </div>
  );
}
