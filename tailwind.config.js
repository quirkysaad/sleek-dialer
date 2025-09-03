/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F1F1F1",
        sectionHeader: "#F0F2F5",
        primaryAccent: "#0381FE",
        secondaryAccent: "#FF6B6B", // missed calls
        success: "#4CAF50", // answered calls
        textPrimary: "#1C1C1E",
        textMuted: "#6D6D72",

        // Call type colors
        green: "#4CAF50", // green
        blue: "#2196F3", // blue
        red: "#F44336", // red
      },
    },
  },
  plugins: [],
};
