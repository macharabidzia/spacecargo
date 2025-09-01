"use client";
import { useState, useEffect, useMemo } from "react";
import CustomSelect from "./CustomSelect";
import { countries } from "country-data-list";
import { Country } from "../features/auth/RegisterForm";
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
export default function PhoneInput({ value, onChange, placeholder }: PhoneInputProps) {
  const callingCodes = useMemo(
    () =>
      Array.from(
        new Set(
          Object.values(countries.all)
            .filter((c: Country) => c.countryCallingCodes.length > 0)
            .map((c) => c.countryCallingCodes[0])
        )
      ),
    []
  );

  const initialCode = callingCodes.find((code) => value.startsWith(code)) || callingCodes[0] || "+1";
  const [selectedCode, setSelectedCode] = useState<string>(initialCode);

  useEffect(() => {
    const matched = callingCodes.find((code) => value.startsWith(code));
    if (matched && matched !== selectedCode) setSelectedCode(matched);
  }, [value, callingCodes, selectedCode]);

  const options = callingCodes.map((code) => ({
    value: code,
    label: code,
  }));

  const handleSelectChange = (code: string) => {
    setSelectedCode(code);
    const newNumber = value.replace(selectedCode, "");
    onChange(code + newNumber);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawNumber = e.target.value.replace(/\D/g, "");
    onChange(selectedCode + rawNumber);
  };

  return (
    <div className="flex gap-2 w-full">
      <div className="flex-shrink-0 w-28">
        <CustomSelect
          name="countryCode"
          options={options}
          value={selectedCode}
          onChange={handleSelectChange}
          className="rounded-lg border border-gray-300 shadow-sm w-full"
        />
      </div>
      <div className="flex-1">
        <Input
          type="tel"
          placeholder={placeholder || "Phone number"}
          value={value.replace(selectedCode, "")}
          onChange={handleInputChange}
          className="h-12 w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
