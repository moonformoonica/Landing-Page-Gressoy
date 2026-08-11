/**
 * Rating & jumlah ulasan Gressoy, diambil langsung dari Google.
 *
 * Sumbernya halaman embed peta milik Google sendiri — yang sama persis dengan
 * yang dipakai fitur "Bagikan > Sematkan peta". Endpoint ini publik: tanpa API
 * key, tanpa billing account, jadi tidak ada biaya sama sekali. Di dalam
 * jawabannya angka rating dan jumlah ulasan tertulis apa adanya, contoh:
 *
 *     ...Jawa Tengah 53116"],5,"358 ulasan","https://search.google.com/...
 *
 * Dijalankan di server, bukan di browser, karena Google tidak mengizinkan
 * halaman itu dibaca lintas domain dari sisi klien.
 *
 * Catatan kejujuran: format di atas tidak didokumentasikan Google, jadi suatu
 * saat bisa berubah tanpa pemberitahuan. Kalau itu terjadi, endpoint ini
 * menjawab 502 dan situs otomatis kembali memakai angka cadangan di
 * contact.js — tidak ada tampilan yang rusak, cuma angkanya berhenti update.
 */

// Pasangan CID outlet Gressoy, diambil dari URL Google Maps resminya.
const CID = "0x2e655f3a2599ad45:0x70faecc374ab6d9c";
const LAT = -7.4284743;
const LNG = 109.2380434;

const EMBED_URL =
  "https://www.google.com/maps/embed?pb=" +
  `!1m18!1m12!1m3!1d1000!2d${LNG}!3d${LAT}` +
  "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s" +
  encodeURIComponent(CID) +
  "!2sGressoy!5e0!3m2!1sid!2sid!4v0!5m2!1sid!2sid";

// Menangkap "...,5,"358 ulasan"..." — rating berupa angka JSON (titik sebagai
// desimal), jumlah ulasan berupa teks yang bisa berpemisah ribuan ("1.358").
const RATING_RE = /,(\d(?:\.\d+)?),"([\d.,]+)\s*(?:ulasan|reviews?)"/;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export default async function handler(req, res) {
  try {
    const upstream = await fetch(EMBED_URL, {
      headers: { "User-Agent": UA, "Accept-Language": "id-ID,id;q=0.9" },
    });

    if (!upstream.ok) {
      return res
        .status(502)
        .json({ error: "Google menolak permintaan", status: upstream.status });
    }

    const html = await upstream.text();
    const found = html.match(RATING_RE);

    if (!found) {
      return res
        .status(502)
        .json({ error: "Format jawaban Google berubah, angka tidak terbaca" });
    }

    const rating = Number(found[1]);
    const reviewCount = Number(found[2].replace(/\D/g, ""));

    // Jaring pengaman kalau yang tertangkap ternyata angka lain.
    if (!(rating > 0 && rating <= 5) || !(reviewCount > 0)) {
      return res.status(502).json({ error: "Angka yang terbaca tidak masuk akal" });
    }

    // Cache hanya di jalur sukses; error tidak boleh mengendap di CDN.
    // Google cuma dihubungi sekali per jam untuk seluruh pengunjung.
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400",
    );
    return res.status(200).json({ rating, reviewCount });
  } catch {
    return res.status(502).json({ error: "Gagal menghubungi Google" });
  }
}
