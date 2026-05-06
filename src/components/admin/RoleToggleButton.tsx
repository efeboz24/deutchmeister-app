"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function RoleToggleButton({ userId, currentRole }: { userId: string; currentRole: string }) {
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    const next = role === "admin" ? "student" : "admin";
    setLoading(true);
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: next }),
    });
    setLoading(false);
    if (res.ok) {
      setRole(next);
      toast.success(`Rol "${next}" olarak güncellendi`);
    } else {
      toast.error("Rol güncellenemedi");
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border transition-colors ${
        role === "admin"
          ? "bg-purple-500/20 text-purple-400 border-purple-500/40 hover:bg-purple-500/30"
          : "bg-navy-border text-text-muted border-navy-border hover:border-gold/30 hover:text-gold"
      }`}
    >
      {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
      {role}
    </button>
  );
}
