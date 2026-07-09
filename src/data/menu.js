/**
 * Data menu dan harga Gressoy
 */

export const SIZES = [
  { key: "hot", label: "Hot" },
  { key: "reguler", label: "Reguler" },
  { key: "large", label: "Large" },
  { key: "ml250", label: "250 ml" },
  { key: "ml500", label: "500 ml" },
  { key: "ml1000", label: "1000 ml" },
];

export const CATEGORIES = [
  { key: "signature", label: "Signature" },
  { key: "chocolate", label: "Chocolate" },
  { key: "coffee", label: "Coffee" },
  { key: "tropical", label: "Tropical" },
  { key: "tea", label: "Tea" },
  { key: "dessert", label: "Dessert" },
];

export const MENU = [
  // ─ SOYA SIGNATURE ─
  {
    category: "signature",
    name: "Original",
    description: "Soya Original Premium + Brown Sugar",
    prices: {
      hot: "17K",
      reguler: "17K",
      large: "21K",
      ml250: "22K",
      ml500: "39K",
      ml1000: "74K",
    },
  },
  {
    category: "signature",
    name: "Taro Thanos",
    description: "Soya Original Premium + Taro Premium + Brown Sugar",
    prices: {
      hot: null,
      reguler: "25K",
      large: "30K",
      ml250: "27K",
      ml500: "49K",
      ml1000: "89K",
    },
  },
  {
    category: "signature",
    name: "Redvelvet",
    description: "Soya Original Premium + Redvelvet Premium + Brown Sugar",
    prices: {
      hot: null,
      reguler: "25K",
      large: "30K",
      ml250: "27K",
      ml500: "49K",
      ml1000: "89K",
    },
  },
  {
    category: "signature",
    name: "Mango Smell Good",
    description: "Soya Original Premium + Mango Premium + Brown Sugar",
    prices: {
      hot: null,
      reguler: "25K",
      large: "30K",
      ml250: "27K",
      ml500: "49K",
      ml1000: "89K",
    },
  },
  {
    category: "signature",
    name: "Royal Belgian",
    description: "Soya Original Premium + Royal Belgian + Brown Sugar",
    prices: {
      hot: null,
      reguler: "25K",
      large: "30K",
      ml250: "27K",
      ml500: "49K",
      ml1000: "89K",
    },
  },

  // ─ SOYA CHOCOLATE -
  {
    category: "chocolate",
    name: "Choco Maniac",
    description: "Soya Original Premium + Chocolate Premium + Brown Sugar",
    prices: {
      hot: "25K",
      reguler: "25K",
      large: "30K",
      ml250: "27K",
      ml500: "49K",
      ml1000: "89K",
    },
  },
  {
    category: "chocolate",
    name: "Choco Oat",
    description:
      "Soya Original Premium + Chocolate Premium Mix Oat + Brown Sugar",
    prices: {
      hot: "27K",
      reguler: "27K",
      large: "32K",
      ml250: "30K",
      ml500: "55K",
      ml1000: "92K",
    },
  },
  {
    category: "chocolate",
    name: "Dark Choco",
    description: "Soya Original Premium + Pure Chocolate + Brown Sugar",
    prices: {
      hot: "29K",
      reguler: "29K",
      large: "34K",
      ml250: "33K",
      ml500: "58K",
      ml1000: "95K",
    },
  },
  {
    category: "chocolate",
    name: "Choco Coffee",
    description:
      "Soya Original Premium + Chocolate Premium Mix Espresso + Brown Sugar",
    prices: {
      hot: "27K",
      reguler: "27K",
      large: "32K",
      ml250: "30K",
      ml500: "55K",
      ml1000: "92K",
    },
  },

  // ─ SOYA COFFEE ─
  {
    category: "coffee",
    name: "Coffee Kopi",
    description:
      "Soya Original Premium + Robusta Mix Arabica Premium + Brown Sugar",
    prices: {
      hot: "21K",
      reguler: "21K",
      large: "26K",
      ml250: "24K",
      ml500: "42K",
      ml1000: "80K",
    },
  },
  {
    category: "coffee",
    name: "Tiramisu",
    description: "Soya Original Premium + Tiramisu Premium + Brown Sugar",
    prices: {
      hot: "25K",
      reguler: "25K",
      large: "30K",
      ml250: "27K",
      ml500: "49K",
      ml1000: "89K",
    },
  },
  {
    category: "coffee",
    name: "Cappuccino",
    description: "Soya Original Premium + Cappuccino Premium + Brown Sugar",
    prices: {
      hot: "25K",
      reguler: "25K",
      large: "30K",
      ml250: "27K",
      ml500: "49K",
      ml1000: "89K",
    },
  },

  // ─ SOYA TROPICAL ─
  {
    category: "tropical",
    name: "Honey Lemon",
    description: "Soya Original Premium + Special Madu Lemon",
    prices: {
      hot: null,
      reguler: "20K",
      large: "25K",
      ml250: "23K",
      ml500: "44K",
      ml1000: "84K",
    },
  },
  {
    category: "tropical",
    name: "Mango Monggo",
    description: "Soya Original Premium + Special Mangga Gandaria",
    prices: {
      hot: null,
      reguler: "20K",
      large: "25K",
      ml250: "23K",
      ml500: "44K",
      ml1000: "84K",
    },
  },

  // ─ SOYA TEA ─
  {
    category: "tea",
    name: "Green Tea",
    description:
      "Soya Original Premium + Greentea Thailand Premium + Brown Sugar",
    prices: {
      hot: "25K",
      reguler: "25K",
      large: "30K",
      ml250: "27K",
      ml500: "49K",
      ml1000: "89K",
    },
  },
  {
    category: "tea",
    name: "Thai Tea",
    description: "Soya Original Premium + Tea Thailand Premium + Brown Sugar",
    prices: {
      hot: "22K",
      reguler: "22K",
      large: "27K",
      ml250: "26K",
      ml500: "46K",
      ml1000: "87K",
    },
  },

  // ─ SOYA DESSERT ─
  {
    category: "dessert",
    name: "Kembang Tahu Tahwa",
    description: "Dessert kembang tahu lembut dari sari kedelai",
    flatPrice: "15K",
  },
  {
    category: "dessert",
    name: "Soy Milk Pudding",
    description: "Puding susu kedelai lembut",
    flatPrice: "15K",
  },
];
