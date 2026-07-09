/**
 * Design Landing SoyaCore / Gressoy.
 *
 * Color Palette
 *   - Hijau tua  #2F6B3F  (soya-700) — heading, teks, footer
 *   - Hijau medium #7FB77E (sage-500) — background utama
 *   - Gold        #F7C85C (gold-500)  — aksen, pill aktif, headline
 *   - Cream       #FFF6C0 (cream-100) — kartu showcase & aksen terang
 * Font: IM Fell Double Pica (judul) + IM Fell DW Pica (teks).
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        soya: {
          50: '#EFF6EF',
          100: '#D8E9D8',
          200: '#B3D3B2',
          300: '#8BBB8A',
          400: '#5E9C61',
          500: '#3E8850',
          600: '#357646',
          700: '#2F6B3F', 
          800: '#244F30',
          900: '#1B3B24',
        },
        sage: {
          100: '#E4F0E1',
          200: '#CDE4C8',
          300: '#A9CFA4',
          400: '#93C28F',
          500: '#7FB77E',
          600: '#6BA26A',
          700: '#568A56',
        },
        gold: {
          100: '#FFF1C9',
          200: '#FCE7A6',
          300: '#FBDD8E',
          400: '#F9D06F',
          500: '#F7C85C', 
          600: '#E3AE3C',
        },
        cream: {
          50: '#FFFDF2',
          100: '#FFF6C0',
          200: '#F5E9A6',
        },
      },
      fontFamily: {
        display: ['"IM Fell Double Pica"', 'Georgia', 'serif'],
        body: ['"IM Fell DW Pica"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(18, 53, 30, 0.10)',
        card: '0 6px 24px rgba(18, 53, 30, 0.16)',
      },
      borderRadius: {
        '4xl': '2rem',
        blob: '58% 42% 55% 45% / 52% 55% 45% 48%',
      },
    },
  },
  plugins: [],
}
