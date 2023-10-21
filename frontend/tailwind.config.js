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
      animation: {
        "ping-pong":
          "ping-pong 1.5s cubic-bezier(0.17, 0.67, 0.88, 0.22) infinite",
      },
      keyframes: {
        "ping-pong": {
          "0%,100%": {
            left: "5px",
          },
          "50%": {
            left: "calc(100% - 10px)",
          },
        },
      },
      boxShadow: {
        "light-xl": "0 8px 8px 0 rgb(126, 38, 37)",
        "dark-xl": "0 8px 8px 0 #192525",
      },
      dropShadow: {
        sm: "0 4px 2px rgb(126, 38, 37)",
        "light-fg-primary": "0 1px 4px #7E2625",
        "dark-fg-primary": "0 1px 4px #192525",
      },
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
        xs: "4px",
        sm: "8px",
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
        "2xl": "96px",
        "3xl": "128px",
      },
      backgroundImage: {
        "light-layout":
          "url('~public/decoration/light-speaker.svg'), url('~public/decoration/light-headphones.svg'), url('~public/decoration/left-bottom-rounding.svg')",
        "dark-layout":
          "url('~public/decoration/dark-speaker.svg'), url('~public/decoration/dark-headphones.svg'), url('~public/decoration/left-bottom-rounding.svg')",
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
