import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "gradient-primary text-white shadow-medium hover:shadow-strong hover:scale-[1.02] border-0",
        destructive:
          "bg-destructive text-destructive-foreground shadow-medium hover:bg-destructive/90 hover:shadow-strong hover:scale-[1.02]",
        outline:
          "border-2 border-border bg-background text-foreground shadow-soft hover:bg-accent hover:text-accent-foreground hover:border-primary/30 hover:shadow-medium",
        secondary:
          "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80 hover:shadow-medium hover:scale-[1.02]",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-soft",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        gradient: "gradient-accent text-white shadow-medium hover:shadow-strong hover:scale-[1.02] border-0",
        glass: "glass text-foreground hover:bg-white/20 shadow-soft hover:shadow-medium",
        success: "bg-green-600 text-white shadow-medium hover:bg-green-700 hover:shadow-strong hover:scale-[1.02]",
        warning: "bg-yellow-500 text-white shadow-medium hover:bg-yellow-600 hover:shadow-strong hover:scale-[1.02]",
        info: "bg-blue-600 text-white shadow-medium hover:bg-blue-700 hover:shadow-strong hover:scale-[1.02]",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
