"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const LEVELS = [
    { value: "A1", label: "A1 - Başlangıç" },
    { value: "A2", label: "A2 - Temel" },
    { value: "B1", label: "B1 - Orta" },
    { value: "B2", label: "B2 - İleri Orta" },
    { value: "C1", label: "C1 - İleri" },
  ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("A1");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, level }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Kayıt başarısız.");
      setLoading(false);
      return;
    }

    router.push("/login?registered=1");
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/landing" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gold rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-navy" />
            </div>
            <div>
              <span className="text-text-primary font-bold text-2xl leading-none block">Deutsch</span>
              <span className="text-gold text-sm font-semibold leading-none">Meister</span>
            </div>
          </Link>
        </div>

        {/* Kart */}
        <div className="bg-navy-card border border-navy-border rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-1">Hesap Oluştur</h1>
          <p className="text-text-secondary text-sm mb-6">Sınavına hazırlanmaya başla.</p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Ad Soyad</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Adın Soyadın"
                className="w-full bg-navy border border-navy-border rounded-lg px-3 py-2.5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-gold/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ornek@email.com"
                className="w-full bg-navy border border-navy-border rounded-lg px-3 py-2.5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-gold/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="En az 6 karakter"
                className="w-full bg-navy border border-navy-border rounded-lg px-3 py-2.5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-gold/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Mevcut Seviyem</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-navy border border-navy-border rounded-lg px-3 py-2.5 text-text-primary text-sm focus:outline-none focus:border-gold/60 transition-colors"
              >
                {LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Kayıt Ol
            </Button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Zaten hesabın var mı?{" "}
            <Link href="/login" className="text-gold hover:text-gold-hover font-medium transition-colors">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
