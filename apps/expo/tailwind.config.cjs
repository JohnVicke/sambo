/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/_app.tsx"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins-Regular"],
        poppinsBold: ["Poppins-Bold"],
        poppinsMedium: ["Poppins-Medium"],
      },
    },
  },
  plugins: [],
  safelist: [{ pattern: /bg-.*/ }],
};
