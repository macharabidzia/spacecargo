import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex  items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50",
  {
    variants: {
      variant: {
        default: "bg-primary cursor-pointer text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-sm hover:shadow-md hover:bg-destructive/90 focus-visible:ring-destructive/50",
        outline: "border border-input text-foreground bg-background hover:bg-muted hover:shadow-sm",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:shadow-md hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-muted/50 hover:shadow-xs",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
      disableAnimation: {
        true: "transition-none transform-none hover:shadow-none hover:bg-none",
        false: "transition-all duration-200 transform hover:scale-[1.02]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      disableAnimation: false,
    },
  }
);

function Button({
  className,
  variant,
  size,
  disableAnimation = false,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    disableAnimation?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, disableAnimation, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
