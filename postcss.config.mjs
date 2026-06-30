// Tailwind v4 in Next 16 uses the @tailwindcss/postcss plugin (not the v3 tailwindcss+autoprefixer combo).
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
