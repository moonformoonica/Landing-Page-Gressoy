/**
 * Embed Google Maps full-width.
 *
 * Kartu info tempatnya sengaja tidak dibuat sendiri. Dulu ada kartu putih
 * custom yang ditempel di pojok kiri-atas, tapi Google juga menggambar kartunya
 * sendiri di posisi yang sama di dalam iframe — dan isi iframe tidak bisa kita
 * atur sama sekali karena beda domain, jadi keduanya selalu bertumpuk. Sekarang
 * yang dipakai cuma kartu bawaan Google: isinya (nama, alamat, rating, tombol
 * rute) selalu live dan tidak mungkin bentrok karena memang cuma ada satu.
 */
export default function MapEmbed({ name, embedSrc }) {
  return (
    <div className="overflow-hidden rounded-3xl shadow-card">
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
    </div>
  );
}
