import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShippingDetailsForm from "./ShippingDetailsForm";
import { getDictionary } from "@/i18n/dictionaries";

const ShippingCalculator = async ({ lang }: { lang: Lang }) => {
  const dictionary = await getDictionary(lang);
  const triggerStyles = `
    cursor-pointer
    relative flex-1 bg-transparent text-muted-foreground transition-none
    hover:text-
    data-[state=active]:text-primary data-[state=active]:shadow-none
    after:content-[''] after:absolute after:h-[2px] after:w-full
    after:bg-space-blue-light after:-bottom-3
    after:left-0 after:scale-x-0 after:origin-center
    after:transition-transform after:duration-300 after:ease-in-out
    hover:after:scale-x-100
    data-[state=active]:after:scale-x-100
  `;
  return (
    <div
      style={{
        filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.25))",
      }}
      className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full md:w-11/12 lg:w-10/14 z-50 px-4 md:px-0 h-[200px]"
    >
      <div
        style={{
          clipPath:
            "polygon(0% 15%, 0% 0%, 15% 0%, 85% 0%, 100% 0%, 100% 15%, 100% 40%, 98% 50%, 100% 60%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0% 100%, 0% 85%, 0% 60%, 2% 50%, 0% 40%)",
          WebkitBackdropFilter: "blur(16px)",
          backdropFilter: "blur(16px)",
        }}
        className="bg-accent opacity-90 rounded-xl w-full h-auto flex flex-col p-4 sm:p-6 md:p-8 "
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
          <Separator className="dark:bg-white" />
          <TabsContent value="air" className="mt-4">
            <ShippingDetailsForm />
          </TabsContent>
          <TabsContent value="land" className="mt-4">
            <ShippingDetailsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ShippingCalculator;
