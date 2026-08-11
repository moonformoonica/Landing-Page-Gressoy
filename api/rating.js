/**
 * Rating & jumlah ulasan Gressoy, diambil langsung dari Google Places API.
 *
 * Dijalankan sebagai serverless function di Vercel, bukan di browser, supaya
 * API key tidak pernah ikut terkirim ke pengunjung. Jawabannya di-cache di CDN
 * Vercel selama 1 jam, jadi Google cuma dihubungi sekali per jam untuk seluruh
 * pengunjung — kuota nyaris tidak terpakai walau situsnya ramai.
 *
 * Butuh Environment Variable: GOOGLE_PLACES_API_KEY
 */

// Place ID outlet Gressoy. Sudah dicocokkan dengan URL Maps resminya:
// kedua CID (0x2e655f3a2599ad45 : 0x70faecc374ab6d9c) ada di dalam ID ini.
const PLACE_ID = "ChIJRa2ZJTpfZS4RnG2rdMPs-nA";

// Places API (New). Hanya dua field yang diminta supaya masuk tarif termurah.
const PLACE_URL = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
const FIELD_MASK = "rating,userRatingCount";

export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  // Belum dikonfigurasi. Sengaja bukan error keras: frontend akan diam-diam
  // memakai angka cadangan di contact.js, jadi halaman tetap normal.
  if (!apiKey) {
    return res
      .status(503)
      .json({ error: "GOOGLE_PLACES_API_KEY belum diset di Environment Variable" });
  }

  try {
    const upstream = await fetch(PLACE_URL, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      return res.status(502).json({
        error: "Places API menolak permintaan",
        status: upstream.status,
        detail: detail.slice(0, 300),
      });
    }

    const place = await upstream.json();
    const rating = place.rating;
    const reviewCount = place.userRatingCount;

    if (typeof rating !== "number" || typeof reviewCount !== "number") {
      return res.status(502).json({ error: "Jawaban Places API tidak lengkap" });
    }

    // Cache hanya dipasang di jalur sukses; error tidak boleh ikut mengendap
    // di CDN. stale-while-revalidate: kalau sudah lewat 1 jam, pengunjung
    // tetap dapat angka lama seketika sambil versi barunya diambil di belakang.
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400",
    );
    return res.status(200).json({ rating, reviewCount });
  } catch {
    return res.status(502).json({ error: "Gagal menghubungi Places API" });
  }
}
