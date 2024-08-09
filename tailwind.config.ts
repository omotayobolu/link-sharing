import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "primary-purple": "#633CFF",
      "secondary-purple": "#BEADFF",
      "light-purple": "#EFEBFF",
      "dark-grey": "#333333",
      grey: "#737373",
      borders: "#737373",
      "light-grey": "#FAFAFA",
      white: "FFFFFF",
      red: "#FF3939",
    },
  },
  plugins: [],
};
export default config;
