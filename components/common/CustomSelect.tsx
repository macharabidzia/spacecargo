// src/components/CustomSelect.tsx
"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  placeholder?: React.ReactNode;
  name: string; // Required for form submission
  defaultValue?: string; // For initial value from server
  onChange?: (value: string) => void; // Optional client-side callback
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  label?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  name,
  defaultValue,
  onChange,
  disabled = false,
  className,
  contentClassName,
  label,
}) => {
  return (
    <Select
      name={name}
      defaultValue={defaultValue}
      onValueChange={onChange} // This is the prop that the ClientSelectWrapper will pass its client-side function to
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={option.className}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;