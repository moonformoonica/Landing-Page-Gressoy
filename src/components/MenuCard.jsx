import { useState } from 'react'
import { SIZES } from '../data/menu.js'

export default function MenuCard({ item }) {
  const availableSizes = item.flatPrice ? [] : SIZES.filter((size) => item.prices[size.key] != null)
  const [selected, setSelected] = useState(
    availableSizes.find((s) => s.key === 'reguler')?.key ?? availableSizes[0]?.key,
  )

  const selectedLabel = SIZES.find((s) => s.key === selected)?.label

  return (
    <article className="flex h-full flex-col gap-4 rounded-3xl bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[0.4deg] hover:shadow-card">
      <div>
        <h3 className="font-display text-lg font-bold text-soya-800">{item.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-soya-800/70">{item.description}</p>
      </div>

      {/* Toggle ukuran (hanya ukuran yang tersedia) */}
      {availableSizes.length > 0 && (
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Pilih ukuran ${item.name}`}>
          {availableSizes.map((size) => (
            <button
              key={size.key}
              type="button"
              onClick={() => setSelected(size.key)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-200 ${
                selected === size.key
                  ? 'bg-soya-600 text-white'
                  : 'bg-soya-50 text-soya-700 hover:bg-soya-100'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-end justify-between border-t border-soya-100 pt-3">
        <span className="text-xs text-soya-800/60">
          {item.flatPrice ? 'Harga' : `Harga ${selectedLabel}`}
        </span>
        <span className="font-display text-2xl font-extrabold text-soya-700">
          {item.flatPrice ?? item.prices[selected]}
        </span>
      </div>
    </article>
  )
}
