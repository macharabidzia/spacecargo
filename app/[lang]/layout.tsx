import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import { GlobalProviders } from "@/providers/GlobalProviders";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { siteConfig } from "@/config/site";
import "../globals.css";
import Header from "@/components/layout/Header";
import MiniHeader from "@/components/layout/MiniHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideNav } from "@/components/layout/SideNav";
import { getDictionary } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/i18n-provider";
import { i18n } from "@/i18n/settings";
import Footer from "@/components/layout/Footer";

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["latin"],
  variable: "--font-noto-sans-georgian",
});

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { lang: "en" | "ka" };
}) {
  const { children, params } = props;
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${notoSansGeorgian.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="text-foreground min-h-screen flex">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <I18nProvider lang={lang} dictionaries={dictionary}>
            <div className="flex flex-1 bg-background">
              <SidebarProvider
                defaultOpen={false}
                className="flex-wrap content-start"
              >
                <MiniHeader currentLang={lang}>
                  <div className="md:hidden">
                    <SidebarTrigger />
                  </div>
                </MiniHeader>
                <Header currentLanguage={lang} className="hidden lg:block" />
                <SideNav currentLang={lang} />
                <main className="flex-grow w-full mx-auto static ">
                  {children}

                  <Footer />
                </main>
              </SidebarProvider>
            </div>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
