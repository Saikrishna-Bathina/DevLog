/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: {
          100: 'oklch(14% 0 0)',
          200: 'oklch(20% 0 0)',
          300: 'oklch(26% 0 0)',
          content: 'oklch(97% 0 0)',
        },
        primary: 'oklch(87% 0 0)',
        'primary-content': 'oklch(14% 0 0)',
        secondary: 'oklch(0% 0 0)',
        'secondary-content': 'oklch(100% 0 0)',
        accent: 'oklch(80% 0.105 251.813)',
        'accent-content': 'oklch(28% 0.091 267.935)',
        neutral: 'oklch(14% 0 0)',
        'neutral-content': 'oklch(98% 0 0)',
        info: 'oklch(62% 0.214 259.815)',
        'info-content': 'oklch(97% 0.014 254.604)',
        success: 'oklch(69% 0.17 162.48)',
        'success-content': 'oklch(97% 0.021 166.113)',
        warning: 'oklch(79% 0.184 86.047)',
        'warning-content': 'oklch(98% 0.026 102.212)',
        error: 'oklch(63% 0.237 25.331)',
        'error-content': 'oklch(97% 0.013 17.38)',
      }
    },
  },
  plugins: [require("daisyui")], // ✅ Enable DaisyUI
  daisyui: {
    themes: [
      {
        customDark: {
          "radius-box": "2rem",
          "radius-btn": "2rem",
          "radius-badge": "2rem",
        },
      },
    ],
  },
};
