import { getDictionary } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/i18n-provider";
import { i18n } from "@/i18n/settings";
import MiniHeader from "@/components/layout/MiniHeader/MiniHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideNav } from "@/components/layout/SideNav";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header/Header";
import DashboardDrawers from "@/components/features/dashboard/drawers/DashboardDrawers";

// This generateStaticParams now makes sense here, as this layout defines the [lang] param.
export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: { lang: "en" | "ka" };
}) {
  const { children, params } = props;
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  return (
    
    <I18nProvider lang={lang} dictionaries={dictionary}>
      <div className="flex flex-1 bg-background">
        <SidebarProvider
          defaultOpen={false}
          className="flex-wrap content-start"
        >
          <MiniHeader currentLang={lang}>
            <div className="md:hidden">
              <SidebarTrigger></SidebarTrigger>
            </div>
          </MiniHeader>
          <Header currentLanguage={lang} className="hidden lg:block" />
          <SideNav currentLang={lang} />
          <main className="flex-grow w-full mx-auto static">
            {children}
            <DashboardDrawers />
            <Footer dictionary={dictionary.common} />
          </main>
        </SidebarProvider>
      </div>
    </I18nProvider>
  );
}
