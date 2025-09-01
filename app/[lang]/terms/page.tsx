import { getPersonalData } from "@/actions/user.actions";
import PdfViewerWrapper from "@/components/common/PdfViewerWrapper";
import { DefaultTabsWrapper } from "@/components/common/wrappers/DefaultTabsWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { ContractsLinks } from "@/types/user";
export const dynamic = "force-dynamic";
const TermsPage = async () => {
  const terms: ContractsLinks = await getPersonalData();
  const tabsData = (
    Object.entries(terms) as [keyof ContractsLinks, string][]
  ).map(([key, value]) => ({
    value: key,
    href: value,
  }));
  return (
    <div className="container mt-10">
      <Card>
        <CardContent className="px-0">
          <DefaultTabsWrapper tabsData={tabsData}>
            {tabsData.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="min-h-[80vh] w-full"
              >
                <PdfViewerWrapper fileUrl={tab.href} />
              </TabsContent>
            ))}
          </DefaultTabsWrapper>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsPage;
