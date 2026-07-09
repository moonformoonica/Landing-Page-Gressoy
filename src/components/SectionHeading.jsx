/**
 * Heading section konsisten (bold, center, serif Fraunces).
 * tone="green" (default) untuk section terang: judul hijau brand.
 * tone="ink" untuk section di atas background sage: judul hijau tua pekat.
 */
export default function SectionHeading({ title, subtitle, tone = 'green' }) {
  const titleColor = tone === 'ink' ? 'text-soya-900' : 'text-soya-700'
  const subColor = tone === 'ink' ? 'text-soya-900/70' : 'text-soya-800/70'

  return (
    <div className="mb-10 text-center">
      <h2 className={`font-display text-3xl font-extrabold sm:text-4xl ${titleColor}`}>{title}</h2>
      {subtitle && <p className={`mx-auto mt-3 max-w-2xl text-sm sm:text-base ${subColor}`}>{subtitle}</p>}
    </div>
  )
}
