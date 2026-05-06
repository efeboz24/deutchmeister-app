"use client";

import Link from "next/link";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import {
  GraduationCap, ArrowRight, BookOpen,
  CheckCircle2, Zap, Brain, Trophy, Target, ChevronRight,
  Play, Users, Flame, Calendar, RotateCcw,
  Sparkles, TrendingUp, Clock, XCircle, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ─── Animation helpers ─── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      className={className}
    >{children}</motion.div>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString() + suffix);
  useEffect(() => { if (inView) motionVal.set(target); }, [inView, target, motionVal]);
  return <motion.span ref={ref}>{display}</motion.span>;
}

function Orb({ className }: { className: string }) {
  return <div className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`} />;
}

/* ─── Flashcard Demo ─── */
const flashcards = [
  { word: "die Bewerbung", article: "die", meaning: "iş başvurusu", example: "Ich schreibe eine Bewerbung.", level: "B1" },
  { word: "das Vorstellungsgespräch", article: "das", meaning: "mülakat", example: "Das Vorstellungsgespräch war sehr gut.", level: "B2" },
  { word: "der Aufenthaltstitel", article: "der", meaning: "oturma izni", example: "Er beantragt einen Aufenthaltstitel.", level: "B1" },
  { word: "die Krankenversicherung", article: "die", meaning: "sağlık sigortası", example: "Jeder braucht eine Krankenversicherung.", level: "A2" },
];

function FlashcardDemo() {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = flashcards[idx];

  const next = (q: number) => {
    setFlipped(false);
    setTimeout(() => setIdx((i) => (i + 1) % flashcards.length), 200);
    void q;
  };

  return (
    <div className="bg-navy-card border border-navy-border rounded-2xl p-5 space-y-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gold/20 rounded-lg flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-gold" />
          </div>
          <span className="text-sm font-semibold text-text-primary">Kelime Tekrarı</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">{idx + 1}/{flashcards.length}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-400">{card.level}</span>
        </div>
      </div>

      {/* card */}
      <motion.div
        onClick={() => setFlipped(f => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ transformStyle: "preserve-3d", cursor: "pointer" }}
        className="relative h-36 rounded-xl"
      >
        {/* front */}
        <div className="absolute inset-0 bg-navy rounded-xl border border-navy-border flex flex-col items-center justify-center gap-2"
          style={{ backfaceVisibility: "hidden" }}>
          <span className="text-2xl font-bold text-text-primary">{card.word}</span>
          <span className="text-xs text-text-muted">Anlamını biliyor musun? → Tıkla</span>
        </div>
        {/* back */}
        <div className="absolute inset-0 bg-gold/5 border border-gold/20 rounded-xl flex flex-col items-center justify-center gap-2 px-4 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <span className="text-xl font-bold text-gold">{card.meaning}</span>
          <span className="text-xs text-text-secondary italic">{card.example}</span>
        </div>
      </motion.div>

      {/* rating buttons */}
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { label: "Sıfırla", color: "border-red-500/30 text-red-400 hover:bg-red-500/10" },
          { label: "Zor", color: "border-orange-500/30 text-orange-400 hover:bg-orange-500/10" },
          { label: "Orta", color: "border-amber-500/30 text-amber-400 hover:bg-amber-500/10" },
          { label: "Kolay", color: "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10" },
        ].map((btn, i) => (
          <button key={btn.label} onClick={() => next(i)}
            className={`text-[11px] font-semibold py-1.5 rounded-lg border transition-all ${btn.color}`}>
            {btn.label}
          </button>
        ))}
      </div>

      {/* SRS info */}
      <div className="bg-navy rounded-lg px-3 py-2 flex items-center justify-between text-xs text-text-muted border border-navy-border">
        <span className="flex items-center gap-1.5">
          <RotateCcw className="w-3 h-3" />
          SM-2 algoritması ile tekrar planlaması
        </span>
        <span className="text-emerald-400 font-medium">+2.5 EF</span>
      </div>
    </div>
  );
}

/* ─── Mock Exam Preview ─── */
function ExamPreview() {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = 2;

  return (
    <div className="bg-navy-card border border-navy-border rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-navy-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gold/20 rounded-lg flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5 text-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">telc B2 — Lesen</p>
            <p className="text-xs text-text-muted">Teil 1 · Soru 3/5</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-amber-400">
          <Clock className="w-3 h-3" />
          <span>47:22</span>
        </div>
      </div>

      <div className="bg-navy rounded-xl p-3 border border-navy-border text-xs text-text-secondary leading-relaxed">
        <span className="text-text-muted text-[10px] font-semibold uppercase tracking-wide block mb-1">Metin</span>
        Die Arbeitslosigkeit in Deutschland ist im letzten Quartal auf{" "}
        <span className="bg-gold/20 text-gold px-0.5 rounded">5,2%</span> gesunken, was den niedrigsten Stand
        seit der Wiedervereinigung darstellt...
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-text-primary">Metne göre işsizlik oranı nedir?</p>
        {["4,8%", "5,2%", "6,1%", "5,7%"].map((opt, i) => {
          let cls = "border-navy-border text-text-secondary hover:border-gold/40";
          if (selected !== null) {
            if (i === correct) cls = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
            else if (i === selected && selected !== correct) cls = "border-red-500/40 bg-red-500/10 text-red-300";
            else cls = "border-navy-border text-text-muted opacity-40";
          }
          return (
            <button key={opt} onClick={() => setSelected(i)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs text-left transition-all ${cls}`}>
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          className={`flex items-start gap-2 text-xs p-2.5 rounded-lg border ${selected === correct
            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
            : "bg-red-500/5 border-red-500/20 text-red-300"}`}>
          {selected === correct
            ? <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            : <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />}
          {selected === correct
            ? "Doğru! Metin 5,2% rakamını açıkça belirtiyor."
            : "Yanlış. Metinde \"5,2%\" ifadesine bak."}
        </motion.div>
      )}
    </div>
  );
}

