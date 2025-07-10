// components/ui/switch.tsx
'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

// Import your icon components here.
// For example, if you're using Lucide React:

interface CustomSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  iconOn?: React.ReactNode; // Icon to display when switch is ON
  iconOff?: React.ReactNode; // Icon to display when switch is OFF
}

function Switch({ className, iconOn, iconOff, ...props }: CustomSwitchProps) {
  // Senior approach: Leverage Radix UI's native data-state attribute
  // for conditional rendering and styling.
  // The 'checked' prop (or defaultChecked) is handled by Radix Primitive itself.
  // We don't need to manage an internal 'checkedState' or useEffect for this.

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      // Make the root relative, ensure it has space for icons, and handle background
      className={cn(
        'peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
        'relative overflow-hidden', // Ensure relative positioning for absolute children and clip icons outside
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
        className
      )}
      {...props} // Pass all props directly, including onCheckedChange, checked, defaultChecked
    >
      {/* The actual thumb */}
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block size-4 rounded-full ring-0 shadow-lg transition-transform',
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground', // Thumb colors
          'data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        )}
      />

      {/* Icon for the ON state (visible when checked) - positioned on the right of the track */}
      {iconOn && (
        <div
          // Use data-[state] directly for opacity control
          data-state={props.checked ? 'checked' : 'unchecked'} // Manually set data-state based on prop.checked
          className={cn(
            'absolute right-0 top-0 bottom-0', // Position to the far right, spanning full height
            'flex items-center justify-center size-[1.15rem]', // Match switch height, make it a square container
            'z-0', // Ensure it's behind the thumb
            'transition-opacity duration-200',
            'data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0' // Control opacity via data-state
          )}
        >
          {iconOn}
        </div>
      )}

      {/* Icon for the OFF state (visible when unchecked) - positioned on the left of the track */}
      {iconOff && (
        <div
          // Use data-[state] directly for opacity control
          data-state={props.checked ? 'checked' : 'unchecked'} // Manually set data-state based on prop.checked
          className={cn(
            'absolute right-0 top-0 bottom-0', // Position to the far left, spanning full height
            'flex items-center justify-center size-[1.15rem]', // Match switch height, make it a square container
            'z-0', // Ensure it's behind the thumb
            'transition-opacity duration-200',
            'data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100' // Control opacity via data-state
          )}
        >
          {iconOff}
        </div>
      )}
    </SwitchPrimitive.Root>
  );
}

export { Switch };