"use client";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useClientTranslation } from "@/i18n/i18n-provider";
import { PackageFields } from "./PackageFields";
import {
  Country,
  CountryValue,
  ShippingFormValues,
} from "@/config/shipping.config";
import { useGlobalDataStore } from "@/store/GlobalDataStore";

const DIMENSIONAL_FACTOR = 6000;

type IShippingCalculatorFormProps = {
  countries: readonly Country[];
  canEdit: boolean;
};

export default function ShippingCalculatorForm({
  countries,
  canEdit,
}: IShippingCalculatorFormProps) {
  const { t } = useClientTranslation();
  const [price, setPrice] = useState<number | null>(null);
  const [showPackages, setShowPackages] = useState(false);
  const setCanEditInStore = useGlobalDataStore((s) => s.setCanEdit);

  const formMethods = useForm<ShippingFormValues>({
    defaultValues: {
      country: countries[0]?.value ?? "",
      packages: [{ width: "40", height: "30", length: "50", weight: "5.5" }],
    },
  });

  const { watch, setValue, control } = formMethods;

  const selectedCountryId = watch("country");
  const selectedCountry = countries.find((c) => c.value === selectedCountryId);
  const watchedPackages = useWatch({ control, name: "packages" });

  useEffect(() => {
    setCanEditInStore(canEdit);
  }, [canEdit, setCanEditInStore]);
  useEffect(() => {
    if (!watchedPackages || !selectedCountry) {
      setPrice(null);
      return;
    }

    const ratePerKg = selectedCountry.rate;

    const totalBillableWeight = watchedPackages.reduce((total, pkg) => {
      const actualWeight = parseFloat(pkg.weight) || 0;
      const width = parseFloat(pkg.width) || 0;
      const height = parseFloat(pkg.height) || 0;
      const length = parseFloat(pkg.length) || 0;

      const volumetricWeight = (width * height * length) / DIMENSIONAL_FACTOR;
      const billableWeight = Math.max(actualWeight, volumetricWeight);

      return total + billableWeight;
    }, 0);

    if (totalBillableWeight > 0) {
      const calculatedPrice = totalBillableWeight * ratePerKg;
      setPrice(parseFloat(calculatedPrice.toFixed(2)));
    } else {
      setPrice(null);
    }
  }, [watchedPackages, selectedCountry]);


  return (
    <FormProvider {...formMethods}>
      <form className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <div className="flex-1 p-3 border border-gray-300 rounded-lg bg-background flex flex-col justify-center min-w-0">
            <p className="text-xs text-gray-500 ml-10">{t("form.country")}</p>
            <Select
              value={selectedCountryId}
              onValueChange={(val: CountryValue) => setValue("country", val)}
            >
              <SelectTrigger className="w-full h-auto p-0 border-none focus:ring-0 focus:ring-offset-0">
                {selectedCountry && (
                  <div className="flex items-center space-x-2">
                    <Image
                      width={30}
                      height={30}
                      alt={`${t(selectedCountry.labelKey)} flag`}
                      src={selectedCountry.flag}
                      className="rounded-full"
                    />
                    <SelectValue className="font-semibold truncate">
                      {t(selectedCountry.labelKey)}
                    </SelectValue>
                  </div>
                )}
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

          {/* Toggle Button for Package Fields */}
          <Button
            type="button"
            onClick={() => setShowPackages(!showPackages)}
            variant="outline"
            className="h-auto flex-1 p-4 rounded-lg flex items-center gap-2 whitespace-nowrap"
          >
            <span>{t("form.packages")}</span>
            <ChevronDown
              className={`transition-transform duration-200 ${showPackages ? "rotate-180" : ""
                }`}
              size={18}
            />
          </Button>

          {/* Submit Button */}
          <Button
            type="button"
            className="bg-blue-500 hover:bg-space-blue-light/90 text-white dark:hover:text-space-blue p-4 rounded-lg h-auto flex-1"
          >
            <div className="flex flex-row gap-1 text-center items-center">
              <span className="font-semibold">{t("form.totalCost")}</span>
              <span className="font-bold">
                {price !== null ? `$ ${price}` : "-"}
              </span>
            </div>
          </Button>
        </div>

        {/* Toggleable Package Fields */}
        {showPackages && <PackageFields />}
      </form>
    </FormProvider>
  );
}
