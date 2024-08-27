import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-purple": "#633CFF",
        "secondary-purple": "#BEADFF",
        "light-purple": "#EFEBFF",
        "dark-grey": "#333333",
        grey: "#737373",
        "light-grey": "#FAFAFA",
        white: "#FFFFFF",
        red: "#FF3939",
      },
      boxShadow: {
        input: "0 0 32px 0 rgba(99, 60, 255, 25%)"
      }
    },
  },
  plugins: [],
};
export default config;
