import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        background: "#121212",
        surface: "#1e1e1e",
        primary: "#bb86fc",
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
} satisfies Config;
