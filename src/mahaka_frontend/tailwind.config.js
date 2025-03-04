/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: "0.625rem",
      sm: "0.75rem",
      md: "0.8125rem",
      base: "0.875rem",
      lg: "1rem",
      xl: "1.125rem",
      "2xl": "1.25rem",
      "3xl": "1.5rem",
      "4xl": "2rem",
      "5xl": "2.25rem",
      "6xl": "2.5rem",
      "7xl": "3rem",
      "8xl": "4rem",
      "9xl": "6rem",
      "10xl": "8rem",
    },
    screens: {
      print: { raw: "print" },
      sm: "600px",
      md: "960px",
      lg: "1280px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        warn: "var(--warn)",
        error: "var(--error)",
        success: "var(--success)",
        base: "var(--base)",
        border: "var(--border)",
        divider: "var(--divider)",
        dividers: "var(--dividers)",
        disabled: "var(--disabled)",
        disabledButton: "var(--disabled-button)",
        disabledText: "var(--disabled-text)",
        elevation: "var(--elevation)",
        hintText: "var(--hint-text)",
        secondaryText: "var(--secondary-text)",
        icon: "var(--icon)",
        icons: "var(--icons)",
        text: "var(--text)",
        sliderMin: "var(--slider-min)",
        sliderOff: "var(--slider-off)",
        sliderOffActive: "var(--slider-off-active)",
        statusBar: "var(--status-bar)",
        appBar: "var(--app-bar)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        hover: "var(--hover)",
        card: "var(--card)",
        dialog: "var(--dialog)",
        raisedButton: "var(--raised-button)",
        focusedButton: "var(--focused-button)",
        selectedButton: "var(--selected-button)",
        selectedDisabledButton: "var(--selected-disabled-button)",
        disabledButtonToggle: "var(--disabled-button-toggle)",
        unselectedChip: "var(--unselected-chip)",
        disabledListOption: "var(--disabled-list-option)",
        tooltip: "var(--tooltip)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
      },
      flex: {
        0: "0 0 auto",
      },
      opacity: {
        12: "0.12",
        38: "0.38",
        87: "0.87",
      },
      rotate: {
        "-270": "270deg",
        15: "15deg",
        30: "30deg",
        60: "60deg",
        270: "270deg",
      },
      scale: {
        "-1": "-1",
      },
      zIndex: {
        "-1": -1,
        49: 49,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        99: 99,
        999: 999,
        9999: 9999,
        99999: 99999,
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        50: "12.5rem",
        90: "22.5rem",
        // Consolidate extended spacing here
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        100: "25rem",
        120: "30rem",
        128: "32rem",
        140: "35rem",
        160: "40rem",
        180: "45rem",
        192: "48rem",
        200: "50rem",
        240: "60rem",
        256: "64rem",
        280: "70rem",
        320: "80rem",
        360: "90rem",
        400: "100rem",
        480: "120rem",
      },
      fontFamily: {
        sans: `"Inter var", ${defaultTheme.fontFamily.sans.join(",")}`,
        mono: `"IBM Plex Mono", ${defaultTheme.fontFamily.mono.join(",")}`,
      },
    },
  },
  plugins: [],
};
