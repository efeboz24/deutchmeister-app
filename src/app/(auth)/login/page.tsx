"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("E-posta veya şifre hatalı.");
    } else {
      router.push("/dashboard");
    }
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
          <h1 className="text-2xl font-bold text-text-primary mb-1">Giriş Yap</h1>
          <p className="text-text-secondary text-sm mb-6">Öğrenmeye kaldığın yerden devam et.</p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-navy border border-navy-border rounded-lg px-3 py-2.5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-gold/60 transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Giriş Yap
            </Button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Hesabın yok mu?{" "}
            <Link href="/register" className="text-gold hover:text-gold-hover font-medium transition-colors">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
