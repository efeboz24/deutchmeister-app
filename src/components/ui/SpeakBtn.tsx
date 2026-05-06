"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";

export function speakDE(text: string, e?: React.MouseEvent) {
  e?.stopPropagation();
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

export function SpeakBtn({ text, className = "" }: { text: string; className?: string }) {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={(e) => {
        setActive(true);
        speakDE(text, e);
        setTimeout(() => setActive(false), 1400);
      }}
      title="Almanca seslendir"
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200
        ${active ? "bg-gold/30 text-gold scale-110" : "bg-navy-border/50 text-text-muted hover:bg-gold/20 hover:text-gold"}
        ${className}`}
    >
      <Volume2 className="w-3.5 h-3.5" />
    </button>
  );
}
