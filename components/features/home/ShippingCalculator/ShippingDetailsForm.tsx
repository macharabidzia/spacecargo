"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Weight, Package } from "lucide-react";
import Image from "next/image";
import { useClientTranslation } from "@/i18n/i18n-provider";

interface Country {
  value: string;
  labelKey: string;
  flag: string;
}

interface ShippingDetailsFormProps {
  selectedCountry?: string;
  setSelectedCountry?: (country: string) => void;
}

const ShippingDetailsForm: React.FC<ShippingDetailsFormProps> = () => {
  const { t, lang } = useClientTranslation();

  const countries: Country[] = [
    { value: "china", labelKey: "country.china", flag: "/icons/china.svg" },
    { value: "usa", labelKey: "country.usa", flag: "/icons/usa.svg" },
    { value: "uk", labelKey: "country.uk", flag: "/icons/england.svg" },
  ];

  const [weight, setWeight] = useState("7.8");
  const [volume, setVolume] = useState("95");
  const [selectedCountry, setSelectedCountry] = useState("china");

  const getSelectedCountryDisplay = () => {
    const country = countries.find((c) => c.value === selectedCountry);
    if (country) {
      return (
        <>
          <Image
            width={30}
            height={30}
            alt={`${t(country.labelKey)} flag`}
            src={country.flag}
            className="mb-5 rounded-2xl"
          />
          <SelectValue className="font-semibold truncate">
            {t(country.labelKey)}
          </SelectValue>
        </>
      );
    }
    return (
      <SelectValue
        placeholder={t("form.countryPlaceholder")}
        className="font-semibold truncate"
      />
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between h-auto md:h-[60px] text-left">
      <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-background flex flex-col justify-center min-w-0">
        <p className="text-xs text-gray-500 ml-9">{t("form.country")}</p>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger
            style={{ boxShadow: "none" }}
            className="w-full h-auto flex items-center justify-between p-0 border-none focus:ring-0 focus:ring-offset-0"
          >
            <div className="flex items-center space-x-2">
              {getSelectedCountryDisplay()}
            </div>
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                <div className="flex items-center space-x-2">
                  <Image
                    width={20}
                    height={20}
                    alt={`${t(country.labelKey)} flag`}
                    src={country.flag}
                    className="rounded-full"
                  />
                  <span>{t(country.labelKey)}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-background flex flex-col justify-center min-w-0">
        <p className="text-xs text-gray-500 mb-2">{t("form.weight")}</p>
        <div className="flex items-center space-x-3">
          <Weight className="text-md" />
          <Input
            className="font-semibold truncate w-full bg-transparent border-none focus:outline-none focus:ring-0 focus:border-transparent p-0 h-auto
            focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent"
            placeholder="7.8"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-background flex flex-col justify-center min-w-0">
        <p className="text-xs text-gray-500 mb-2">{t("form.volume")}</p>
        <div className="flex items-center space-x-3">
          <Package className="text-md" />
          <Input
            className="font-semibold truncate w-full bg-transparent border-none focus:outline-none focus:ring-0 focus:border-transparent p-0 h-auto
            focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent"
            placeholder="95"
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
      </div>
        <Button className="bg-blue-500 text-white p-4 rounded-lg flex items-center justify-center space-x-2 w-full md:w-auto  mt-4 md:mt-0 h-auto">
          <span>{t("form.calculate")}</span>
          <span className="text-md">➤</span>
        </Button>
    </div>
  );
};

export default ShippingDetailsForm;
