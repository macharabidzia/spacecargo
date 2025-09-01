import { getDictionary } from "@/i18n/dictionaries";
import React from "react";
import { TariffData } from "@/lib/table/tarrifs.columns";
import TariffsClient from "./TarrifsClient";
import { HomeDictionary } from "@/types/dictionary";

type Lang = "en" | "ka";


interface TariffsProps {
  children?: React.ReactNode;
  className?: string;
  lang: Lang;
}

const getTariffData = (homeDictionary: HomeDictionary): TariffData[] => {
  const countryIcons: { [key: string]: string } = {
    USA: "/icons/usa.svg",
    China: "/icons/china.svg",
    Dubai: "/icons/uae.svg",
    "United Kingdom": "/icons/england.svg",
    Turkey: "/icons/turkey.svg",
    Greece: "/icons/greece.svg",
    "Hong Kong": "/icons/honk.svg",
  };

  const isGeorgian = homeDictionary["tariffs.labels.country"] !== "Country";

  return [
    {
      country: isGeorgian ? "აშშ" : "USA",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "8.50$",
      oversizeWeight: true,
      countryIconSrc: countryIcons["USA"],
    },
    {
      country: isGeorgian ? "ჩინეთი" : "China",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "6.00$",
      oversizeWeight: false,
      countryIconSrc: countryIcons["China"],
    },
    {
      country: isGeorgian ? "დუბაი" : "Dubai",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "9.20$",
      oversizeWeight: true,
      countryIconSrc: countryIcons["Dubai"],
    },
    {
      country: isGeorgian ? "დიდი ბრიტანეთი" : "United Kingdom",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "7.80$",
      oversizeWeight: false,
      countryIconSrc: countryIcons["United Kingdom"],
    },
    {
      country: isGeorgian ? "თურქეთი" : "Turkey",
      importMethod: homeDictionary["tariffs.importMethods.land"],
      pricePerKg: "4.50$",
      oversizeWeight: true,
      countryIconSrc: countryIcons["Turkey"],
    },
    {
      country: isGeorgian ? "საბერძნეთი" : "Greece",
      importMethod: homeDictionary["tariffs.importMethods.land"],
      pricePerKg: "5.00$",
      oversizeWeight: false,
      countryIconSrc: countryIcons["Greece"],
    },
    {
      country: isGeorgian ? "ჰონგ კონგი" : "Hong Kong",
      importMethod: homeDictionary["tariffs.importMethods.air"],
      pricePerKg: "10.00$",
      oversizeWeight: true,
      countryIconSrc: countryIcons["Hong Kong"],
    },
  ];
};

const Tariffs = async ({ children, className, lang }: TariffsProps) => {
  const fullDictionary = await getDictionary(lang);
  const homeDictionary = fullDictionary.home as HomeDictionary;
  const internalTariffData = getTariffData(homeDictionary);

  return (
    <section className={`space-y-6 ${className || ""}`}>
      <h1 className="text-4xl font-bold text-center text-foreground mb-12">
        {homeDictionary["tariffs.title"]}
      </h1>
      <p className="text-center text-foreground/60">
        {homeDictionary["tariffs.description"]}
      </p>

      <TariffsClient
        homeDictionary={fullDictionary.home}
        internalTariffData={internalTariffData}
      />

      <br />
      {children}
    </section>
  );
};

export default Tariffs;
