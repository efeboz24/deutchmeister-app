import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function ProgressBar({ value, color = "bg-gold", className, showLabel, size = "md" }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("flex-1 bg-navy rounded-full overflow-hidden", size === "sm" ? "h-1.5" : "h-2.5")}>
        <div
          className={cn("h-full rounded-full transition-all duration-700", color)}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-text-secondary w-8 text-right">{clamped}%</span>
      )}
    </div>
  );
}
