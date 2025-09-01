"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon, XIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import IconInput from "@/components/common/IconInput";
import * as PopoverPrimitive from "@radix-ui/react-popover";

interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  className?: string;
  searchValue?: string;
}

interface CustomComboboxProps {
  options: SelectOption[];
  placeholder?: React.ReactNode;
  name?: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  label?: React.ReactNode;
  isLoading?: boolean;
  error?: string;
  allowClear?: boolean;
  required?: boolean;
  onSearchChange?: (search: string) => void;
}

const CustomSelect: React.FC<CustomComboboxProps> = ({
  options,
  placeholder = "Select...",
  name,
  value,
  onChange,
  disabled = false,
  className,
  contentClassName,
  label,
  isLoading = false,
  error,
  allowClear = false,
  required = false,
  onSearchChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = React.useState<number>();

  React.useEffect(() => {
    if (buttonRef.current) setButtonWidth(buttonRef.current.offsetWidth);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  const selectedOption = React.useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.("");
    setSearch("");
  };

  const filteredOptions = React.useMemo(() => {
    if (!search) return options;
    return options.filter((o) =>
      (o.searchValue || (typeof o.label === "string" ? o.label : "") || o.value)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [options, search]);

  return (
    <div>
      {name && <input type="hidden" name={name} value={value ?? ""} />}

      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <Button
            disableAnimation
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={!!error}
            className={cn(
              "w-full h-full justify-between rounded-lg border bg-white text-gray-900 px-3 shadow-sm text-left hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:border-blue-500 dark:focus:ring-blue-400",
              error
                ? "border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
            disabled={disabled}
          >
            <span className="truncate flex-1 text-left">
              {selectedOption?.label || (
                <span className="text-muted-foreground dark:text-gray-400">{placeholder}</span>
              )}
            </span>
            <div className="flex items-center gap-1 ml-2">
              {allowClear && value && (
                <XIcon className="h-3.5 w-3.5 opacity-50 hover:opacity-100" onClick={handleClear} />
              )}
              <ChevronsUpDownIcon className="h-4 w-4 opacity-50" />
            </div>
          </Button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            side="bottom"
            align="start"
            sideOffset={4}
            style={{ width: buttonWidth ? `${buttonWidth}px` : undefined }}
            className={cn(
              "z-[9999] p-0 rounded-lg border bg-white dark:bg-gray-800 shadow-lg dark:border-gray-700 pointer-events-auto",
              contentClassName
            )}
            collisionPadding={8}
            forceMount
          >
            <Command shouldFilter={false} className="w-full">
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <IconInput
                  Icon={Search}
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="h-9"
                />
              </div>

              <CommandList className="max-h-60 overflow-y-auto">
                {isLoading ? (
                  <div className="p-2 space-y-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-full" />
                    ))}
                  </div>
                ) : filteredOptions.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    {search ? "No results found." : "No options available."}
                  </div>
                ) : (
                  <CommandGroup heading={label}>
                    {filteredOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-blue-50 focus:bg-blue-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700",
                          option.className,
                          value === option.value && "bg-blue-50 dark:bg-gray-700"
                        )}
                        onSelect={(v) => {
                          onChange?.(v === value ? "" : v);
                          setOpen(false);
                          setSearch("");
                        }}
                        aria-selected={value === option.value}
                      >
                        <span className="truncate">{option.label}</span>
                        <CheckIcon
                          className={cn(
                            "ml-2 h-4 w-4 text-blue-500",
                            value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-500">{error}</p>}
      {required && !value && !error && (
        <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">This field is required</p>
      )}
    </div>
  );
};

export default CustomSelect;
