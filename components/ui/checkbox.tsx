"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base styles
        "peer size-4 shrink-0 rounded-[4px] border shadow-xs outline-none transition-colors",
        "border-gray-300 dark:border-gray-600 bg-white dark:bg-input/30",
        "disabled:cursor-not-allowed disabled:opacity-50",

        // Checked state
        "data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500",
        "data-[state=checked]:border-blue-600 dark:data-[state=checked]:border-blue-500",
        "data-[state=checked]:text-white",

        // Focus + invalid
        "focus-visible:ring-[3px] focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",

        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
