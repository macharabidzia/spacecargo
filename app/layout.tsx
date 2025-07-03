// app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import "./globals.css"; // Global CSS import here!
import { ThemeProvider } from "@/providers/ThemeProvider"; // Global theme provider
import { i18n } from "@/i18n/settings"; // Used for generateStaticParams
import { siteConfig } from "@/config/site"; // Used for metadata
import { ReactNode } from "react";

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["latin"],
  variable: "--font-noto-sans-georgian",
});

// generateStaticParams needs to be in the layout that defines the params.
// Since [lang] is now a segment of children, it belongs in app/[lang]/layout.tsx
// However, for root layout metadata that might depend on all locales, it's sometimes here.
// For generateStaticParams to work correctly with [lang], it must be defined in the layout that
// contains the [lang] segment, which is app/[lang]/layout.tsx. So, move it there.

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

// The RootLayout receives children (which will be app/[lang]/layout.tsx and its content)
// and the drawer (from @drawer).
export default async function RootLayout(props: {
  children: React.ReactNode;
  drawer: ReactNode; // The parallel route slot
}) {
  const { children, drawer } = props;

  return (
    <html
      // lang attribute cannot be determined here globally, as it depends on the [lang] param.
      // It should be set in the app/[lang]/layout.tsx or directly in specific pages.
      // Remove `lang={lang}` from here.
      className={`${notoSansGeorgian.variable} antialiased`}
      suppressHydrationWarning // Good for theme toggling
    >
      <body className="text-foreground min-h-screen flex">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          {children}
          {drawer}
        </ThemeProvider>
      </body>
    </html>
  );
}
