// tailwind.config.ts
import { Space } from 'lucide-react';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
// import colors from 'tailwindcss/colors'; // Not needed if you're not extending default Tailwind colors directly

const config: Config = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './features/**/*.{js,ts,jsx,tsx,mdx}',
        // IMPORTANT: Add any other directories where you use Tailwind classes
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
            },
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
                georgian: ['var(--font-noto-sans-georgian)']
            },
            colors: {
                spaceBlue: {
                    DEFAULT: '#101C3D',
                    light: "#2986FD",
                    standard:"#416FF4"
                },
                spaceMuted: {
                    DEFAULT: "#F6F9FC",
                },
                spaceOrange:{
                    DEFAULT:"#FE7A00"
                },
                spaceGreen:{
                    DEFAULT:"#56BD25"
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: '#101C3D', // T
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-in-out',
            },
        },
    },
    plugins: [],
};

export default config;