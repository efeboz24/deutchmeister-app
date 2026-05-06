"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Dumbbell,
  FileText,
  BookMarked,
  LogOut,
  GraduationCap,
  Trophy,
  ChevronDown,
  CalendarDays,
  PanelLeftClose,
  PanelLeftOpen,
  ClipboardCheck,
  Music,
  UserCircle,
  ShieldCheck,
  BarChart3,
  XCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";

const navItems = [
  { href: "/dashboard",  label: "Panel",          icon: LayoutDashboard },
  { href: "/learn",      label: "Öğren",          icon: BookOpen },
  { href: "/practice",   label: "Pratik",         icon: Dumbbell },
  { href: "/exam",       label: "Sınav",          icon: FileText },
  { href: "/vocabulary", label: "Kelimeler",      icon: BookMarked },
  { href: "/stats",      label: "İlerleme",       icon: BarChart3 },
  { href: "/mistakes",   label: "Yanlış Cevaplar", icon: XCircle },
  { href: "/wochenplan", label: "Haftalık Plan",   icon: CalendarDays },
  { href: "/profile",    label: "Profilim",       icon: UserCircle },
];

const examTopics = [
  { label: "Akkusativ / Dativ",    level: "A1-A2", href: "/learn/akkusativ-dativ" },
  { label: "Perfekt / Präteritum", level: "A2-B1", href: "/learn/perfekt-praeteritum" },
  { label: "Adjektivdeklination",  level: "A2-B1", href: "/learn/adjektivdeklination" },
  { label: "Genitiv",              level: "B1",    href: "/learn/genitiv" },
  { label: "Konjunktiv I",         level: "B1-B2", href: "/learn/konjunktiv-eins" },
  { label: "Konjunktiv II",        level: "B1-B2", href: "/learn/konjunktiv-zwei" },
  { label: "Nebensätze",           level: "A2-B2", href: "/learn/nebensaetze" },
];

