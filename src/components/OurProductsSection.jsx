import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading.jsx";
import MenuCard from "./MenuCard.jsx";
import Reveal from "./Reveal.jsx";
import { CATEGORIES, MENU } from "../data/menu.js";

export default function OurProductsSection() {
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    // Saat user mencari, cari di semua kategori supaya hasil tidak "hilang"
    return MENU.filter((item) =>
      q ? item.name.toLowerCase().includes(q) : item.category === category,
    );
  }, [category, query]);

  return (
    <section id="our-products" className="bg-cream-50 py-16 sm:py-20">
      <div className="section-shell">
        <SectionHeading
          title="Our Products"
          subtitle="Semua menu Gressoy dibuat dari Soya Original Premium. Pilih menu favorit mu, lalu sesuaikan ukurannya!"
        />

        <div className="mx-auto mb-6 max-w-sm">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari menu… (mis. Taro)"
            aria-label="Cari menu"
            className="w-full rounded-full border border-soya-200 bg-white px-5 py-2.5 text-sm text-soya-800 placeholder:text-soya-800/40 transition-shadow duration-300 focus:border-soya-500 focus:outline-none focus:ring-2 focus:ring-soya-200"
          />
        </div>

        {/* Tab kategori */}
        <div
          className="mb-8 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Kategori menu"
        >
          {CATEGORIES.map((cat) => {
            const isActive = !query && category === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setCategory(cat.key);
                  setQuery("");
                }}
                className={`rounded-full px-4 py-2 font-display text-sm font-semibold transition-all duration-300 sm:px-5 ${
                  isActive
                    ? "bg-gold-500 text-soya-900 shadow-soft"
                    : "bg-white text-soya-700 shadow-soft hover:-translate-y-0.5 hover:bg-soya-100"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {items.length > 0 ? (
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <Reveal key={item.name} delay={(i % 3) * 90} className="h-full">
                <MenuCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-soya-800/60">
            Menu "{query}" tidak ditemukan. Coba kata kunci lain, ya.
          </p>
        )}

        <p className="mt-11 text-center text-xs text-soya-800/60">
          Pesan online: buka Gofood / Grabfood / ShopeeFood lalu cari{" "}
          Kamu juga bisa mampir langsung untuk Dine In atau Take Away di outlet kami!
          <strong>"Gressoy"</strong>.
        </p>
      </div>
    </section>
  );
}