/* ─── Dashboard Mock ─── */
function DashboardMock() {
  const skills = [
    { label: "Hören", score: 72, color: "bg-blue-500" },
    { label: "Lesen", score: 85, color: "bg-emerald-500" },
    { label: "Schreiben", score: 61, color: "bg-amber-500" },
    { label: "Sprechen", score: 54, color: "bg-violet-500" },
    { label: "Grammatik", score: 78, color: "bg-teal-500" },
  ];

  return (
    <div className="bg-navy-card border border-navy-border rounded-2xl p-5 space-y-4">
      {/* user banner */}
      <div className="flex items-center gap-3 pb-3 border-b border-navy-border">
        <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
          <span className="text-gold font-bold text-sm">ME</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">Mehmet E.</p>
          <p className="text-xs text-text-muted">B1 seviyesi</p>
        </div>
        <div className="ml-auto flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 rounded-full px-2.5 py-1">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-xs font-bold text-orange-400">12 gün</span>
        </div>
      </div>

      {/* xp progress */}
      <div>
        <div className="flex justify-between text-xs text-text-muted mb-1.5">
          <span>XP İlerlemesi</span>
          <span className="text-gold font-medium">3.240 / 5.000</span>
        </div>
        <div className="h-2 bg-navy rounded-full overflow-hidden">
          <motion.div className="h-full bg-gold rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "64.8%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }} />
        </div>
      </div>

      {/* skills */}
      <div className="space-y-2">
        {skills.map(({ label, score, color }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-xs text-text-muted w-16 shrink-0">{label}</span>
            <div className="flex-1 h-1.5 bg-navy rounded-full overflow-hidden">
              <motion.div className={`h-full rounded-full ${color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }} />
            </div>
            <span className="text-xs text-text-muted w-7 text-right">{score}%</span>
          </div>
        ))}
      </div>

      {/* last exam */}
      <div className="bg-navy rounded-xl p-3 border border-navy-border flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-text-primary">telc B1 Deneme Sınavı #2</p>
          <p className="text-xs text-text-muted mt-0.5">3 gün önce</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-emerald-400">76%</p>
          <p className="text-[10px] text-emerald-400/70">Geçti</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Grammar Topic List ─── */
const grammarTopics = [
  { code: "A1", topics: ["Artikel (der/die/das)", "Präsens", "W-Fragen", "Verneinung (nicht/kein)"] },
  { code: "A2", topics: ["Akkusativ & Dativ", "Modalverben", "Perfekt", "Komparativ"] },
  { code: "B1", topics: ["Konjunktiv II", "Passiv", "Relativsätze", "Infinitivkonstruktionen"] },
  { code: "B2", topics: ["Konjunktiv I", "Genitiv", "Erweiterte Partizipien", "Konzessivsätze"] },
  { code: "C1", topics: ["Nominalisierung", "Modalpartikeln", "Präpositionalgefüge", "Stilmittel"] },
];

/* ─── Data ─── */
const stats = [
  { value: 5000, suffix: "+", label: "Kelime & Cümle" },
  { value: 65, suffix: "+", label: "Gramer Konusu" },
  { value: 20, suffix: "+", label: "Deneme Sınavı" },
  { value: 100, suffix: "%", label: "TELC Formatı" },
];

const features = [
  {
    icon: Zap, title: "SM-2 Kelime Kartları",
    desc: "Spaced repetition algoritması ile öğrendiğin kelimeleri tam zamanında tekrarlarsın — ne fazla, ne eksik.",
    badge: "5.000+ kelime",
  },
  {
    icon: BookOpen, title: "Gramer Alıştırmaları",
    desc: "A1'den C1'e 65+ gramer konusu. Her konu interaktif sorular, açıklamalar ve hata analizliyle geliyor.",
    badge: "65+ konu",
  },
  {
    icon: Trophy, title: "Gerçek TELC Sınavları",
    desc: "Birebir telc formatında deneme sınavılar. Lesen, Schreiben, Hören bölümleri ve anlık AI değerlendirmesi.",
    badge: "20+ deneme sınavı",
  },
  {
    icon: Calendar, title: "Haftalık Çalışma Planı",
    desc: "Kendi haftalık planını oluştur, görevlerini takip et. Günlük rutinle her gün küçük ilerlemeler büyük sonuçlar doğurur.",
    badge: "Haftalık Plan",
  },
  {
    icon: XCircle, title: "Yanlış Cevap Defteri",
    desc: "Yanlış yaptığın sorular otomatik kaydedilir. Sonraki oturumda aynı konuyu tekrar çözüp pekiştirirsin.",
    badge: "Otomatik",
  },
  {
    icon: BarChart3, title: "İlerleme Raporu",
    desc: "Hören, Lesen, Schreiben, Sprechen, Grammatik — her becerini ayrı ayrı takip et. Sınav hazırlık skorun her gün güncellenir.",
    badge: "5 beceri",
  },
];

const steps = [
  { n: "01", icon: Target, title: "Kayıt Ol, Seviyeni Seç", desc: "A1'den C1'e seviyeni seç. Müfredat hemen açılır, bir dakika bile beklemeden çalışmaya başlarsın." },
  { n: "02", icon: Brain, title: "Gramer + Kelime Çalış", desc: "Her gün 20 dakika: yeni kelime kartları, gramer alıştırmaları ve seviyene özel okuma metinleri." },
  { n: "03", icon: Zap, title: "Deneme Sınavıa Gir", desc: "Gerçek telc formatında tam simülasyon. Bitince AI hangi bölümde nerede hata yaptığını detaylı gösterir." },
  { n: "04", icon: Trophy, title: "Sınav Gününe Hazır Çık", desc: "Yanlış cevap defterin, beceri skorların ve geçmiş deneme sınavıların seni sınav gününe eksiksiz hazırlar." },
];


/* ─── Readiness Calculator ─── */
const CALC_LEVELS = ["YB", "A1", "A2", "B1", "B2", "C1"] as const;
type CalcLevel = typeof CALC_LEVELS[number];

const HOURS_PER_JUMP: Record<string, number> = {
  "YB-A1": 80, "A1-A2": 150, "A2-B1": 200, "B1-B2": 300, "B2-C1": 350,
};

const DAILY_TIMES = [
  { label: "15 dk",  hours: 0.25 },
  { label: "30 dk",  hours: 0.50 },
  { label: "45 dk",  hours: 0.75 },
  { label: "1 saat", hours: 1.00 },
  { label: "2 saat", hours: 2.00 },
  { label: "3 saat", hours: 3.00 },
];

const LEVEL_COLORS: Record<CalcLevel, string> = {
  YB: "border-pink-500/40    bg-pink-500/10    text-pink-400",
  A1: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  A2: "border-blue-500/40    bg-blue-500/10    text-blue-400",
  B1: "border-violet-500/40  bg-violet-500/10  text-violet-400",
  B2: "border-orange-500/40  bg-orange-500/10  text-orange-400",
  C1: "border-gold/40        bg-gold/10        text-gold",
};

const LEVEL_COLORS_IDLE = "border-navy-border bg-navy text-text-muted hover:border-gold/30 hover:text-text-secondary";

function ReadinessCalculator() {
  const [current, setCurrent] = useState<CalcLevel | null>(null);
  const [target,  setTarget]  = useState<CalcLevel | null>(null);
  const [dailyH,  setDailyH]  = useState<number | null>(null);

  const handleCurrent = (lvl: CalcLevel) => {
    setCurrent(lvl);
    if (target && CALC_LEVELS.indexOf(target) <= CALC_LEVELS.indexOf(lvl)) setTarget(null);
  };

  const availableTargets = current
    ? CALC_LEVELS.slice(CALC_LEVELS.indexOf(current) + 1)
    : CALC_LEVELS.slice(1);

  const result = useMemo(() => {
    if (!current || !target || dailyH === null) return null;
    const ci = CALC_LEVELS.indexOf(current);
    const ti = CALC_LEVELS.indexOf(target);
    let totalHours = 0;
    for (let i = ci; i < ti; i++) totalHours += HOURS_PER_JUMP[`${CALC_LEVELS[i]}-${CALC_LEVELS[i + 1]}`];
    const weeks  = Math.ceil(totalHours / (dailyH * 7));
    const months = +(weeks / 4.3).toFixed(1);

    let examPeriod: string;
    if (weeks <= 7)       examPeriod = "Haziran 2026";
    else if (weeks <= 20) examPeriod = "Eylül 2026";
    else if (weeks <= 34) examPeriod = "Aralık 2026";
    else                  examPeriod = "Mart 2027";

    let tip: string;
    if (weeks <= 8)       tip = "Az kaldı! Şimdi başlarsan o sınav dönemine rahat yetişirsin.";
    else if (weeks <= 16) tip = "Tutarlı çalışmayla bu hedefe kesinlikle ulaşabilirsin.";
    else if (weeks <= 28) tip = "Uzun soluklu ama sistemli çalışma ile her hafta fark edilir.";
    else                  tip = "Büyük bir hedef. Adım adım ilerle, her seviye kendi içinde anlam taşıyor.";

    return { weeks, months, totalHours, examPeriod, tip };
  }, [current, target, dailyH]);

  const Chip = ({
    label, active, onClick, colorCls,
  }: { label: string; active: boolean; onClick: () => void; colorCls?: string }) => (
    <motion.button
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border text-sm font-bold transition-all duration-150 ${
        active ? (colorCls ?? "border-gold/50 bg-gold/10 text-gold") : LEVEL_COLORS_IDLE
      }`}
    >{label}</motion.button>
  );

  return (
    <div className="bg-navy-card border border-navy-border rounded-3xl p-8 max-w-3xl mx-auto shadow-xl shadow-navy/40">
      {/* Rows */}
      <div className="space-y-6">
        {/* Row 1 — current level */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-text-secondary w-36 shrink-0">Şu anki seviyem</span>
          <div className="flex gap-2 flex-wrap">
            {CALC_LEVELS.slice(0, 5).map((lvl) => (
              <Chip key={lvl} label={lvl === "YB" ? "Yeni Başlayan" : lvl}
                active={current === lvl} onClick={() => handleCurrent(lvl)}
                colorCls={LEVEL_COLORS[lvl]} />
            ))}
          </div>
        </div>

        {/* Row 2 — target level */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-text-secondary w-36 shrink-0">Hedef seviyem</span>
          <div className="flex gap-2 flex-wrap">
            {availableTargets.map((lvl) => (
              <Chip key={lvl} label={lvl} active={target === lvl} onClick={() => setTarget(lvl)}
                colorCls={LEVEL_COLORS[lvl]} />
            ))}
            {availableTargets.length === 0 && (
              <span className="text-xs text-text-muted italic">Önce şu anki seviyeni seç</span>
            )}
          </div>
        </div>

        {/* Row 3 — daily time */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-text-secondary w-36 shrink-0">Günlük çalışma</span>
          <div className="flex gap-2 flex-wrap">
            {DAILY_TIMES.map(({ label, hours }) => (
              <Chip key={label} label={label} active={dailyH === hours} onClick={() => setDailyH(hours)} />
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div key="result"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 border-t border-navy-border pt-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Big number */}
              <div className="flex-1">
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-6xl font-black text-gold leading-none">~{result.weeks}</span>
                  <span className="text-xl font-semibold text-text-secondary mb-1">hafta</span>
                </div>
                <p className="text-sm text-text-muted">
                  yaklaşık <span className="text-text-secondary font-medium">{result.months} ay</span>
                  {" · "}toplam <span className="text-text-secondary font-medium">{result.totalHours} saatlik</span> çalışma
                </p>
                <div className="mt-3 inline-flex items-center gap-2 bg-gold/8 border border-gold/20 rounded-xl px-3 py-1.5">
                  <Trophy className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span className="text-xs font-semibold text-gold">{result.examPeriod} sınavına yetişirsin</span>
                </div>
              </div>

              {/* Tip + CTA */}
              <div className="sm:max-w-[240px] space-y-4">
                <p className="text-sm text-text-secondary leading-relaxed">{result.tip}</p>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button asChild size="sm" className="w-full gap-2">
                    <Link href="/register">Hemen Başla <ArrowRight className="w-4 h-4" /></Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="placeholder"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="mt-8 border-t border-navy-border pt-8 flex items-center justify-center"
          >
            <p className="text-sm text-text-muted">
              {!current ? "Şu anki seviyeni seç →" : !target ? "Hedef seviyeni seç →" : "Günlük çalışma süresini seç →"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Comparison data ─── */
const COMPARISON_GROUPS: {
  group: string;
  rows: { feature: string; sub: string; them: boolean | null }[];
}[] = [
  {
    group: "Sınav Odaklılık",
    rows: [
      { feature: "Birebir TELC formatında sorular",      sub: "Gerçek sınav koşullarını simüle eden tam ortam",          them: false },
      { feature: "Schreiben: Mektup ve e-posta pratiği", sub: "Sınavda çıkan yazma görev türlerine özel alıştırmalar",   them: false },
      { feature: "Önemli konulara ağırlıklı müfredat",   sub: "Konjunktiv II, Passiv, Nebensätze sınava göre sıralanır", them: false },
      { feature: "AI destekli sınav geri bildirimi",     sub: "Her sınavdan sonra kişisel zayıflık ve öneri analizi",    them: false },
    ],
  },
  {
    group: "Müfredat & Plan",
    rows: [
      { feature: "Sırayla ilerleyen konu düzeni",        sub: "A1'den C1'e, önce temeller sonra ileri konular",          them: null  },
      { feature: "Haftalık çalışma planı ve görev takibi",sub: "Kendi programını oluştur, günlük hedeflerini takip et",  them: false },
      { feature: "Müzikle Almanca öğrenme",              sub: "Şarkılar üzerinden kelime, gramer ve telaffuz",           them: false },
    ],
  },
  {
    group: "Araçlar & Takip",
    rows: [
      { feature: "SM-2 akıllı kelime tekrarı",           sub: "Tam zamanında tekrar — boşa harcanan çalışma yok",       them: null  },
      { feature: "Yanlış cevap defteri (otomatik)",       sub: "Hatalar kaydedilir, sonraki oturumda tekrar çözersin",   them: false },
      { feature: "Beceri bazlı ilerleme raporu",          sub: "Hören, Lesen, Schreiben, Sprechen, Grammatik ayrı ayrı", them: false },
    ],
  },
];

/* ──────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy text-text-primary overflow-x-hidden">

      {/* ── Sticky Nav ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 border-b border-navy-border backdrop-blur-xl bg-navy/80"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}
              className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-navy" />
            </motion.div>
            <div>
              <span className="font-bold text-lg leading-none block">Deutsch</span>
              <span className="text-gold text-xs font-semibold leading-none">Meister</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Özellikler", href: "#ozellikler" },
              { label: "Seviyeler", href: "#seviyeler" },
              { label: "Nasıl Çalışır", href: "#nasil-calisir" },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm"><Link href="/login">Giriş Yap</Link></Button>
            <Button asChild size="sm"><Link href="/register">Ücretsiz Başla</Link></Button>
          </div>
        </div>
      </motion.header>

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <Orb className="w-[600px] h-[600px] bg-gold top-[-200px] left-[-200px]" />
        <Orb className="w-[400px] h-[400px] bg-blue-500 top-[200px] right-[-100px]" />
        <Orb className="w-[300px] h-[300px] bg-violet-500 bottom-[50px] left-[30%]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#F5A623 1px, transparent 1px), linear-gradient(90deg, #F5A623 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-8">
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 bg-gold rounded-full" />
                <span className="text-sm text-gold font-medium">TELC Sertifika Hazırlık Platformu</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl font-bold text-text-primary mb-6 leading-[1.1] tracking-tight">
                Almancayı<br />
                <span className="relative">
                  <span className="text-gold">akıllıca öğren</span>
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0 origin-left" />
                </span>
                <br />ve sınavı geç.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl text-text-secondary max-w-xl mb-10 leading-relaxed">
                5.000+ kelime kartı, 65+ gramer konusu, gerçek TELC deneme sınavıları ve yapay zeka analizi —
                hepsi tek platformda.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-start gap-4 mb-10">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button asChild size="lg" className="text-base px-8 shadow-lg shadow-gold/20">
                    <Link href="/register" className="flex items-center gap-2">
                      Ücretsiz Başla <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button asChild variant="secondary" size="lg" className="text-base px-8 gap-2">
                    <Link href="/demo"><Play className="w-4 h-4" /> Demo Gör</Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                className="flex flex-wrap items-center gap-5 text-sm text-text-muted">
                {["Kredi kartı gerekmez", "Anında erişim", "A1'den C1'e tam müfredat"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />{t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — live dashboard mockup */}
            <FadeIn delay={0.3} className="hidden lg:block">
              <DashboardMock />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-navy-border bg-navy-card/50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, suffix, label }, i) => (
              <FadeUp key={label} delay={i * 0.1} className="text-center">
                <div className="text-4xl font-bold text-gold mb-1">
                  <CountUp target={value} suffix={suffix} />
                </div>
                <p className="text-sm text-text-secondary">{label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flashcard Section ── */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase">Kelime Hazinesi</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-6">
              5.000+ kelimeyi<br />
              <span className="text-gold">doğru sırayla</span> öğren
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              SM-2 spaced repetition algoritması her kelimenin ne zaman unutulacağını hesaplar
              ve tam doğru anda sana tekrar ettirir. Boşa harcanan tekrar yok.
            </p>
            <div className="space-y-3 mb-8">
              {[
                { icon: TrendingUp, text: "\"Kolay\" dediğin kart 7 gün sonra gelir, \"Sıfırla\" dediğin yarın." },
                { icon: Sparkles, text: "Her kart için örnek cümle ve telaffuz rehberi." },
                { icon: BarChart3, text: "Kaç kelime öğrenildi, kaçı bekliyor — her gün canlı istatistik." },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gold/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <span className="text-text-secondary text-sm leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
            <Button asChild variant="secondary">
              <Link href="/register" className="flex items-center gap-2">
                Kelime çalışmaya başla <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </FadeUp>

          <FadeIn delay={0.2}>
            <FlashcardDemo />
          </FadeIn>
        </div>
      </section>

      {/* ── Grammar Section ── */}
      <section id="seviyeler" className="relative overflow-hidden py-28 border-y border-navy-border">
        <Orb className="w-[500px] h-[500px] bg-gold left-[-150px] top-[50%] -translate-y-1/2" />
        <div className="relative max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase">Gramer Müfredatı</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">A1&apos;den C1&apos;e 65+ gramer konusu</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Her konuya özel interaktif alıştırmalar, anlık düzeltmeler ve yanlış cevap takibi.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {grammarTopics.map(({ code, topics }, i) => {
              const colors: Record<string, { badge: string; border: string; dot: string }> = {
                A1: { badge: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400" },
                A2: { badge: "bg-blue-500/15 border-blue-500/30 text-blue-400", border: "border-blue-500/20", dot: "bg-blue-400" },
                B1: { badge: "bg-violet-500/15 border-violet-500/30 text-violet-400", border: "border-violet-500/20", dot: "bg-violet-400" },
                B2: { badge: "bg-orange-500/15 border-orange-500/30 text-orange-400", border: "border-orange-500/20", dot: "bg-orange-400" },
                C1: { badge: "bg-gold/15 border-gold/30 text-gold", border: "border-gold/20", dot: "bg-gold" },
              };
              const c = colors[code];
              return (
                <FadeUp key={code} delay={i * 0.08}>
                  <div className={`bg-navy-card border ${c.border} rounded-2xl p-5 h-full`}>
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border mb-4 ${c.badge}`}>{code}</span>
                    <ul className="space-y-2">
                      {topics.map((t) => (
                        <li key={t} className="flex items-start gap-2 text-xs text-text-secondary">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${c.dot}`} />
                          {t}
                        </li>
                      ))}
                      <li className="flex items-start gap-2 text-xs text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0 bg-navy-border" />
                        +9 konu daha...
                      </li>
                    </ul>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mock Exam Section ── */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.1}>
            <ExamPreview />
          </FadeIn>

          <FadeUp>
            <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase">Deneme Sınavılar</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-6">
              Gerçek TELC formatı,<br />
              <span className="text-gold">yapay zeka analizi</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Lesen, Schreiben ve Hören bölümleriyle birebir telc formatındaki deneme sınavıları bitirince
              Claude AI hangi konularda zayıf olduğunu, hangi kelimeleri bilmen gerektiğini ve
              nasıl iyileşeceğini detaylı anlatır.
            </p>
            <div className="space-y-3 mb-8">
              {[
                "Her yanlış cevap için neden yanlış olduğunun açıklaması",
                "Zayıf konularını listeler ve tekrar önerir",
                "Sınavda geçen önemli kelimeleri kelime kartına ekler",
                "Genel performans değerlendirmesi ve motivasyon geri bildirimi",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-text-secondary text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Button asChild variant="secondary">
              <Link href="/register" className="flex items-center gap-2">
                Deneme sınavına gir <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </FadeUp>
        </div>
      </section>

      {/* ── All Features Grid ── */}
      <section id="ozellikler" className="border-t border-navy-border bg-navy-card/20 py-28">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase">Tüm Özellikler</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">Sınavı geçmek için gereken her şey</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Ayrı ayrı uygulama aramanıza gerek yok. Kelime, gramer, sınav ve takip — hepsi burada.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, badge }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 350 }}
                  className="bg-navy-card border border-navy-border rounded-2xl p-6 h-full group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-5.5 h-5.5 text-gold" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-navy border border-navy-border text-text-muted">
                      {badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-2">{title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="border-t border-navy-border py-28">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
            <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase">Neden DeutschMeister?</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">Farkı görmek için tek tablo yeter</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Genel dil öğrenme uygulamaları TELC sınavına hazırlamaz. Biz hazırlarız.
            </p>
          </FadeUp>

          <FadeIn>
            <div className="rounded-2xl border border-navy-border overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_180px_180px] bg-navy-card border-b border-navy-border">
                <div className="px-6 py-5" />
                <div className="px-6 py-5 border-l border-navy-border text-center bg-gold/5">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 bg-gold rounded-md flex items-center justify-center shrink-0">
                      <GraduationCap className="w-3.5 h-3.5 text-navy" />
                    </div>
                    <span className="font-bold text-sm text-gold">DeutschMeister</span>
                  </div>
                </div>
                <div className="px-6 py-5 border-l border-navy-border text-center">
                  <span className="text-sm font-medium text-text-muted">Diğerleri</span>
                </div>
              </div>

              {/* Rows */}
              {COMPARISON_GROUPS.map(({ group, rows }) => (
                <div key={group}>
                  <div className="px-6 py-2.5 bg-navy/60 border-b border-navy-border">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{group}</span>
                  </div>
                  {rows.map(({ feature, sub, them }, ri) => (
                    <motion.div key={feature}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: ri * 0.06 }}
                      className="grid grid-cols-[1fr_180px_180px] border-b border-navy-border last:border-b-0 hover:bg-navy/20 transition-colors"
                    >
                      <div className="px-6 py-4">
                        <p className="text-sm font-medium text-text-primary">{feature}</p>
                        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{sub}</p>
                      </div>
                      <div className="px-6 py-4 border-l border-navy-border flex items-center justify-center bg-gold/[0.03]">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="px-6 py-4 border-l border-navy-border flex items-center justify-center">
                        {them === false && <XCircle className="w-5 h-5 text-red-400/60" />}
                        {them === null  && <span className="text-[11px] font-semibold text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">Kısmen</span>}
                        {them === true  && <CheckCircle2 className="w-5 h-5 text-text-muted" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeUp delay={0.15} className="mt-8 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-5 text-xs text-text-muted">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Var</span>
              <span className="flex items-center gap-1.5"><span className="text-amber-400/80 font-bold">~</span> Kısmen</span>
              <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-red-400/60" /> Yok</span>
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="sm" className="gap-2">
                <Link href="/register">Ücretsiz Başla <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </motion.div>
          </FadeUp>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="nasil-calisir" className="max-w-6xl mx-auto px-6 py-28">
        <FadeUp className="text-center mb-16">
          <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase">Süreç</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">4 adımda sınav başarısı</h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Kayıt olduğun günden sınav gününe kadar sistematik bir yol.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ n, icon: Icon, title, desc }, i) => (
            <FadeUp key={n} delay={i * 0.12}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 350 }}
                className="relative bg-navy-card border border-navy-border rounded-2xl p-7 h-full">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-3 w-6 h-px bg-navy-border" />
                )}
                <span className="text-4xl font-black text-navy-border select-none mb-4 block">{n}</span>
                <div className="w-12 h-12 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Readiness Calculator ── */}
      <section className="border-t border-navy-border py-28 relative overflow-hidden">
        <Orb className="w-[400px] h-[400px] bg-gold right-[-100px] top-[50%] -translate-y-1/2" />
        <div className="relative max-w-6xl mx-auto px-6">
          <FadeUp className="text-center mb-14">
            <span className="text-xs font-semibold text-gold tracking-[0.2em] uppercase">Kişisel Hesaplayıcı</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">Kaç günde hazır olursun?</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Şu anki seviyeni ve hedefini seç — yaklaşık süreyi ve hangi sınav dönemine yetişeceğini hesaplayalım.
            </p>
          </FadeUp>
          <FadeIn delay={0.15}>
            <ReadinessCalculator />
          </FadeIn>
          <FadeUp delay={0.2} className="text-center mt-8">
            <p className="text-xs text-text-muted">
              Tahminler ortalama çalışma verilerine dayanır. Tutarlılık süreyi önemli ölçüde kısaltır.
            </p>
          </FadeUp>
        </div>
      </section>


      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden border-t border-navy-border">
        <Orb className="w-[500px] h-[500px] bg-gold top-[-100px] left-[50%] -translate-x-1/2" />
        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-8">
              <Users className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold font-medium">Bugün başlayanlar yarın daha hazır</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              Sınava hazır<br />
              <span className="text-gold">hissetmeye hazır mısın?</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-xl mx-auto mb-10">
              Ücretsiz kayıt ol. Seviyeni seç. İlk kelime kartını çevir.
              Kredi kartı gerekmez.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button asChild size="lg" className="text-base px-10 shadow-xl shadow-gold/25">
                  <Link href="/register" className="flex items-center gap-2">
                    Ücretsiz Başla <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Button asChild variant="secondary" size="lg" className="text-base px-10">
                  <Link href="/login">Giriş Yap</Link>
                </Button>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-navy-border">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-navy" />
              </div>
              <div>
                <span className="font-bold leading-none block text-sm">DeutschMeister</span>
                <span className="text-xs text-text-muted">Almanca Sertifika Hazırlık</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              {["Hakkımızda", "İletişim", "Gizlilik Politikası", "Kullanım Şartları"].map((item) => (
                <Link key={item} href="#"
                  className="text-sm text-text-muted hover:text-text-secondary transition-colors">
                  {item}
                </Link>
              ))}
            </div>
            <p className="text-sm text-text-muted">© 2025 DeutschMeister</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
