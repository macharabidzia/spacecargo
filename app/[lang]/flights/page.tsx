import FlightsTable from "@/components/features/flights/FlightsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/i18n/dictionaries";
import { TariffData } from "@/lib/table/tarrifs.columns";
import { HomeDictionary } from "@/types/dictionary";
import React from "react";

type Flights = {
  params: Promise<{ lang: Lang }>;
};
const Flights = async ({ params }: Flights) => {
  const { lang } = await params;

  const fullDictionary = await getDictionary(lang);
  const dictionary: { home: HomeDictionary } = fullDictionary;
  const homeDictionary = dictionary.home;
  const countryIcons: { [key: string]: string } = {
    [homeDictionary["tariffs.labels.country"] === "Country" ? "USA" : "აშშ"]:
      "/icons/usa.svg",
    USA: "/icons/usa.svg",
    [homeDictionary["tariffs.labels.country"] === "Country"
      ? "China"
      : "ჩინეთი"]: "/icons/china.svg",
    China: "/icons/china.svg",
    [homeDictionary["tariffs.labels.country"] === "Country"
      ? "Dubai"
      : "დუბაი"]: "/icons/uae.svg",
    Dubai: "/icons/uae.svg",
    [homeDictionary["tariffs.labels.country"] === "Country"
      ? "United Kingdom"
      : "დიდი ბრიტანეთი"]: "/icons/england.svg",
    "United Kingdom": "/icons/england.svg",
    [homeDictionary["tariffs.labels.country"] === "Country"
      ? "Turkey"
      : "თურქეთი"]: "/icons/turkey.svg",
    Turkey: "/icons/turkey.svg",
    [homeDictionary["tariffs.labels.country"] === "Country"
      ? "Greece"
      : "საბერძნეთი"]: "/icons/greece.svg",
    Greece: "/icons/greece.svg",
    [homeDictionary["tariffs.labels.country"] === "Country"
      ? "Hong Kong"
      : "ჰონგ კონგი"]: "/icons/honk.svg",
    "Hong Kong": "/icons/honk.svg",
  };

  // Prepare data for DataTable, ensuring countryIconSrc is included
  const internalTariffData: TariffData[] = [
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country" ? "USA" : "აშშ",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "8.50$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country" ? "USA" : "აშშ"
        ] || "/icons/usa.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "China"
          : "ჩინეთი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "6.00$",
      oversizeWeight: homeDictionary["tariffs.no"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "China"
            : "ჩინეთი"
        ] || "/icons/china.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Dubai"
          : "დუბაი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "9.20$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Dubai"
            : "დუბაი"
        ] || "/icons/uae.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "United Kingdom"
          : "დიდი ბრიტანეთი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "7.80$",
      oversizeWeight: homeDictionary["tariffs.no"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "United Kingdom"
            : "დიდი ბრიტანეთი"
        ] || "/icons/england.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Turkey"
          : "თურქეთი",
      importMethod: homeDictionary["tariffs.importMethods.land"],
      pricePerKg: "4.50$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Turkey"
            : "თურქეთი"
        ] || "/icons/turkey.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Greece"
          : "საბერძნეთი",
      importMethod: homeDictionary["tariffs.importMethods.land"],
      pricePerKg: "5.00$",
      oversizeWeight: homeDictionary["tariffs.no"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Greece"
            : "საბერძნეთი"
        ] || "/icons/greece.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
    {
      country:
        homeDictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: homeDictionary["tariffs.yes"],
      countryIconSrc:
        countryIcons[
          homeDictionary["tariffs.labels.country"] === "Country"
            ? "Hong Kong"
            : "ჰონგ კონგი"
        ] || "/icons/honk.svg",
    },
  ];
  const countries = ["usa", "china", "dubai", "britain", "turkey", "hongkong"];
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-semibold text-center">რეისების განრიგი</h1>
      <p className="text-center py-4 text-gray-500">ყველა რეისი ერთ სივრცეში</p>
      <Tabs defaultValue="usa">
        <TabsList className="w-full h-16 border-2 p-0">
          {countries.map((country: string) => (
            <TabsTrigger
              key={country}
              className="text-black  data-[state=active]:text-white border-2 border-red-200 h-full data-[state=active]:bg-space-blue-light data-[state=active]:shadow-none"
              value={country}
            >
              {homeDictionary["tariffs.tabs.physicalPerson"]}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="usa">
          <FlightsTable data={internalTariffData} />
        </TabsContent>
        <TabsContent value="legal">
          <p className="text-center text-foreground/60 p-4">
            {homeDictionary["tariffs.tabs.legalPerson"]} data will go here.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Flights;
