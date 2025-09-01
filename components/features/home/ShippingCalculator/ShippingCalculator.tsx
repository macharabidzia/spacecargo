import { TabsContent } from "@/components/ui/tabs";
import ShippingDetailsForm from "./ShippingDetailsForm";
import { COUNTRIES, COUNTRIES_LAND } from "@/config/shipping.config";
import { DefaultTabsWrapper } from "@/components/common/wrappers/DefaultTabsWrapper";

const ShippingCalculator = async ({
  className,
  canEdit = false
}: {
  className?: string;
  canEdit?: boolean
}) => {

  const tabsData = [
    { label: "tarrifs.importMethods.air", countries: COUNTRIES, value: "air" },
    { label: "tarrifs.importMethods.land", countries: COUNTRIES_LAND, value: "land" },
  ];

  return (
    <>
      <div
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(240,248,255,0.7) 40%, rgba(224,243,255,0.5) 100%) ",
          clipPath:
            "polygon(0% 15%, 0% 0%, 15% 0%, 85% 0%, 100% 0%, 100% 15%, 100% 40%, 98% 50%, 100% 60%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0% 100%, 0% 85%, 0% 60%, 2% 50%, 0% 40%)",
          WebkitBackdropFilter: "blur(16px)",
          backdropFilter: "blur(16px)",
        }}
        className={`opacity-90 rounded-xl w-full h-auto flex flex-col p-4 sm:p-6 md:p-8 ${className} transition-all duration-500 overflow-hidden`}
      >
        <DefaultTabsWrapper containerClassName="w-40 mx-auto mb-10 lg:m-0" tabsData={tabsData}>
          {tabsData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <ShippingDetailsForm canEdit={canEdit} countries={tab.countries} key={tab.value} />
            </TabsContent>
          ))}
        </DefaultTabsWrapper>
      </div>

    </>
  );
};

export default ShippingCalculator;
