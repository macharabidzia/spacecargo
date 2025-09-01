// styles/theme.ts

// This file provides a programmatic representation of your theme's values,
// mirroring the Tailwind CSS configuration and CSS variables defined in global.css.
// It's useful for accessing theme values in JavaScript (e.g., for dynamic styling,
// charting libraries, or conditional logic based on theme colors).

// Define breakpoints based on your tailwind.config.ts
// These are typically used for programmatic responsive logic in JS.
export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

// Define your color palette, mirroring the semantic names and structure
// from your tailwind.config.ts and global.css.
// Note: These are conceptual names. In a real application, you might
// want to use CSS variables directly for dynamic theming, but this
// object can be useful for default values or type inference.
export const colors = {
    // Base colors (using conceptual names, actual values come from CSS variables)
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',

    // Primary brand color
    primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
    },

    // Secondary color
    secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
    },

    // Add other semantic colors as defined in your global.css and tailwind.config.ts
    // Example:
    // success: {
    //   DEFAULT: 'hsl(var(--success))',
    //   foreground: 'hsl(var(--success-foreground))',
    // },
    // danger: {
    //   DEFAULT: 'hsl(var(--danger))',
    //   foreground: 'hsl(var(--danger-foreground))',
    // },
};

// You can also export a single theme object if preferred
export const theme = {
    breakpoints,
    colors,
    // Add other theme-related properties like spacing, typography, etc., if needed
    // spacing: {
    //   '1': '0.25rem',
    //   '2': '0.5rem',
    //   // ...
    // },
    // fontFamily: {
    //   sans: 'var(--font-inter)',
    // },
};

// Helper function to get CSS variable values if you need to resolve them dynamically in JS
// This is more robust than just exporting the HSL string directly if you need RGB/hex.
export function getCssVar(name: string): string {
    if (typeof window === 'undefined') {
        return ''; // Return empty string on server-side
    }
    return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
}

// Example usage:
// const primaryColor = getCssVar('primary');
// console.log(primaryColor); // e.g., "262.1 83.3% 57.8%" (HSL values)
