"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  asChild?: boolean;
}

const buttonVariants = {
  base: "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy disabled:opacity-50 disabled:cursor-not-allowed",
  variants: {
    primary: "bg-gold text-navy hover:bg-gold-hover focus:ring-gold font-semibold",
    secondary: "bg-navy-card text-text-primary border border-navy-border hover:bg-navy-light focus:ring-navy-border",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-navy-light focus:ring-navy-border",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  },
  sizes: {
    sm: "text-sm px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-6 py-3 gap-2",
  },
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, asChild = false, children, disabled, ...props }, ref) => {
    const cls = cn(
      buttonVariants.base,
      buttonVariants.variants[variant],
      buttonVariants.sizes[size],
      className
    );

    if (asChild) {
      return (
        <Slot ref={ref} className={cls} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button ref={ref} className={cls} disabled={disabled || loading} {...props}>
        {loading && (
          <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
