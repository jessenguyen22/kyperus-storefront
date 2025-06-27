// Xóa dòng này:
// import { Config } from 'tailwindcss';

const config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    // Nếu components nằm trong app/components thì không cần dòng dưới
    // "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#fc2839',
          secondary: '#111117',
        },
      },
      fontFamily: {
        oxanium: ['Oxanium', 'sans-serif'],
        'source-sans': ['Source Sans 3', 'sans-serif'],
      },
      fontSize: {
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem' }],
      },
    },
  },
  plugins: [],
};

export default config;