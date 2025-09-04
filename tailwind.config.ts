// tailwind.config.ts
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },

    extend: {
      fontFamily: {
        sans: ["var(--font-noto-sans-georgian)", ...defaultTheme.fontFamily.sans],
        georgian: ["var(--font-noto-sans-georgian)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: "var(--destructive)",
        input: "var(--input)",
        ring: "var(--ring)",

        "chart-1": "var(--chart-1)",
        "chart-2": "var(--chart-2)",
        "chart-3": "var(--chart-3)",
        "chart-4": "var(--chart-4)",
        "chart-5": "var(--chart-5)",

        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },

        button: {
          DEFAULT: "var(--button)",
          foreground: "var(--button-foreground)",
        },

        "space-blue": {
          DEFAULT: "var(--space-blue)",
          light: "var(--space-blue-light)",
          standard: "var(--space-blue-standard)",
          muted: "var(--space-blue-muted)"
        },
        "space-red": "var(--space-red)",
        "space-muted": {
          DEFAULT: "var(--space-muted-default)",
        },
        "space-orange": {
          DEFAULT: "var(--space-orange-default)",
        },
        "space-green": {
          DEFAULT: "var(--space-green-default)",
        },
      },

      width: {
        "sidebar-width": "var(--sidebar-width)",
      },

      keyframes: {
        "fade-slide-in": {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-light": {
          "0%, 100%": {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "translate(-50%, -50%) scale(1.05)",
          },
        },
        // For text fading in and out slightly
        "pulse-fade": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        // For the parcel icon appearing and disappearing
        "fade-in-out": {
          "0%, 100%": {
            opacity: "0",
            transform: "translate(-50%, -50%) scale(0.8)",
          },
          "25%, 75%": {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
        // For the main rocket trail rising and fading
        "trail-rise": {
          "0%": { opacity: "0", transform: "translate(-50%, 0) scaleY(0)" },
          "20%": {
            opacity: "1",
            transform: "translate(-50%, -100%) scaleY(1)",
          },
          "80%": {
            opacity: "1",
            transform: "translate(-50%, -100%) scaleY(1)",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-50%, -200%) scaleY(0)",
          },
        },
        // For a secondary, slightly delayed rocket trail effect
        "trail-rise-delay": {
          "0%": { opacity: "0", transform: "translate(-50%, 0) scaleY(0)" },
          "10%": { opacity: "0", transform: "translate(-50%, 0) scaleY(0)" }, // Delay start
          "30%": {
            opacity: "1",
            transform: "translate(-50%, -100%) scaleY(1)",
          },
          "90%": {
            opacity: "1",
            transform: "translate(-50%, -100%) scaleY(1)",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-50%, -200%) scaleY(0)",
          },
        },
        // For an optional progress bar animation (if used)
        "loading-bar": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        // Apply the keyframes with the desired duration, easing, and delay
        // Format: [animation-name] [duration] [timing-function] [delay] [fill-mode]
        "fade-slide-in":
          "fade-slide-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s forwards",
        "pulse-light": "pulse-light 2s infinite ease-in-out",
        "pulse-fade": "pulse-fade 3s infinite ease-in-out",
        "fade-in-out": "fade-in-out 4s infinite ease-in-out",
        "trail-rise": "trail-rise 1.5s infinite ease-out",
        "trail-rise-delay": "trail-rise-delay 1.5s infinite ease-out",
        "loading-bar": "loading-bar 3s forwards ease-out", // '
      },
    },
  },
  plugins: [],
};

export default config;
