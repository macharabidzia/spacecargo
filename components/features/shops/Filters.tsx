"use client";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/common/CustomSelect";
import { useClientTranslation } from "@/i18n/i18n-provider";

interface FiltersProps {
  initialSelectedFruit: string;
  fruitOptions?: { value: string; label: string; disabled?: boolean }[];
}

const Filters: React.FC<FiltersProps> = ({
  initialSelectedFruit,
  fruitOptions,
}) => {
  const [selectedFruit, setSelectedFruit] = useState(initialSelectedFruit);
  const { t } = useClientTranslation('common')
  return (
    <div className="py-8 px-4 mb-4 bg-white dark:bg-background flex flex-row items-center justify-between flex-wrap">
      <div className="mb-4 md:mb-0">
        <h1 className="font-semibold text-2xl text-space-blue-muted">{t('mainNav.shops')}</h1>
      </div>
      <div className="relative flex items-center gap-4">
        <SearchIcon className="absolute left-3 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder={t('search.parcels')}
          className="w-64 pl-9"
        />
        <form>
          {fruitOptions && <CustomSelect
            value={selectedFruit}
            onChange={setSelectedFruit}
            name="fruitSelect"
            options={fruitOptions}
            placeholder="Choose a fruit"
            className="w-full"
          />
          }
        </form>
      </div>
    </div>
  );
};

export default Filters;
