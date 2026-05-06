"use client";

import { SessionProvider } from "next-auth/react";
import { NotepadProvider } from "@/contexts/NotepadContext";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NotepadProvider>{children}</NotepadProvider>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#152236",
            border: "1px solid #243650",
            color: "#F0F4F8",
          },
        }}
      />
    </SessionProvider>
  );
}
