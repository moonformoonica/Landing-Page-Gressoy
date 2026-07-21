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
  rating: 5.0,
  reviewCount: 354,
  hours: "08.00 – 22.00 WIB,setiap hari Senin-Sabtu",

  mapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJRa2ZJTpfZS4RnG2rdMPs-nA",

  embedSrc:
    "https://www.google.com/maps?q=-7.4284743,109.2380434&z=17&output=embed",
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
      color: "bg-[#00880F]",
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
