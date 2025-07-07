import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/i18n/dictionaries";
import React from "react";
import { getProducts } from "@/actions/products.actions"; // Assuming this fetches your product data
import { DataTable } from "@/components/common/DataTable";
import buildTariffColumns, { TariffData } from "@/lib/table/tarrifs.columns";
import TarrifsTable from "./Tarrifs/TarrifsTable";

type Lang = "en" | "ka";

interface TariffsDictionaryContent {
  "tariffs.title": string;
  "tariffs.description": string;
  "tariffs.tabs.physicalPerson": string;
  "tariffs.tabs.legalPerson": string;
  "tariffs.tableHeaders.country": string;
  "tariffs.tableHeaders.importMethod": string;
  "tariffs.tableHeaders.pricePerKg": string;
  "tariffs.tableHeaders.oversizeWeight": string;
  "tariffs.labels.country": string;
  "tariffs.labels.importMethod": string;
  "tariffs.labels.pricePerKg": string;
  "tariffs.labels.oversizeWeight": string;
  "tariffs.yes": string;
  "tariffs.no": string;
  "tariffs.importMethods.air": string;
  "tariffs.importMethods.land": string;
}

interface TariffsProps {
  children?: React.ReactNode;
  className?: string;
  lang: Lang;
}

const Tariffs = async ({ children, className, lang }: TariffsProps) => {
  const fullDictionary = await getDictionary(lang);
  const dictionary: { home: TariffsDictionaryContent } = fullDictionary as any;
  const homeDictionary = dictionary.home;
  const data: any = await getProducts();
  // Define country icons
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
  ];

  return (
    <section className={`mt-20 space-y-6 ${className || ""}`}>
      <h1 className="text-4xl font-bold text-center text-foreground">
        {homeDictionary["tariffs.title"]}
      </h1>
      <p className="text-center text-foreground/60">
        {homeDictionary["tariffs.description"]}
      </p>
      <Tabs defaultValue="physical">
        <TabsList className="w-full h-16 border p-0">
          <TabsTrigger
            className="text-gray-100 h-full data-[state=active]:bg-space-blue-light data-[state=active]:shadow-none"
            value="physical"
          >
            {homeDictionary["tariffs.tabs.physicalPerson"]}
          </TabsTrigger>
          <TabsTrigger
            className="text-gray-400 h-full data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            value="legal"
          >
            {homeDictionary["tariffs.tabs.legalPerson"]}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="physical">
          <TarrifsTable data={internalTariffData} />
        </TabsContent>
        <TabsContent value="legal">
          <p className="text-center text-foreground/60 p-4">
            {homeDictionary["tariffs.tabs.legalPerson"]} data will go here.
          </p>
        </TabsContent>
      </Tabs>
      <br />
      {children}
    </section>
  );
};

export default Tariffs;
