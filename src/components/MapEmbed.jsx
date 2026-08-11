/**
 * Embed Google Maps full-width + kartu detail tempat.
 *
 * Kartu detailnya datang dari dua sumber, tergantung lebar layar:
 *
 * - Layar lebar (lg ke atas): dipakai kartu bawaan Google di dalam iframe.
 *   Isinya selalu live dan tidak perlu kita urus.
 *
 * - Layar sempit: Google menciutkan kartunya sendiri jadi tombol kecil
 *   "Buka di Maps". Diuji di lebar 380, 560, dan 760 — ketiganya tetap ciut,
 *   jadi ambangnya jauh di atas lebar HP dan tidak bisa dipaksa dari luar
 *   (isi iframe beda domain). Karena itu kartu kita sendiri yang dipakai,
 *   dibuat semirip mungkin dengan kartu Google dan ditempel di pojok yang sama
 *   supaya tampilannya setara versi desktop. Ukurannya menutupi penuh tombol
 *   ciut Google di baliknya, jadi tidak ada yang mengintip dari belakang.
 *
 * Angka ratingnya live dari /api/rating, sumbernya halaman Google juga.
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
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-card">
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

      {/* Kartu versi layar sempit, meniru kartu bawaan Google */}
      <div className="absolute left-3 top-3 w-[15.5rem] rounded-lg bg-white p-3 shadow-card sm:w-64 sm:p-4 lg:hidden">
        <h3 className="text-[15px] font-semibold leading-tight text-gray-900">
          {name}
        </h3>

        <p className="mt-1 text-xs leading-snug text-gray-600">
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <div className="mt-2 flex items-center gap-1 text-xs text-gray-800">
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span className="text-gold-500" aria-hidden="true">
            ★
          </span>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${reviewCount} ulasan di Google Maps (tab baru)`}
            className="text-blue-600 hover:underline"
          >
            ({reviewCount})
          </a>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
          >
            {/* icon: external link */}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Buka di Maps
          </a>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Rute ke ${name} (tab baru)`}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
          >
            {/* icon: directions */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M21.71 11.29 12.71 2.3a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.41l9 9a1 1 0 0 0 1.42 0l9-9a1 1 0 0 0 0-1.42ZM14 14.5V12h-4v3H8v-4a1 1 0 0 1 1-1h5V7.5l3.5 3.5Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
