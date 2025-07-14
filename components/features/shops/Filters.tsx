"use client";
import React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/common/CustomSelect";

interface FiltersProps {
  initialSelectedFruit: string;
  fruitOptions: { value: string; label: string; disabled?: boolean }[];
}

const Filters: React.FC<FiltersProps> = ({
  initialSelectedFruit,
  fruitOptions,
}) => {
  return (
    <div className="py-8 px-4 mb-4 bg-white dark:bg-background flex flex-row items-center justify-between flex-wrap">
      <div className="mb-4 md:mb-0">
        <h1 className="text-gray-600 text-sm">მისაღებია</h1>
        <p className="text-xl font-semibold text-center">4 ამანათი</p>
      </div>
      <div className="relative flex items-center gap-4">
        <SearchIcon className="absolute left-3 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search parcels..."
          className="w-64 pl-9"
        />
        <form>
          <CustomSelect
            onChange={(val) => console.log(val)}
            name="fruitSelect"
            options={fruitOptions}
            placeholder="Choose a fruit"
            defaultValue={initialSelectedFruit}
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default Filters;
