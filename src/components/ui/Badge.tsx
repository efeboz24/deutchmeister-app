import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "error" | "warning" | "level";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-navy-light text-text-secondary",
    success: "bg-green-500/20 text-green-400",
    error: "bg-red-500/20 text-red-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    level: "bg-gold/20 text-gold font-bold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
