"use client";

import { createContext, useContext, useState } from "react";

interface NotepadContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const NotepadContext = createContext<NotepadContextValue | null>(null);

export function NotepadProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NotepadContext.Provider
      value={{
        isOpen,
        toggle: () => setIsOpen((v) => !v),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </NotepadContext.Provider>
  );
}

export function useNotepad() {
  const ctx = useContext(NotepadContext);
  if (!ctx) throw new Error("useNotepad must be inside NotepadProvider");
  return ctx;
}