const levelBadge: Record<string, string> = {
  "A1-A2": "bg-skill-horen/20 text-skill-horen",
  "A2-B1": "bg-skill-lesen/20 text-skill-lesen",
  "B1":    "bg-skill-grammatik/20 text-skill-grammatik",
  "B1-B2": "bg-skill-sprechen/20 text-skill-sprechen",
  "A2-B2": "bg-skill-schreiben/20 text-skill-schreiben",
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const artikelTopics = [
  { label: "Genus-Regeln",      level: "A1-A2", sub: "der/die/das",      href: "/learn/artikeller/genus-regeln" },
  { label: "Kasus-Tablosu",     level: "A1-B1", sub: "Nom/Akk/Dat/Gen",  href: "/learn/artikeller/kasus-tablosu" },
  { label: "Possessivartikel",  level: "A2-B1", sub: "mein/dein/sein…",  href: "/learn/artikeller/possessivartikel" },
  { label: "Negativartikel",    level: "A1-A2", sub: "kein/keine",        href: "/learn/artikeller/negativartikel" },
  { label: "Artikel + Präp.",   level: "A2-B1", sub: "zum/zur/im/ins",   href: "/learn/artikeller/praepositionem" },
];

const verbenTopics = [
  { label: "Modalverben",           level: "A1-B1", sub: "können/müssen…", href: "/learn/fiiller/modalverben" },
  { label: "Trennbare Verben",      level: "A1-A2", sub: "aufstehen…",     href: "/learn/fiiller/trennbare-verben" },
  { label: "Reflexive Verben",      level: "A2-B1", sub: "sich waschen…",  href: "/learn/fiiller/reflexive-verben" },
  { label: "Unregelm. Verben",      level: "A1-B2", sub: "sein/haben…",    href: "/learn/fiiller/unregelmaessige-verben" },
  { label: "Verben + Präp.",        level: "B1-B2", sub: "warten auf…",    href: "/learn/fiiller/verben-praepositionem" },
];

const konjTopics = [
  { label: "Koordinierend",    level: "A1-A2", sub: "und/aber/oder/denn",  href: "/learn/baglaclar/koordinierend" },
  { label: "Subordinierend",   level: "A2-B2", sub: "weil/dass/obwohl…",   href: "/learn/baglaclar/subordinierend" },
  { label: "Kausalangaben",    level: "A2-B1", sub: "weil/denn/da",        href: "/learn/baglaclar/kausal" },
  { label: "Zweiteilig",       level: "A2-B1", sub: "sowohl…als auch",     href: "/learn/baglaclar/zweiteilig" },
  { label: "Konzessiv & Kond.",level: "B1-B2", sub: "obwohl/wenn/falls",   href: "/learn/baglaclar/konzessiv" },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = (session?.user as { role?: string })?.role === "admin";
  const [examOpen, setExamOpen] = useState(false);
  const [artikelOpen, setArtikelOpen] = useState(false);
  const [verbenOpen, setVerbenOpen] = useState(false);
  const [konjOpen, setKonjOpen] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex-shrink-0 bg-navy-light border-r border-navy-border flex flex-col h-screen sticky top-0 overflow-hidden"
    >
      {/* Logo + Toggle */}
      <div className="px-3 py-4 border-b border-navy-border flex items-center justify-between shrink-0 min-h-[73px]">
        {collapsed ? (
          <Link href="/dashboard" className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center shrink-0 mx-auto">
            <GraduationCap className="w-5 h-5 text-navy" />
          </Link>
        ) : (
          <>
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-navy" />
              </div>
              <div>
                <span className="text-text-primary font-bold text-lg leading-none block">Deutsch</span>
                <span className="text-gold text-sm font-semibold leading-none">Meister</span>
              </div>
            </Link>
            <button
              onClick={onToggle}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-gold hover:bg-navy transition-all shrink-0 ml-1"
              title="Kenar çubuğunu daralt"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 overflow-hidden",
                collapsed ? "justify-center" : "",
                active
                  ? "bg-gold/15 text-gold border border-gold/30"
                  : "text-text-secondary hover:bg-navy hover:text-text-primary"
              )}
            >
              <Icon className={cn("w-5 h-5 flex-shrink-0", active ? "text-gold" : "")} />
              {!collapsed && <span className="whitespace-nowrap truncate">{label}</span>}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="border-t border-navy-border my-3" />

        {/* Collapsed: icons only */}
        {collapsed ? (
          <>
            <button
              title="Sınav Kazandıran Konular"
              className="w-full flex justify-center px-2.5 py-2.5 rounded-lg text-text-secondary hover:bg-navy hover:text-text-primary transition-all duration-150"
            >
              <Trophy className="w-5 h-5 text-gold" />
            </button>
            <Link
              href="/musik-auf-deutsch"
              title="Musik auf Deutsch"
              className={cn(
                "flex justify-center px-2.5 py-2.5 rounded-lg transition-all duration-150",
                pathname.startsWith("/musik-auf-deutsch")
                  ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                  : "text-text-secondary hover:bg-navy hover:text-text-primary"
              )}
            >
              <Music className="w-5 h-5 text-purple-400" />
            </Link>
            <Link
              href="/pruefungstraining"
              title="Prüfungstraining"
              className={cn(
                "flex justify-center px-2.5 py-2.5 rounded-lg transition-all duration-150",
                pathname.startsWith("/pruefungstraining")
                  ? "bg-gold/15 text-gold border border-gold/30"
                  : "text-text-secondary hover:bg-navy hover:text-text-primary"
              )}
            >
              <ClipboardCheck className="w-5 h-5 text-amber-400" />
            </Link>
          </>
        ) : (
          <>
            {/* Sınav Kazandıran Konular accordion */}
            <button
              onClick={() => setExamOpen((o) => !o)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-navy hover:text-text-primary transition-all duration-150"
            >
              <Trophy className="w-5 h-5 flex-shrink-0 text-gold" />
              <span className="flex-1 text-left text-sm font-semibold leading-tight whitespace-nowrap">
                Sınav Kazandıran Konular
              </span>
              <motion.span
                animate={{ rotate: examOpen ? 180 : 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="shrink-0"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {examOpen && (
                <motion.ul
                  key="exam-topics"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden pl-2 space-y-1"
                >
                  {examTopics.map(({ label, level, href }, i) => (
                    <motion.li
                      key={label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      {href ? (
                        <Link
                          href={href}
                          className={cn(
                            "flex items-center justify-between px-3 py-2 rounded-lg",
                            "bg-navy border border-navy-border",
                            "text-text-secondary text-xs hover:border-gold/40",
                            "hover:text-text-primary transition-colors",
                            pathname === href && "border-gold/40 text-gold bg-gold/5"
                          )}
                        >
                          <span className="truncate mr-2 font-medium">{label}</span>
                          <span className={cn(
                            "shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                            levelBadge[level] ?? "bg-navy-border text-text-muted"
                          )}>
                            {level}
                          </span>
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-navy border border-navy-border text-text-secondary text-xs cursor-default opacity-60">
                          <span className="truncate mr-2 font-medium">{label}</span>
                          <span className={cn(
                            "shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                            levelBadge[level] ?? "bg-navy-border text-text-muted"
                          )}>
                            {level}
                          </span>
                        </div>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {/* Prüfungstraining */}
            <Link
              href="/pruefungstraining"
              className={cn(
                "mt-1 flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                pathname.startsWith("/pruefungstraining")
                  ? "bg-gold/15 text-gold border border-gold/30"
                  : "text-text-secondary hover:bg-navy hover:text-text-primary"
              )}
            >
              <ClipboardCheck className={cn("w-5 h-5 flex-shrink-0", pathname.startsWith("/pruefungstraining") ? "text-gold" : "text-amber-400")} />
              <span className="flex-1 text-left text-sm font-semibold leading-tight whitespace-nowrap">
                Prüfungstraining
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                YENİ
              </span>
            </Link>

            {/* Divider */}
            <div className="border-t border-navy-border my-3" />

            {/* Sınav Kazandıran Artikeller */}
            <button
              onClick={() => setArtikelOpen((o) => !o)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-navy hover:text-text-primary transition-all duration-150"
            >
              <span className="text-base leading-none shrink-0">🔤</span>
              <span className="flex-1 text-left text-xs font-semibold leading-tight whitespace-nowrap">
                Sınav Kazandıran Artikeller
              </span>
              <motion.span animate={{ rotate: artikelOpen ? 180 : 0 }} transition={{ duration: 0.22 }} className="shrink-0">
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {artikelOpen && (
                <motion.ul key="artikel-topics" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                  className="overflow-hidden pl-2 space-y-1">
                  {artikelTopics.map(({ label, sub, level, href }, i) => (
                    <motion.li key={label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                      {href ? (
                        <Link
                          href={href}
                          className={cn(
                            "flex items-center justify-between px-3 py-2 rounded-lg",
                            "bg-navy border border-navy-border",
                            "text-text-secondary text-xs hover:border-blue-500/40",
                            "hover:text-text-primary transition-colors",
                            pathname === href && "border-blue-500/40 text-blue-400 bg-blue-500/5"
                          )}
                        >
                          <span className="truncate mr-2 font-medium">{label}</span>
                          <span className={cn(
                            "shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                            levelBadge[level] ?? "bg-navy-border text-text-muted"
                          )}>
                            {level}
                          </span>
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-navy border border-navy-border text-text-secondary text-xs cursor-default opacity-60">
                          <span className="truncate mr-2 font-medium">{label}</span>
                          <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-navy-border text-text-muted">{sub}</span>
                        </div>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {/* Sınav Kazandıran Fiiller */}
            <button
              onClick={() => setVerbenOpen((o) => !o)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-navy hover:text-text-primary transition-all duration-150"
            >
              <span className="text-base leading-none shrink-0">⚡</span>
              <span className="flex-1 text-left text-xs font-semibold leading-tight whitespace-nowrap">
                Sınav Kazandıran Fiiller
              </span>
              <motion.span animate={{ rotate: verbenOpen ? 180 : 0 }} transition={{ duration: 0.22 }} className="shrink-0">
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {verbenOpen && (
                <motion.ul key="verben-topics" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                  className="overflow-hidden pl-2 space-y-1">
                  {verbenTopics.map(({ label, sub, level, href }, i) => (
                    <motion.li key={label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                      {href ? (
                        <Link href={href} className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-lg",
                          "bg-navy border border-navy-border",
                          "text-text-secondary text-xs hover:border-amber-500/40",
                          "hover:text-text-primary transition-colors",
                          pathname === href && "border-amber-500/40 text-amber-400 bg-amber-500/5"
                        )}>
                          <span className="truncate mr-2 font-medium">{label}</span>
                          <span className={cn("shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full", levelBadge[level] ?? "bg-navy-border text-text-muted")}>{level}</span>
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-navy border border-navy-border text-text-secondary text-xs cursor-default opacity-60">
                          <span className="truncate mr-2 font-medium">{label}</span>
                          <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-navy-border text-text-muted">{sub}</span>
                        </div>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {/* Sınav Kazandıran Bağlaçlar */}
            <button
              onClick={() => setKonjOpen((o) => !o)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-navy hover:text-text-primary transition-all duration-150"
            >
              <span className="text-base leading-none shrink-0">🔗</span>
              <span className="flex-1 text-left text-xs font-semibold leading-tight whitespace-nowrap">
                Sınav Kazandıran Bağlaçlar
              </span>
              <motion.span animate={{ rotate: konjOpen ? 180 : 0 }} transition={{ duration: 0.22 }} className="shrink-0">
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {konjOpen && (
                <motion.ul key="konj-topics" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                  className="overflow-hidden pl-2 space-y-1">
                  {konjTopics.map(({ label, sub, level, href }, i) => (
                    <motion.li key={label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                      {href ? (
                        <Link href={href} className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-lg",
                          "bg-navy border border-navy-border",
                          "text-text-secondary text-xs hover:border-teal-500/40",
                          "hover:text-text-primary transition-colors",
                          pathname === href && "border-teal-500/40 text-teal-400 bg-teal-500/5"
                        )}>
                          <span className="truncate mr-2 font-medium">{label}</span>
                          <span className={cn("shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full", levelBadge[level] ?? "bg-navy-border text-text-muted")}>{level}</span>
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-navy border border-navy-border text-text-secondary text-xs cursor-default opacity-60">
                          <span className="truncate mr-2 font-medium">{label}</span>
                          <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-navy-border text-text-muted">{sub}</span>
                        </div>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div className="border-t border-navy-border my-3" />

            {/* Musik auf Deutsch */}
            <Link
              href="/musik-auf-deutsch"
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                pathname.startsWith("/musik-auf-deutsch")
                  ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                  : "text-text-secondary hover:bg-navy hover:text-text-primary"
              )}
            >
              <Music className={cn("w-5 h-5 flex-shrink-0", pathname.startsWith("/musik-auf-deutsch") ? "text-purple-400" : "text-purple-400")} />
              <span className="flex-1 text-left text-sm font-semibold leading-tight whitespace-nowrap">
                Musik auf Deutsch
              </span>
            </Link>
          </>
        )}
      </nav>

      {/* Admin link */}
      {isAdmin && (
        <div className="px-3 pb-2 shrink-0">
          <Link
            href="/admin"
            title={collapsed ? "Admin Paneli" : undefined}
            className={cn(
              "flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
              collapsed ? "justify-center" : "",
              pathname.startsWith("/admin")
                ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                : "text-text-secondary hover:bg-navy hover:text-text-primary"
            )}
          >
            <ShieldCheck className="w-5 h-5 flex-shrink-0 text-purple-400" />
            {!collapsed && <span className="whitespace-nowrap">Admin Paneli</span>}
          </Link>
        </div>
      )}

      {/* Logout + Expand */}
      <div className="p-3 border-t border-navy-border shrink-0">
        {collapsed && (
          <button
            onClick={onToggle}
            title="Kenar çubuğunu genişlet"
            className="w-full flex justify-center py-2 mb-1 rounded-lg text-text-muted hover:text-gold hover:bg-navy transition-all"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        )}
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            title={collapsed ? "Çıkış Yap" : undefined}
            className={cn(
              "w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-navy hover:text-red-400 transition-all duration-150",
              collapsed ? "justify-center" : ""
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">Çıkış Yap</span>}
          </button>
        </form>
      </div>
    </motion.aside>
  );
}
