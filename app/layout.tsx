import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { siteConfig } from "@/config/site";
import { ReactNode } from "react";

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["latin"],
  variable: "--font-noto-sans-georgian",
  preload: true,
});
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};
export default async function RootLayout(props: {
  children: React.ReactNode;
  drawer: ReactNode;
}) {
  const { children } = props;

  return (
    <html
      className={`${notoSansGeorgian.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="text-foreground min-h-screen flex">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
