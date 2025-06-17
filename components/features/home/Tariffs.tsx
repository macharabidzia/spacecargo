import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";
import React from "react";

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
  const dictionary: any = fullDictionary.home;

  const countryIcons: { [key: string]: string } = {
    [dictionary["tariffs.labels.country"] === "Country" ? "USA" : "აშშ"]:
      "/icons/usa.svg",
    USA: "/icons/usa.svg",
    [dictionary["tariffs.labels.country"] === "Country" ? "China" : "ჩინეთი"]:
      "/icons/china.svg",
    China: "/icons/china.svg",
    [dictionary["tariffs.labels.country"] === "Country" ? "Dubai" : "დუბაი"]:
      "/icons/uae.svg",
    Dubai: "/icons/uae.svg",
    [dictionary["tariffs.labels.country"] === "Country"
      ? "United Kingdom"
      : "დიდი ბრიტანეთი"]: "/icons/england.svg",
    "United Kingdom": "/icons/england.svg",
    [dictionary["tariffs.labels.country"] === "Country" ? "Turkey" : "თურქეთი"]:
      "/icons/turkey.svg",
    Turkey: "/icons/turkey.svg",
    [dictionary["tariffs.labels.country"] === "Country"
      ? "Greece"
      : "საბერძნეთი"]: "/icons/greece.svg",
    Greece: "/icons/greece.svg",
    [dictionary["tariffs.labels.country"] === "Country"
      ? "Hong Kong"
      : "ჰონგ კონგი"]: "/icons/honk.svg",
    "Hong Kong": "/icons/honk.svg",
  };

  const internalTariffData = [
    {
      country:
        dictionary["tariffs.labels.country"] === "Country" ? "USA" : "აშშ",
      importMethod: dictionary["tariffs.importMethods.air"],
      pricePerKg: "8.50$",
      oversizeWeight: dictionary["tariffs.yes"],
    },
    {
      country:
        dictionary["tariffs.labels.country"] === "Country" ? "China" : "ჩინეთი",
      importMethod: dictionary["tariffs.importMethods.air"],
      pricePerKg: "6.00$",
      oversizeWeight: dictionary["tariffs.no"],
    },
    {
      country:
        dictionary["tariffs.labels.country"] === "Country" ? "Dubai" : "დუბაი",
      importMethod: dictionary["tariffs.importMethods.air"],
      pricePerKg: "9.20$",
      oversizeWeight: dictionary["tariffs.yes"],
    },
    {
      country:
        dictionary["tariffs.labels.country"] === "Country"
          ? "United Kingdom"
          : "დიდი ბრიტანეთი",
      importMethod: dictionary["tariffs.importMethods.air"],
      pricePerKg: "7.80$",
      oversizeWeight: dictionary["tariffs.no"],
    },
    {
      country:
        dictionary["tariffs.labels.country"] === "Country"
          ? "Turkey"
          : "თურქეთი",
      importMethod: dictionary["tariffs.importMethods.land"],
      pricePerKg: "4.50$",
      oversizeWeight: dictionary["tariffs.yes"],
    },
    {
      country:
        dictionary["tariffs.labels.country"] === "Country"
          ? "Greece"
          : "საბერძნეთი",
      importMethod: dictionary["tariffs.importMethods.land"],
      pricePerKg: "5.00$",
      oversizeWeight: dictionary["tariffs.no"],
    },
    {
      country:
        dictionary["tariffs.labels.country"] === "Country"
          ? "Hong Kong"
          : "ჰონგ კონგი",
      importMethod: dictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: dictionary["tariffs.yes"],
    },
  ];

  return (
    <section className={`mt-20 space-y-6 ${className || ""}`}>
      <h1 className="text-4xl font-bold text-center text-foreground">
        {dictionary["tariffs.title"]}
      </h1>
      <p className="text-center text-foreground/60">
        {dictionary["tariffs.description"]}
      </p>
      <Tabs defaultValue="physical">
        <TabsList className="w-full h-16 border p-0">
          <TabsTrigger
            className="text-gray-100 h-full data-[state=active]:bg-space-blue-light data-[state=active]:shadow-none"
            value="physical"
          >
            {dictionary["tariffs.tabs.physicalPerson"]}
          </TabsTrigger>
          <TabsTrigger
            className="text-gray-400 h-full data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            value="legal"
          >
            {dictionary["tariffs.tabs.legalPerson"]}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="physical">
          <div className="shadow-md rounded-lg overflow-hidden">
            <Table className="rounded-lg">
              <TableHeader className="bg-space-blue-light rounded-t-lg hidden md:table-header-group">
                <TableRow>
                  <TableHead className="p-4 text-white">
                    {dictionary["tariffs.tableHeaders.country"]}
                  </TableHead>
                  <TableHead className="p-4 text-gray-100">
                    {dictionary["tariffs.tableHeaders.importMethod"]}
                  </TableHead>
                  <TableHead className="p-4 text-gray-100">
                    {dictionary["tariffs.tableHeaders.pricePerKg"]}
                  </TableHead>
                  <TableHead className="text-right p-4 text-gray-100">
                    {dictionary["tariffs.tableHeaders.oversizeWeight"]}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-background space-y-4">
                {(internalTariffData || []).map((tariff) => (
                  <TableRow
                    key={tariff.country}
                    className="block mb-4 p-4 border border-gray-200 rounded-lg md:table-row md:mb-0 md:p-0 md:border-b md:border-none"
                  >
                    <TableCell className="block px-0 py-1 text-gray-700 md:p-4 md:table-cell">
                      <span className="inline-block w-1/2 font-bold text-gray-500 md:hidden">
                        {dictionary["tariffs.labels.country"]}:
                      </span>
                      <div className="inline-block md:block text-lg text-foreground">
                        <div className="flex flex-row gap-4 items-center">
                          <Image
                            width={20}
                            height={20}
                            alt={`${tariff.country} flag`}
                            className="w-5 h-5"
                            src={countryIcons[tariff.country]}
                          />
                          <span>{tariff.country}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="block px-0 py-1 text-foreground md:p-4 md:table-cell">
                      <span className="inline-block w-1/2 font-bold text-gray-500 md:hidden">
                        {dictionary["tariffs.labels.importMethod"]}:
                      </span>
                      <span className="inline-block md:block text-lg">
                        {tariff.importMethod}
                      </span>
                    </TableCell>
                    <TableCell className="block px-0 py-1 text-foreground md:p-4 md:table-cell">
                      <span className="inline-block w-1/2 font-bold text-gray-500 md:hidden">
                        {dictionary["tariffs.labels.pricePerKg"]}:
                      </span>
                      <span className="inline-block md:block text-space-blue-light">
                        {tariff.pricePerKg}
                      </span>
                    </TableCell>
                    <TableCell className="block px-0 py-1 text-right text-foreground md:p-4 md:table-cell">
                      <span className="inline-block w-1/2 font-bold text-gray-500 md:hidden">
                        {dictionary["tariffs.labels.oversizeWeight"]}:
                      </span>
                      <span className="inline-block md:block text-lg">
                        {tariff.oversizeWeight === dictionary["tariffs.yes"]
                          ? dictionary["tariffs.yes"]
                          : dictionary["tariffs.no"]}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="legal">
          <p className="text-center text-foreground/60 p-4">
            {dictionary["tariffs.tabs.legalPerson"]} data will go here.
          </p>
        </TabsContent>
      </Tabs>
      <br />
      {children}
    </section>
  );
};

export default Tariffs;