/* eslint-disable global-require */
/* eslint-disable camelcase */
const isDev = process.env.NODE_ENV !== 'production';

// ATTENTION
// Custom tailwind classes for GreenMind must be prefixed
// with gm- for differentiation between Storefront classes
// and GreenMind DSM

module.exports = {
  content: [
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}'
  ],

  important: true,
  theme: {
    fontFamily: false,
    extend: {
      colors: {
        footer: '#007476',
        header: '#96D5D2',
        custom_bg: '#007476',
        text_color: '#006A6B',
        border_color: '#54A2A3',
        modal_bg: '#F9F9F9',
        gray_light: '#EEEEEE',
        search_item_text_color: '#003132',
        deep_green: '#003132',
        text_hover: '#007575'
      },
      borderRadius: {
        custom: '25px'
      },
      gridTemplateColumns: {
        14: "repeat(14, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-14": "span 14 / span 16",
        "span-16": "span 16 / span 16",
      },
      fontFamily: {
        sans: ['Outfit'],
        'sf-primary': 'Outfit',
        'sf-secondary': 'Outfit'
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
};
