import ParcelsTabs from "@/components/features/dashboard/parcels/ParcelsTabs";
import { siteConfig } from "@/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type SettingsLayout = {
  children: React.ReactNode;
  params: Promise<{ lang: Lang }>;
};
export const metadata = {
  title: "Settings Page",
  robots: {
    index: false,
    follow: true,
  },
};
const SettingsLayout = async ({ children, params }: SettingsLayout) => {
  const { lang } = await params;
  const dictionary = (await getDictionary(lang)).common;
  return (
    <div className="container py-8">
      <h1 className="text-4xl mt-4 font-bold text-space-blue text-center mb-12 dark:text-white/85">
        {dictionary["sidenav.settings"]}
      </h1>
      <Card
        className="
          shadow-lg
          border border-white/50
          rounded-xl
          p-0
          backdrop-blur-lg`
          bg-gradient-to-r from-white/50 via-white/30 to-white/40
          dark:from-gray-300/30 dark:via-gray-300/20 dark:to-gray-400/40
        "
      >
        <CardHeader className="pb-4 px-0">
          <CardTitle className="text-4xl mt-4 font-bold text-space-blue text-center" />
          <ParcelsTabs tabsData={siteConfig.settingsTabsData} />
        </CardHeader>
        <CardContent className="pb-12">{children}</CardContent>
      </Card>
    </div>
  );
};

export default SettingsLayout;
