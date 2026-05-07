"use client";

import Link from "next/link";
import { Bell, Search, LogOut, Zap, BookOpen } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { signOut, useSession } from "next-auth/react";
import { useNotepad } from "@/contexts/NotepadContext";

// Cumulative XP thresholds matching seed data
const LEVEL_XP: Record<string, number> = {
  A1: 500, A2: 1000, B1: 2000, B2: 3500, C1: 5000,
};
const LEVEL_PREV_XP: Record<string, number> = {
  A1: 0, A2: 500, B1: 1000, B2: 2000, C1: 3500,
};
const NEXT_LEVEL: Record<string, string> = {
  A1: "A2", A2: "B1", B1: "B2", B2: "C1",
};

interface HeaderProps {
  userName: string;
  userLevel: string;
  streak: number;
}

export function Header({ userName, userLevel, streak }: HeaderProps) {
  const { data: session } = useSession();
  const liveLevel = (session?.user as { currentLevel?: string })?.currentLevel ?? userLevel;
  const liveStreak = (session?.user as { streak?: number })?.streak ?? streak;
  const liveXP = (session?.user as { totalXP?: number })?.totalXP ?? 0;
  const { isOpen, toggle } = useNotepad();

  const goalXP = LEVEL_XP[liveLevel] ?? null;
  const prevXP = LEVEL_PREV_XP[liveLevel] ?? 0;
  const nextLevel = NEXT_LEVEL[liveLevel] ?? null;
  const isMaxLevel = liveLevel === "C1" && liveXP >= (LEVEL_XP.C1 ?? 5000);

  const progressPct = goalXP
    ? Math.min(100, Math.round(((liveXP - prevXP) / (goalXP - prevXP)) * 100))
    : 100;
  const remaining = goalXP ? Math.max(0, goalXP - liveXP) : 0;

  return (
    <header className="h-16 bg-navy-light border-b border-navy-border flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Arama */}
      <div className="flex items-center gap-3 bg-navy border border-navy-border rounded-lg px-3 py-2 w-72">
        <Search className="w-4 h-4 text-text-muted flex-shrink-0" />
        <input
          type="text"
          placeholder="Ara..."
          className="bg-transparent text-sm text-text-primary placeholder-text-muted outline-none w-full"
        />
      </div>

      {/* Sağ taraf */}
      <div className="flex items-center gap-4">

        {/* XP + Progress */}
        <div className="flex flex-col items-end gap-0.5 min-w-[140px]">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs font-bold text-gold">
                {liveXP.toLocaleString("tr-TR")} XP
              </span>
            </div>
            {isMaxLevel ? (
              <span className="text-[10px] text-gold font-semibold">MAX</span>
            ) : nextLevel ? (
              <span className="text-[10px] text-text-muted">
                {remaining.toLocaleString("tr-TR")} XP → {nextLevel}
              </span>
            ) : null}
          </div>
          <div className="w-full h-1.5 bg-navy rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Not Defteri */}
        <button
          onClick={toggle}
          title="Not Defteri"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
            isOpen
              ? "bg-blue-500/20 border-blue-400/40 text-blue-300"
              : "bg-navy border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="text-xs font-medium hidden sm:block">Not Defteri</span>
        </button>

        {/* Streak */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <span className="text-base">🔥</span>
          <span className="text-sm font-semibold text-orange-400">{liveStreak} gün</span>
        </div>

        {/* Bildirimler */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-navy border border-navy-border hover:border-gold/40 transition-colors">
          <Bell className="w-4 h-4 text-text-secondary" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" />
        </button>

        {/* Kullanıcı */}
        <Link href="/profile" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 bg-gold/20 border border-gold/30 rounded-full flex items-center justify-center">
            <span className="text-gold text-xs font-bold">{getInitials(userName)}</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-text-primary leading-none mb-0.5">{userName}</p>
            <Badge variant="level">{liveLevel}</Badge>
          </div>
        </Link>

        {/* Çıkış */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          title="Çıkış yap"
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-navy border border-navy-border hover:border-red-500/40 hover:text-red-400 text-text-muted transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
