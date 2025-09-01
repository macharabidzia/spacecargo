import React from "react";
import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: LucideIcon;
  iconClassName?: string;
  inputClassName?: string;
}

const IconInput: React.FC<IconInputProps> = ({
  Icon,
  iconClassName,
  inputClassName,
  id,
  placeholder,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <Icon
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 ${iconClassName || ""
          }`}
        size={20}
      />
      <Input
        id={id}
        placeholder={placeholder}
        className={`pl-10 pr-4 py-6 w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200 ${inputClassName || ""
          }`}
        style={{ paddingLeft: "calc(20px + 12px + 12px)" }}
        {...props}
      />
    </div>
  );
};

export default IconInput;