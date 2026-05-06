"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, X, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ProfileEditForm() {
  const { update } = useSession();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"name" | "password">("name");
  const [name, setName] = useState("");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    const body: Record<string, string> = {};
    if (tab === "name" && name.trim()) body.name = name.trim();
    if (tab === "password") { body.currentPassword = currentPw; body.newPassword = newPw; }

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error ?? "Hata oluştu");
    } else {
      toast.success(tab === "name" ? "Ad güncellendi!" : "Şifre değiştirildi!");
      if (tab === "name") update();
      setName(""); setCurrentPw(""); setNewPw("");
      setOpen(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-navy-border text-text-muted text-xs hover:border-gold/30 hover:text-gold transition-colors"
      >
        <Pencil className="w-3.5 h-3.5" /> Düzenle
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-navy-card border border-navy-border rounded-2xl p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-text-primary font-bold">Profili Düzenle</h3>
                <button onClick={() => setOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2">
                {(["name", "password"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      tab === t ? "bg-gold/15 border-gold/30 text-gold" : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {t === "name" ? "Ad Değiştir" : "Şifre Değiştir"}
                  </button>
                ))}
              </div>

              {tab === "name" ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Yeni adınız"
                  className="w-full px-3 py-2.5 rounded-xl bg-navy border border-navy-border text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/40"
                />
              ) : (
                <div className="space-y-2">
                  <input
                    type="password"
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    placeholder="Mevcut şifre"
                    className="w-full px-3 py-2.5 rounded-xl bg-navy border border-navy-border text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/40"
                  />
                  <input
                    type="password"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    placeholder="Yeni şifre (min 6 karakter)"
                    className="w-full px-3 py-2.5 rounded-xl bg-navy border border-navy-border text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/40"
                  />
                </div>
              )}

              <button
                onClick={save}
                disabled={loading || (tab === "name" ? !name.trim() : !currentPw || !newPw)}
                className="w-full py-2.5 rounded-xl bg-gold/15 border border-gold/30 text-gold font-bold text-sm flex items-center justify-center gap-2 hover:bg-gold/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Kaydet
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
