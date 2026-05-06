"use client";

import Link from "next/link";
import { Bell, Search, LogOut, Zap, BookOpen } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { signOut, useSession } from "next-auth/react";
import { useNotepad } from "@/contexts/NotepadContext";

interface HeaderProps {
  userName: string;
  userLevel: string;
  streak: number;
}

export function Header({ userName, userLevel, streak }: HeaderProps) {
  const { data: session } = useSession();
  const liveStreak = (session?.user as { streak?: number })?.streak ?? streak;
  const liveXP = (session?.user as { totalXP?: number })?.totalXP ?? 0;
  const { isOpen, toggle } = useNotepad();

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
        {/* XP */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-lg">
          <Zap className="w-3.5 h-3.5 text-gold" />
          <span className="text-sm font-semibold text-gold">{liveXP.toLocaleString()} XP</span>
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
            <Badge variant="level">{userLevel}</Badge>
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
