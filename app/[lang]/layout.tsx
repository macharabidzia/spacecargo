import { getDictionary } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/i18n-provider";
import { i18n } from "@/i18n/settings";
import MiniHeader from "@/components/layout/MiniHeader/MiniHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideNav } from "@/components/layout/SideNav";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Noto_Sans_Georgian } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import TopUpDrawer from "@/components/features/dashboard/drawers/TopUpDrawer";
import EditDeclarationDrawer from "@/components/features/dashboard/drawers/EditDeclarationDrawer";
import { DrawerConfig } from "@/types";
import GenericDrawers from "@/components/features/dashboard/drawers/GenericDrawers";
import AddAuthorizedPersonDrawer from "@/components/features/dashboard/drawers/AddAuthorizedPersonDrawer";
import EditParcelDrawer from "@/components/features/dashboard/drawers/EditParcelDrawer";
import httpClient from "@/lib/httpClient";
import RouteLoader from "@/components/common/RouterLoader";
import { Viewport } from "next";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}
const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["latin"],
  variable: "--font-noto-sans-georgian",
  preload: true,
});
export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Lang }>;
}) {
  const { children, params } = props;
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  httpClient.defaults.headers["Accept-Language"] = lang;
  const dashboardDrawersConfig: DrawerConfig[] = [
    {
      queryParamName: "topUp",
      component: TopUpDrawer,
    },
    {
      queryParamName: "edit",
      component: EditDeclarationDrawer,
    },
    {
      queryParamName: "create",
      component: AddAuthorizedPersonDrawer,
    },
    {
      queryParamName: "editParcel",
      component: EditParcelDrawer,
    },
  ];
  return (
    <html
      suppressHydrationWarning
      lang={lang || "en"}
      className={`${notoSansGeorgian.variable} antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="text-foreground min-h-screen flex">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <Toaster
            position="bottom-right"
            expand
            richColors
            className="z-[9999]"
            toastOptions={{
              className:
                "bg-emerald-500 text-white rounded-lg shadow-lg border border-emerald-600 px-4 py-3",
            }}
          />
          <I18nProvider lang={lang} dictionaries={dictionary}>
            <div className="flex flex-1 bg-background">
              <RouteLoader />
              <SidebarProvider
                defaultOpen={false}
                className="flex-wrap content-start"
              >
                <MiniHeader currentLang={lang}>
                  <div className="md:hidden">
                    <SidebarTrigger className="text-white"></SidebarTrigger>
                  </div>
                </MiniHeader>
                <Header currentLanguage={lang} />
                <SideNav currentLang={lang} />
                <main className="flex-grow w-full mx-auto static">
                  {children}
                  <Footer dictionary={dictionary.common} lang={lang} />

                </main>
              </SidebarProvider>
              <Suspense>
                <GenericDrawers drawersConfig={dashboardDrawersConfig} />
              </Suspense>
            </div>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
