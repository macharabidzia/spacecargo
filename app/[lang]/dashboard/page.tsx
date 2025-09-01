import { fetchUserDashboard } from "@/actions/user.actions";
import ClientToastWrapper from "@/components/common/ClientToastWrapper";
import NotificationClientHandler from "@/components/common/handlers/NotificationClientHandler";
import Form from "@/components/features/dashboard/Form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { triggerStyles } from "@/constants/styles";
import { getDictionary } from "@/i18n/dictionaries";
import { Dog, FileWarning, Flower, Laptop, PlaneIcon, Radiation, Truck } from "lucide-react";

type IRoom = {
  params: Promise<{ lang: Lang }>
}
export const dynamic = 'force-dynamic'

const Room = async ({ params }: IRoom) => {
  const data = await fetchUserDashboard();
  const { lang } = await params;
  const errorMessage: string | null = null;
  const dictionary = (await getDictionary(lang)).common
  return (
    <div className="container">
      {errorMessage && <ClientToastWrapper message={errorMessage} />}
      <Card
        className="
          bg-white/20 
          dark:bg-gray-900/20 
          backdrop-blur-lg 
          border border-white/30 
          dark:border-gray-700/30 
          shadow-lg 
          rounded-xl
          py-2
        "
      >
        <Tabs defaultValue={data.shippingAddresses[0].country} className="w-full py-1.5">
          <TabsList className="flex flex-row justify-between w-full bg-transparent p-0 py-0.5">
            {data.shippingAddresses.map((shippingAddress) => (
              <TabsTrigger
                key={shippingAddress.countryId}
                value={shippingAddress.country}
                className={`${triggerStyles} data-[state=active]:bg-transparent`}
              >
                <span className="font-medium tracking-wide text-gray-700 dark:text-gray-300">
                  {shippingAddress.country}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          <Separator />

          <CardContent className="px-4">
            <div className="py-4">
              <h1 className="text-gray-600 dark:text-gray-300 text-sm font-medium tracking-wide uppercase">
                {dictionary['tarrif']}
              </h1>
              <p className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                $7.15
              </p>
            </div>

            <Separator />

            {data.shippingAddresses.map((shippingAddress) => (
              <TabsContent key={shippingAddress.countryId} value={shippingAddress.country}>
                <NotificationClientHandler
                  message={shippingAddress.notification}
                />
                <Tabs defaultValue="land">
                  <TabsList className="w-full h-14 bg-space-blue text-white rounded-md">
                    <TabsTrigger
                      className="flex-1 h-full data-[state=active]:bg-space-muted data-[state=active]:text-black data-[state=active]:shadow-md transition-colors duration-200 rounded-sm"
                      value="land"
                      asChild
                    >
                      <p className="flex items-center font-medium tracking-wide text-white">
                        {dictionary['tabsData.land']}
                        <Truck size={40} className="text-space-blue-light ml-2" />
                      </p>
                    </TabsTrigger>
                    <TabsTrigger
                      className="flex-1 h-full data-[state=active]:bg-space-muted data-[state=active]:text-black data-[state=active]:shadow-md transition-colors duration-200 rounded-sm"
                      value="air"
                      asChild
                    >
                      <p className="flex items-center font-medium tracking-wide text-white">
                        {dictionary['tabsData.air']}
                        <PlaneIcon size={40} className="text-space-blue-light ml-2" />
                      </p>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="land">
                    {shippingAddress.land && <Form lang={lang}addressData={shippingAddress.land} />}
                  </TabsContent>
                  <TabsContent value="air">
                    {shippingAddress.air && <Form lang={lang} addressData={shippingAddress.air} />}
                  </TabsContent>
                </Tabs>
              </TabsContent>
            ))}

            <Card
              className="
                bg-space-blue/95
                dark:bg-space-blue-dark/20 
                backdrop-blur-lg 
                border border-white/30 
                dark:border-white/30 
                shadow-md
                w-full col-span-full 
                mt-6 rounded-lg
              "
            >
              <CardHeader className="p-6 pb-4">
                <div className="flex flex-row gap-4 mb-4 items-center">
                  <FileWarning className="text-space-red-default" />
                  <p className="text-white text-lg font-semibold tracking-wide">
                    აკრძალული პროდუქცია
                  </p>
                </div>
                <Separator className="bg-white/30" />
              </CardHeader>

              <CardContent className="flex flex-row text-white sm:justify-between flex-wrap gap-5 p-6 pt-0">
                {[
                  { name: "ცხოველები", icon: Dog },
                  { name: "ქიმიური ნივთიერებები", icon: Radiation },
                  { name: "ელექტრო ნივთები", icon: Laptop },
                  { name: "ცეცხსასროლი იარაღი", icon: Radiation },
                  { name: "მცენარეები", icon: Flower },
                ].map(({ name, icon: Icon }, index) => (
                  <div key={index} className="flex flex-row gap-4 items-center">
                    <Icon />
                    <h2 className="font-medium tracking-wide">{name}</h2>
                  </div>
                ))}
              </CardContent>
            </Card>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Room;
