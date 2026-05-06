"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const LEVELS = ["Tümü", "A1", "A2", "B1", "B2", "C1"];

export function LevelTabs({ active }: { active: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (level: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (level === "Tümü") {
      params.delete("level");
    } else {
      params.set("level", level);
    }
    router.push(`/vocabulary?${params.toString()}`);
  };

  return (
    <div className="flex gap-1 p-1 bg-navy-card border border-navy-border rounded-xl">
      {LEVELS.map((lvl) => {
        const isActive = active === lvl;
        return (
          <button
            key={lvl}
            onClick={() => navigate(lvl)}
            className={cn(
              "flex-1 py-1.5 px-3 text-sm font-medium rounded-lg transition-all duration-200",
              isActive
                ? "bg-gold text-navy shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-navy-light"
            )}
          >
            {lvl}
          </button>
        );
      })}
    </div>
  );
}
