// lib/customToast.tsx
"use client";

import { toast } from "sonner";
import { Check, XCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

export function showToast(
  type: ToastType,
  title: string,
  description?: string
) {
  const icons = {
    success: <Check className="w-5 h-5 text-white shrink-0" />,
    error: <XCircle className="w-5 h-5 text-white shrink-0" />,
    info: <Info className="w-5 h-5 text-white shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-white shrink-0" />,
  };

  const styles = {
    success: {
      bar: "bg-teal-500",
      iconBg: "bg-teal-500",
      background: "bg-teal-50 dark:bg-teal-900",
    },
    error: {
      bar: "bg-red-500",
      iconBg: "bg-red-500",
      background: "bg-red-50 dark:bg-red-900",
    },
    info: {
      bar: "bg-blue-500",
      iconBg: "bg-blue-500",
      background: "bg-blue-50 dark:bg-blue-900",
    },
    warning: {
      bar: "bg-yellow-500",
      iconBg: "bg-yellow-500",
      background: "bg-yellow-50 dark:bg-yellow-900",
    },
  };

  const currentStyle = styles[type];

  toast(
    <div className="flex items-center w-full">
      <div className={`w-1.5 h-16 ${currentStyle.bar} rounded-l-lg`} />
      <div className="flex items-center gap-4 px-4">
        <div
          className={`flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-full ${currentStyle.iconBg}`}
        >
          {icons[type]}
        </div>
        <div className="flex flex-col">
          <p className="font-semibold leading-snug text-gray-800 dark:text-gray-100">
            {title}
          </p>
          {description && (
            <p className="text-sm leading-snug text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>,
    {
      className: `p-0 overflow-hidden rounded-lg border-none shadow-lg ${currentStyle.background}`,
      duration: 4000,
    }
  );
}
