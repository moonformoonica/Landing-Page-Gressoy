/**
 * Embed Google Maps full-width + info card overlay custom (pojok kiri atas):
 * nama tempat, alamat 4 baris, rating bintang + jumlah review (clickable),
 * ikon "buka di tab baru" dan ikon "directions". Reusable via props.
 */
export default function MapEmbed({ name, addressLines, rating, reviewCount, mapsUrl, embedSrc }) {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-card">
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

      {/* Info card overlay ala Google Maps */}
      <div className="absolute left-3 top-3 w-64 rounded-lg bg-white p-4 shadow-card sm:left-5 sm:top-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-gray-900">{name}</h3>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buka ${name} di Google Maps (tab baru)`}
            className="mt-0.5 text-gray-400 transition-colors hover:text-gray-600"
          >
            {/* icon: external link */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
          <span className="font-semibold text-gray-800">{rating.toFixed(1)}</span>
          <span className="text-gold-500" aria-label={`Rating ${rating} dari 5 bintang`}>
            {'★'.repeat(Math.round(rating))}
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
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
        >
          {/* icon: directions */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.71 11.29 12.71 2.3a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.41l9 9a1 1 0 0 0 1.42 0l9-9a1 1 0 0 0 0-1.42ZM14 14.5V12h-4v3H8v-4a1 1 0 0 1 1-1h5V7.5l3.5 3.5Z" />
          </svg>
          Rute ke sini
        </a>
      </div>
    </div>
  )
}
