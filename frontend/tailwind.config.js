/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    colors: {
      "light-bg-primary": "#F4C127",
      "light-bg-secondary": "#EF9935",
      "light-bg-tertiary": "#FDEECD",
      "light-fg-primary": "#7E2625",
      "light-fg-secondary": "#E94635",
      "light-fg-tertiary": "#FCF9E8",
      "light-fg-link": "#956362",
      "light-useless": "#EDA92C",
      "light-accent": "#EF9935",
      "light-pressed": "#EDA92C",

      "dark-bg-primary": "#3E3E3E",
      "dark-bg-secondary": "#FDEECD",
      "dark-bg-tertiary": "#EF9935",
      "dark-fg-primary": "#192525",
      "dark-fg-secondary": "#E94635",
      "dark-fg-tertiary": "#FCF9E8",
      "dark-fg-link": "#956362",
      "dark-useless": "#956362",
      "dark-accent": "#EF9935",
      "dark-pressed": "#EDA92C",
    },
    fontSize: {
      sm: "12px",
      base: "18px",
      lg: "24px",
      xl: "32px",
      xxl: "64px",
    },
    extend: {
      margin: {
        xxs: "2px",
        sm: "8px",
        xs: "4px",
        base: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "40px",
        "2xl": "64px",
        "3xl": "70px",
        "4xl": "96px",
      },
      padding: {
        xxs: "2px",
        sm: "8px",
        xs: "4px",
        base: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "40px",
        "2xl": "64px",
        "3xl": "70px",
        "4xl": "96px",
      },
      borderRadius: {
        sm: "4px",
        base: "8px",
        lg: "16px",
        xl: "32px",
        xxl: "64px",
        "2xl": "128px",
      },
    },
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};
