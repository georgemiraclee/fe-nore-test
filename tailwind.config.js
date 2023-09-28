/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-blue": "#33A6BA",
        "accent-red": "#FF7B92",
        "primary-lightgrey": "#E8EDF3",
        "primary-grey": "#989EA7",
        "primary-darkblue": "#313E4F",
      },
      fontFamily: {
        body: ["Roboto"],
      },
    },
  },
  plugins: [],
};
