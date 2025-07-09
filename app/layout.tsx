import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { siteConfig } from "@/config/site";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

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
      suppressHydrationWarning
      className={`${notoSansGeorgian.variable} antialiased`}
    >
      <body className="text-foreground min-h-screen flex">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          {children}
          <Toaster position="bottom-right" richColors className="z-[9999]" />
        </ThemeProvider>
      </body>
    </html>
  );
}
