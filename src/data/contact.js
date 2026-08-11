/**
 * Data kontak & lokasi Gressoy
 */

export const LOCATION = {
  name: "Gressoy",
  // Alamat Gressoy di Gmaps.
  addressLines: [
    "Jl. Kolonel Sugiono No.34, Tipar,",
    "Purwanegara, Kec. Purwokerto Tim.,",
    "Kabupaten Banyumas,",
    "Jawa Tengah 53116",
  ],
  // Angka cadangan untuk kartu versi mobile. Yang tampil diambil live dari
  // /api/rating; dua nilai ini hanya dipakai selama jawaban belum datang atau
  // kalau Google sedang tidak bisa dihubungi (lihat src/hooks/useLiveRating.js).
  rating: 5.0,
  reviewCount: 358,

  hoursTime: "08.00 - 22.00 WIB,",
  hoursDays: "setiap hari Senin-Sabtu",

  // Format URL Maps universal (api=1) — konsisten di desktop & aplikasi mobile.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Gressoy%20Purwokerto&query_place_id=ChIJRa2ZJTpfZS4RnG2rdMPs-nA",

  // Embed mode "tempat", bukan sekadar koordinat: dengan begini Google
  // menampilkan kartu Gressoy yang sebenarnya (nama, alamat, rating, tombol
  // rute) dan bukan kartu titik koordinat kosong. Bagian !1s...%3A... itu
  // pasangan CID Gressoy, diambil dari URL Google Maps resminya.
  // Kalau suatu saat perlu diganti: buka Maps > Bagikan > Sematkan peta, lalu
  // salin isi src="..." dari kode yang diberikan Google.
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d109.2380434!3d-7.4284743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655f3a2599ad45%3A0x70faecc374ab6d9c!2sGressoy!5e0!3m2!1sid!2sid!4v0!5m2!1sid!2sid",
};

export const CONTACT = {
  whatsapp: {
    display: "+62 822-2318-8471",
    url: "https://wa.me/6282223188471",
  },
  instagram: {
    handle: "@gressoy.id",
    url: "https://www.instagram.com/gressoy.id/",
  },
  tiktok: {
    handle: "@gressoy.id",
    url: "https://www.tiktok.com/@gressoy.id",
  },
  // Link langsung ke etalase resmi Gressoy di setiap platform.
  orderPlatforms: [
    {
      name: "Gofood",
      url: "https://gofood.co.id/banyumas/restaurant/gressoy-indonesia-kolonel-sugiono-0f3aecb7-dd3f-4b1d-a0eb-971995812391",
      color: "bg-[#FF0000]",
    },
    {
      name: "Grabfood",
      url: "https://food.grab.com/id/en/restaurant/gressoy-purwanegara-delivery/6-CZBGVAWZAJCHCX?sourceID=20250811_163406_5a4ba69990424a118b1570cf2c5b810e_MEXMPS",
      color: "bg-[#00B14F]",
    },
    {
      name: "ShopeeFood",
      url: "https://shopee.co.id/universal-link/now-food/shop/20457953?deep_and_deferred=1&shareChannel=copy_link",
      color: "bg-[#EE4D2D]",
    },
  ],
};
