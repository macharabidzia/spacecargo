"use client";
import React, { useState } from "react";
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

interface Country {
  value: string;
  label: string;
  flag: string;
}

interface ShippingDetailsFormProps {
  selectedCountry?: string;
  setSelectedCountry?: (country: string) => void;
  countries?: Country[];
}
const countries = [
  { value: "china", label: "ჩინეთი", flag: "🇨🇳" },
  { value: "usa", label: "ამერიკა", flag: "🇺🇸" },
  { value: "uk", label: "ბრიტანეთი", flag: "🇬🇧" },
];

const ShippingDetailsForm: React.FC<ShippingDetailsFormProps> = () => {
  const [weight, setWeight] = React.useState("7.8");
  const [volume, setVolume] = React.useState("95");
  const [selectedCountry, setSelectedCountry] = useState("china");

  const getSelectedCountryDisplay = () => {
    const country = countries.find((c) => c.value === selectedCountry);
    if (country) {
      return (
        <>
          <Image
            width={30}
            height={30}
            alt="china-flag"
            src="/icons/china.svg"
            className="mb-5 rounded-2xl"
          />
          <SelectValue className="font-semibold truncate">
            {country.label}
          </SelectValue>
        </>
      );
    }
    return (
      <SelectValue
        placeholder="აირჩიეთ ქვეყანა"
        className="font-semibold truncate"
      />
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between h-auto md:h-[60px] text-left">
      <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-white flex flex-col justify-center min-w-0">
        <p className="text-xs text-gray-500 ml-9">ქვეყანა</p>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger
            style={{ boxShadow: "none" }}
            className="w-full h-auto flex items-center justify-between p-0 border-none focus:ring-0 focus:ring-offset-0 bg-transparent"
          >
            <div className="flex items-center space-x-2">
              {getSelectedCountryDisplay()}
            </div>
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{country.flag}</span>
                  <span>{country.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-white flex flex-col justify-center min-w-0">
        <p className="text-xs text-gray-500 mb-2">წონა (კგ)</p>
        <div className="flex items-center space-x-3">
          <Weight className="text-md" />
          <Input
            className="font-semibold truncate w-full bg-transparent border-none focus:outline-none focus:ring-0 focus:border-transparent p-0 h-auto
                       focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent" // Added focus-visible overrides
            placeholder="7.8"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-white flex flex-col justify-center min-w-0">
        <p className="text-xs text-gray-500 mb-2">მოცულობა (მ³)</p>
        <div className="flex items-center space-x-3">
          <Package className="text-md" />
          <Input
            className="font-semibold truncate w-full bg-transparent border-none focus:outline-none focus:ring-0 focus:border-transparent p-0 h-auto
                       focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent" // Added focus-visible overrides
            placeholder="95"
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
      </div>

      <Button className="bg-blue-500 text-white p-4 rounded-lg flex items-center justify-center space-x-2 w-full md:w-auto md:ml-4 mt-4 md:mt-0 h-auto">
        <span>გამოთვლა</span>
        <span className="text-md">➤</span>
      </Button>
    </div>
  );
};

export default ShippingDetailsForm;
