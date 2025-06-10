// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Noto_Sans_Georgian } from "next/font/google";
import { GlobalProviders } from "@/providers/GlobalProviders";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { siteConfig } from "@/config/site";
import "./globals.css";
import Header from "@/components/layout/Header";
import MiniHeader from "@/components/layout/MiniHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideNav } from "@/components/layout/SideNav";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["latin"],
  variable: "--font-noto-sans-georgian",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSansGeorgian.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="text-foreground min-h-screen flex flex- bg-space-muted">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <GlobalProviders>
            <div className="flex flex-1">
              <SidebarProvider
                defaultOpen={false}
                className="flex-wrap content-start"
              >
                <MiniHeader>
                  <div className="md:hidden">
                    <SidebarTrigger />
                  </div>
                </MiniHeader>
                <Header className="hidden lg:block" />
                <SideNav />
                <main className="flex-grow w-full mx-auto">{children}</main>
              </SidebarProvider>
            </div>
          </GlobalProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
