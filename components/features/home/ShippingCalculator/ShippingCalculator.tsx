import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShippingDetailsForm from "./ShippingDetailsForm";
import { getDictionary } from "@/i18n/dictionaries";
import { triggerStyles } from "@/constants/styles";

const ShippingCalculator = async ({
  lang,
  className,
}: {
  lang: Lang;
  className?: string;
}) => {
  const dictionary = await getDictionary(lang);

  return (
    <div
      style={{
        clipPath:
          "polygon(0% 15%, 0% 0%, 15% 0%, 85% 0%, 100% 0%, 100% 15%, 100% 40%, 98% 50%, 100% 60%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0% 100%, 0% 85%, 0% 60%, 2% 50%, 0% 40%)",
        WebkitBackdropFilter: "blur(16px)",
        backdropFilter: "blur(16px)",
      }}
      className={`bg-accent opacity-90 rounded-xl w-full h-auto flex flex-col p-4 sm:p-6 md:p-8 ${className}`}
    >
      <Tabs defaultValue="air" className="w-ful">
        <TabsList className="grid grid-cols-2 gap-2 sm:flex sm:gap-4 bg-transparent py-0.5 px-0">
          <TabsTrigger value="air" className={triggerStyles}>
            {dictionary.home["tariffs.importMethods.air"]}
          </TabsTrigger>
          <TabsTrigger value="land" className={triggerStyles}>
            {dictionary.home["tariffs.importMethods.land"]}
          </TabsTrigger>
        </TabsList>
        <Separator className={`bg-white ${className && "bg-slate-300"}`} />
        <TabsContent value="air" className="mt-4">
          <div className="opacity-0 animate-fade-slide-in">
            <ShippingDetailsForm />
          </div>
        </TabsContent>
        <TabsContent value="land" className="mt-4">
          <ShippingDetailsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShippingCalculator;
