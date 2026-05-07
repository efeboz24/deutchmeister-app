"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Notepad } from "./Notepad";
import { LevelUpModal } from "@/components/ui/LevelUpModal";
import { useSession } from "next-auth/react";

interface AppShellProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export function AppShell({ header, children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState<string | null>(null);
  const { update } = useSession();

  const handleLevelUp = useCallback(
    async (e: Event) => {
      const newLevel = (e as CustomEvent<{ newLevel: string }>).detail.newLevel;
      // Refresh JWT session so sidebar/header show new level immediately
      await update();
      setLevelUpLevel(newLevel);
    },
    [update]
  );

  useEffect(() => {
    window.addEventListener("levelup", handleLevelUp);
    return () => window.removeEventListener("levelup", handleLevelUp);
  }, [handleLevelUp]);

  return (
    <div className="flex h-screen bg-navy overflow-hidden">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <motion.div
        className="flex-1 flex flex-col overflow-hidden min-w-0"
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {header}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </motion.div>
      <Notepad />

      {levelUpLevel && (
        <LevelUpModal
          newLevel={levelUpLevel}
          onClose={() => setLevelUpLevel(null)}
        />
      )}
    </div>
  );
}
