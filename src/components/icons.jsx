export function InstagramIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="igGrad" cx="30%" cy="110%" r="140%">
          <stop offset="0%" stopColor="#FDF497" />
          <stop offset="10%" stopColor="#FDD065" />
          <stop offset="35%" stopColor="#FD5949" />
          <stop offset="60%" stopColor="#D6249F" />
          <stop offset="95%" stopColor="#7638FA" />
        </radialGradient>
      </defs>
      <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="url(#igGrad)" />
      <rect x="5.4" y="5.4" width="13.2" height="13.2" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.4" cy="7.6" r="1.25" fill="#fff" />
    </svg>
  )
}

const TIKTOK_PATH =
  'M16.6 5.82a4.278 4.278 0 0 1-1.01-2.82h-3.09v12.4a2.588 2.588 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .68-5.09v-3.14a5.72 5.72 0 0 0-.68-.04A5.73 5.73 0 1 0 15.65 15.9V9.01a7.35 7.35 0 0 0 4.31 1.38V7.3a4.28 4.28 0 0 1-3.36-1.48z'

export function TiktokIcon({ className = 'h-5 w-5', glyph = '#010101' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d={TIKTOK_PATH} fill="#25F4EE" transform="translate(-0.85,-0.5)" />
      <path d={TIKTOK_PATH} fill="#FE2C55" transform="translate(0.6,0.5)" />
      <path d={TIKTOK_PATH} fill={glyph} />
    </svg>
  )
}

export function GmapsIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <clipPath id="gmPin">
          <path d="M12 1.5C7.85 1.5 4.5 4.85 4.5 9c0 5.6 7.5 13.5 7.5 13.5S19.5 14.6 19.5 9c0-4.15-3.35-7.5-7.5-7.5z" />
        </clipPath>
      </defs>
      <g clipPath="url(#gmPin)">
        {/* kuadran diputar 45° meniru bidang warna pin Google Maps */}
        <g transform="rotate(45 12 9)">
          <rect x="-8" y="-12" width="20" height="21" fill="#EA4335" />
          <rect x="12" y="-12" width="20" height="21" fill="#4285F4" />
          <rect x="-8" y="9" width="20" height="26" fill="#FBBC04" />
          <rect x="12" y="9" width="20" height="26" fill="#34A853" />
        </g>
        <circle cx="12" cy="9" r="3" fill="#fff" />
      </g>
    </svg>
  )
}

export function WhatsappIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413z" />
    </svg>
  )
}
