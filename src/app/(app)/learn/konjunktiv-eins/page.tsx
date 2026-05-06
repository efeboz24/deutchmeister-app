"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  BookOpen, Lightbulb, ChevronDown, MessageSquare, Zap,
  Layers, Star, CheckCircle2, FileText,
} from "lucide-react";
import { PracticeSection, SpeakBtn } from "./PracticeSection";
import { GrammarTracker } from "@/components/learn/GrammarTracker";

function fu(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  };
}

/* ── data ──────────────────────────────────────────────────── */
interface ConjForm { person: string; praesens: string; konjI: string; highlight?: boolean; }

const seinForms: ConjForm[] = [
  { person: "ich",      praesens: "bin",   konjI: "sei",    highlight: true },
  { person: "du",       praesens: "bist",  konjI: "seiest", highlight: true },
  { person: "er/sie/es",praesens: "ist",   konjI: "sei",    highlight: true },
  { person: "wir",      praesens: "sind",  konjI: "seien",  highlight: true },
  { person: "ihr",      praesens: "seid",  konjI: "seiet",  highlight: true },
  { person: "sie/Sie",  praesens: "sind",  konjI: "seien",  highlight: true },
];

const habenForms: ConjForm[] = [
  { person: "ich",      praesens: "habe",  konjI: "habe" },
  { person: "du",       praesens: "hast",  konjI: "habest",  highlight: true },
  { person: "er/sie/es",praesens: "hat",   konjI: "habe",    highlight: true },
  { person: "wir",      praesens: "haben", konjI: "haben" },
  { person: "ihr",      praesens: "habt",  konjI: "habet",   highlight: true },
  { person: "sie/Sie",  praesens: "haben", konjI: "haben" },
];

const werdenForms: ConjForm[] = [
  { person: "ich",      praesens: "werde",  konjI: "werde" },
  { person: "du",       praesens: "wirst",  konjI: "werdest",  highlight: true },
  { person: "er/sie/es",praesens: "wird",   konjI: "werde",    highlight: true },
  { person: "wir",      praesens: "werden", konjI: "werden" },
  { person: "ihr",      praesens: "werdet", konjI: "werdet" },
  { person: "sie/Sie",  praesens: "werden", konjI: "werden" },
];

const exampleSentences = [
  { direct: 'Er sagte: "Ich bin müde."',         indirect: "Er sagte, er sei müde.",                tr: "Yorgun olduğunu söyledi.",        type: "sein" },
  { direct: 'Sie sagte: "Ich habe das Buch."',   indirect: "Sie sagte, sie habe das Buch.",         tr: "Kitabı olduğunu söyledi.",        type: "haben" },
  { direct: 'Er sagte: "Ich komme morgen."',     indirect: "Er sagte, er komme morgen.",            tr: "Yarın geleceğini söyledi.",       type: "verb" },
  { direct: 'Sie sagte: "Wir sind fertig."',     indirect: "Sie sagte, sie seien fertig.",          tr: "Hazır olduklarını söyledi.",      type: "sein" },
  { direct: 'Die Zeitung: "Der Preis steigt."',  indirect: "Die Zeitung berichtet, der Preis steige.",tr: "Gazetede fiyatın yükseldiği haberi var.", type: "verb" },
  { direct: 'Er sagte: "Ich werde helfen."',     indirect: "Er sagte, er werde helfen.",            tr: "Yardım edeceğini söyledi.",       type: "werden" },
];

/* ── breakdown data ─────────────────────────────────────────── */
interface SentencePart { word: string; role: string; detail: string; color: string; }
interface BdSentence { full: string; translation: string; type: string; parts: SentencePart[]; }

const breakdownSentences: BdSentence[] = [
  {
    full: "Er sagte, er sei müde.",
    translation: "Yorgun olduğunu söyledi.",
    type: "sein",
    parts: [
      { word: "Er",    role: "Özne (Subjekt)",     detail: "3. tekil erkek",               color: "text-purple-400" },
      { word: "sagte", role: "Ana Fiil (Verb Dicendi)", detail: "sagen → Präteritum — 'aktarım fiili'", color: "text-gold" },
      { word: "er",    role: "İndirekt Rede Öznesi", detail: "aktarılan kişi",             color: "text-sky-400" },
      { word: "sei",   role: "Konjunktiv I",        detail: "sein → sei (indirekte Rede)", color: "text-blue-400" },
      { word: "müde",  role: "Yüklem Sıfatı",      detail: "Prädikativum",                color: "text-text-secondary" },
    ],
  },
  {
    full: "Die Zeitung berichtet, der Preis steige.",
    translation: "Gazetede fiyatın arttığı bildiriliyor.",
    type: "verb",
    parts: [
      { word: "Die Zeitung", role: "Özne",             detail: "dişi isim, Nominativ",          color: "text-purple-400" },
      { word: "berichtet",   role: "Ana Fiil",          detail: "berichten → Präsens, 3. tekil", color: "text-gold" },
      { word: "der Preis",   role: "İndirekt Rede Öznesi", detail: "erkek isim, Nominativ",     color: "text-sky-400" },
      { word: "steige",      role: "Konjunktiv I",      detail: "steigen → steige (indirekte Rede)", color: "text-blue-400" },
    ],
  },
  {
    full: "Sie berichtete, sie habe das Buch gelesen.",
    translation: "Kitabı okuduğunu bildirdi.",
    type: "haben",
    parts: [
      { word: "Sie",       role: "Özne (Subjekt)",       detail: "3. tekil dişi zamiri",       color: "text-purple-400" },
      { word: "berichtete",role: "Ana Fiil",              detail: "berichten → Präteritum",     color: "text-gold" },
      { word: "sie",       role: "İndirekt Rede Öznesi", detail: "aktarılan kişi",             color: "text-sky-400" },
      { word: "habe",      role: "Konjunktiv I (Yardımcı)", detail: "haben → habe (Konj. I Perfekt)", color: "text-blue-400" },
      { word: "das Buch",  role: "Nesne (Akkusativ)",    detail: "nötr isim",                  color: "text-text-secondary" },
      { word: "gelesen",   role: "Partizip II",          detail: "lesen → gelesen",            color: "text-emerald-400" },
    ],
  },
  {
    full: "Er erklärte, er werde morgen kommen.",
    translation: "Yarın geleceğini açıkladı.",
    type: "werden",
    parts: [
      { word: "Er",         role: "Özne (Subjekt)",       detail: "3. tekil erkek zamiri",      color: "text-purple-400" },
      { word: "erklärte",   role: "Ana Fiil",              detail: "erklären → Präteritum",      color: "text-gold" },
      { word: "er",         role: "İndirekt Rede Öznesi", detail: "aktarılan kişi",             color: "text-sky-400" },
      { word: "werde",      role: "Konjunktiv I (Futur)",  detail: "werden → werde (gelecek zaman Konj. I)", color: "text-blue-400" },
      { word: "morgen",     role: "Zarf (Adverb)",        detail: "zaman zarfı: yarın",         color: "text-amber-400" },
      { word: "kommen",     role: "Mastar (Infinitiv)",   detail: "werden + Infinitiv = Futur", color: "text-emerald-400" },
    ],
  },
];

/* ── sub-components ─────────────────────────────────────────── */
function SectionTitle({ icon: Icon, title, subtitle, color = "text-gold" }: {
  icon: React.ElementType; title: string; subtitle?: string; color?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-10 h-10 bg-gold/15 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        {subtitle && <p className="text-text-secondary text-sm mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function ConjTable({ title, forms, color, bg, border }: {
  title: string; forms: ConjForm[]; color: string; bg: string; border: string;
}) {
  return (
    <div className={`border ${border} rounded-xl overflow-hidden`}>
      <div className={`${bg} px-4 py-2.5 flex items-center gap-2`}>
        <span className={`font-bold text-sm ${color}`}>{title}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy/50">
              <th className="px-4 py-2 text-text-muted text-xs font-semibold text-left">Person</th>
              <th className="px-4 py-2 text-text-muted text-xs font-semibold text-center">Präsens</th>
              <th className={`px-4 py-2 text-xs font-semibold text-center ${color}`}>Konjunktiv I</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((f, i) => (
              <motion.tr key={f.person} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="border-t border-navy-border hover:bg-navy/30 transition-colors">
                <td className="px-4 py-2.5 text-text-secondary font-medium text-sm">{f.person}</td>
                <td className="px-4 py-2.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-text-muted text-sm">{f.praesens}</span>
                    <SpeakBtn text={f.praesens} />
                  </div>
                </td>
                <td className="px-4 py-2.5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className={`font-bold text-sm ${f.highlight ? color : "text-text-primary"}`}>
                      {f.konjI}
                      {f.highlight && <span className="ml-1 text-[9px] opacity-70">●</span>}
                    </span>
                    <SpeakBtn text={f.konjI} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuizCard() {
  const questions = [
    { q: "Er sagte, er ___ müde. (sein → Konj. I)", audio: "Er sagte, er sei müde.", answer: "sei", options: ["ist", "sei", "war", "wäre"] },
    { q: "Sie berichtete, sie ___ das Buch gelesen. (haben → Konj. I)", audio: "Sie berichtete, sie habe das Buch gelesen.", answer: "habe", options: ["hat", "habe", "hätte", "hatte"] },
    { q: "Die Zeitung schrieb, der Preis ___. (steigen → Konj. I, er)", audio: "Die Zeitung schrieb, der Preis steige.", answer: "steige", options: ["steigt", "steige", "stieg", "stiege"] },
    { q: "Er erklärte, er ___ morgen kommen. (werden → Konj. I)", audio: "Er erklärte, er werde morgen kommen.", answer: "werde", options: ["wird", "werde", "würde", "wurde"] },
  ];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[current];
  function choose(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 >= questions.length) setDone(true);
      else { setCurrent((c) => c + 1); setSelected(null); }
    }, 900);
  }
  function restart() { setCurrent(0); setSelected(null); setScore(0); setDone(false); }
  return (
    <div className="bg-navy-card border border-navy-border rounded-2xl p-6">
      <SectionTitle icon={Zap} title="Hızlı Test" subtitle="Konjunktiv I formunu seç!" color="text-amber-400" />
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-5xl mb-4">{score >= 3 ? "🎉" : "💪"}</div>
            <p className="text-2xl font-bold text-text-primary mb-2">{score}/{questions.length} doğru</p>
            <button onClick={restart} className="mt-4 px-6 py-2.5 bg-gold/20 text-gold border border-gold/30 rounded-xl font-semibold hover:bg-gold/30 transition-colors">
              Tekrar Dene
            </button>
          </motion.div>
        ) : (
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-text-muted">{current + 1}/{questions.length}</span>
              <span className="text-xs text-gold font-semibold">{score} puan</span>
            </div>
            <div className="w-full bg-navy-border rounded-full h-1.5 mb-5">
              <div className="bg-gold h-1.5 rounded-full transition-all" style={{ width: `${(current / questions.length) * 100}%` }} />
            </div>
            <div className="flex items-center gap-2 mb-5">
              <p className="text-text-primary font-semibold text-sm leading-relaxed flex-1">{q.q}</p>
              <SpeakBtn text={q.audio} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt) => {
                const isCorrect = opt === q.answer, isSel = opt === selected;
                let style = "bg-navy border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary";
                if (selected) {
                  if (isCorrect) style = "bg-green-500/20 border-green-500/50 text-green-400";
                  else if (isSel) style = "bg-red-500/20 border-red-500/50 text-red-400";
                  else style = "bg-navy border-navy-border text-text-muted opacity-50";
                }
                return (
                  <motion.button key={opt} onClick={() => choose(opt)}
                    whileHover={!selected ? { scale: 1.03 } : {}}
                    className={`py-3 px-4 border rounded-xl font-bold text-base transition-all duration-200 ${style}`}>
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── main page ──────────────────────────────────────────────── */
export default function KonjunktivEinsPage() {
  const [exFilter, setExFilter] = useState<"all" | "sein" | "haben" | "verb" | "werden">("all");
  const [bdFilter, setBdFilter] = useState<"all" | "sein" | "haben" | "verb" | "werden">("all");
  const [expandedBd, setExpandedBd] = useState<number | null>(null);
  const [tableOpen, setTableOpen] = useState<"sein" | "haben" | "werden" | null>("sein");

  const filteredEx = exFilter === "all" ? exampleSentences : exampleSentences.filter((s) => s.type === exFilter);
  const filteredBd = bdFilter === "all" ? breakdownSentences : breakdownSentences.filter((s) => s.type === bdFilter);

  const typeColor: Record<string, string> = {
    sein: "text-blue-400", haben: "text-emerald-400", verb: "text-purple-400", werden: "text-amber-400",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <motion.div {...fu(0)}
        className="relative overflow-hidden bg-gradient-to-br from-navy-light via-navy-card to-navy rounded-3xl border border-navy-border p-8 md:p-10">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-gold/20 text-gold border border-gold/30 rounded-full text-xs font-bold tracking-wide uppercase">B1 – B2</span>
            <span className="px-3 py-1 bg-skill-grammatik/20 text-skill-grammatik border border-skill-grammatik/30 rounded-full text-xs font-bold tracking-wide uppercase">Grammatik</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary leading-tight mb-3">
            Konjunktiv <span className="text-gold">I</span>
          </h1>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed">
            Almanca'da başkasının söylediklerini aktarmanın resmi yolu — gazete haberleri,
            raporlar ve akademik dilde olmazsa olmaz! 📰
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { label: "İndirekte Rede", icon: MessageSquare },
              { label: "sein/haben/werden tabloları", icon: BookOpen },
              { label: "50 pratik soru", icon: Zap },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-1.5 bg-navy/60 border border-navy-border rounded-lg text-sm text-text-secondary">
                <Icon className="w-3.5 h-3.5 text-gold" />{label}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── NE İÇİN KULLANILIR ───────────────────────────────── */}
      <motion.div {...fu(0.05)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "📰", title: "Dolaylı Aktarım", color: "border-blue-500/30 bg-blue-500/5", titleColor: "text-blue-400",
              desc: "Başkasının söylediklerini aktarmak için kullanılır. Gazete ve haberciliğin temel aracı." },
            { icon: "🎓", title: "Akademik Dil", color: "border-emerald-500/30 bg-emerald-500/5", titleColor: "text-emerald-400",
              desc: "Bilimsel makaleler ve raporlarda 'tarafsız aktarım' için kullanılır." },
            { icon: "⚖️", title: "Resmi Belgeler", color: "border-purple-500/30 bg-purple-500/5", titleColor: "text-purple-400",
              desc: "Mahkeme tutanakları ve resmi yazışmalarda aktarılan bilgileri belirtmek için kullanılır." },
          ].map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.07 }}
              className={`rounded-2xl p-5 border ${c.color}`}>
              <span className="text-3xl mb-3 block">{c.icon}</span>
              <h3 className={`font-bold text-base mb-2 ${c.titleColor}`}>{c.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── KONJUNKTIV I OLUŞTURMA ───────────────────────────── */}
      <motion.div {...fu(0.1)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={BookOpen} title="Konjunktiv I Nasıl Yapılır?"
          subtitle="Fiil kökü + Konjunktiv I ekleri" />

        <div className="bg-navy/50 border border-gold/20 rounded-xl p-4 mb-6">
          <p className="text-gold font-bold text-sm mb-2">📌 Genel Kural:</p>
          <div className="flex flex-wrap gap-3">
            {[["ich", "-e"], ["du", "-(e)st"], ["er/sie/es", "-e"], ["wir", "-en"], ["ihr", "-(e)t"], ["sie/Sie", "-en"]].map(([p, e]) => (
              <div key={p} className="flex items-center gap-1.5 bg-navy border border-navy-border rounded-lg px-3 py-2 text-xs">
                <span className="text-text-muted">{p}:</span>
                <span className="text-gold font-bold">{e}</span>
              </div>
            ))}
          </div>
          <p className="text-text-muted text-xs mt-3">Kök = Infinitiv'den -en çıkar → mach(en) → mach- → mache</p>
        </div>

        <div className="space-y-3">
          {(["sein", "haben", "werden"] as const).map((verb) => {
            const isOpen = tableOpen === verb;
            const forms = verb === "sein" ? seinForms : verb === "haben" ? habenForms : werdenForms;
            const colorMap = { sein: { color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/25" },
              haben: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25" },
              werden: { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25" } };
            const c = colorMap[verb];
            return (
              <div key={verb} className={`border ${c.border} rounded-xl overflow-hidden`}>
                <button onClick={() => setTableOpen(isOpen ? null : verb)}
                  className={`w-full flex items-center justify-between px-5 py-3 ${c.bg} hover:opacity-90 transition-opacity`}>
                  <span className={`font-bold text-sm ${c.color}`}>{verb} → Konjunktiv I</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className={`w-4 h-4 ${c.color}`} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="bg-navy-card">
                        <ConjTable title={verb} forms={forms} color={c.color} bg={c.bg} border={c.border} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl">
          <p className="text-sky-400 font-semibold text-sm mb-1">💡 Noktalı Formlar Neden Önemli?</p>
          <p className="text-text-secondary text-xs leading-relaxed">
            Konjunktiv I formları Präsens'le aynı olduğunda (ör. wir haben → wir haben), anlaşılmaz.
            Bu durumda <strong className="text-text-primary">Konjunktiv II</strong> kullanılır: wir hätten.
          </p>
        </div>
      </motion.div>

      {/* ── ÖRNEK CÜMLELER ───────────────────────────────────── */}
      <motion.div {...fu(0.15)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={MessageSquare} title="Direkt → İndirekt Rede Dönüşümü"
          subtitle="Gerçek cümlelerle aktarım yapısını öğren!" />
        <div className="flex gap-2 mb-5 flex-wrap">
          {(["all", "sein", "haben", "verb", "werden"] as const).map((f) => (
            <button key={f} onClick={() => setExFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                exFilter === f ? "bg-gold/20 text-gold border-gold/40" : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"}`}>
              {f === "all" ? "Tümü" : f === "sein" ? "sein" : f === "haben" ? "haben" : f === "werden" ? "werden" : "Diğer Fiiller"}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredEx.map((s, i) => (
              <motion.div key={s.direct} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}
                className="border border-navy-border rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-navy/30 flex items-center gap-2">
                  <span className="text-xs text-text-muted font-semibold uppercase tracking-wide">Direkt:</span>
                  <p className="text-text-secondary text-sm flex-1">{s.direct}</p>
                  <SpeakBtn text={s.direct.replace(/"/g, "")} />
                </div>
                <div className="px-4 py-3 flex items-center gap-2">
                  <span className="text-xs text-gold font-semibold uppercase tracking-wide">İndirekt:</span>
                  <p className={`text-sm font-semibold flex-1 ${typeColor[s.type] ?? "text-text-primary"}`}>{s.indirect}</p>
                  <SpeakBtn text={s.indirect} />
                </div>
                <div className="px-4 pb-3">
                  <p className="text-text-muted text-xs">{s.tr}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── CÜMLEYİ PARÇALARA AYIR ───────────────────────────── */}
      <motion.div {...fu(0.2)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={Layers} title="Cümleyi Parçalara Ayır"
          subtitle="İndirekte Rede cümlelerini kelime kelime analiz et!" />
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "sein", "haben", "verb", "werden"] as const).map((f) => (
            <button key={f} onClick={() => { setBdFilter(f); setExpandedBd(null); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                bdFilter === f ? "bg-gold/20 text-gold border-gold/40" : "bg-navy border-navy-border text-text-muted hover:text-text-secondary"}`}>
              {f === "all" ? "Tümü" : f === "sein" ? "sein" : f === "haben" ? "haben" : f === "werden" ? "werden" : "Diğer"}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filteredBd.map((s, idx) => {
            const isOpen = expandedBd === idx;
            return (
              <div key={s.full} className="border border-sky-500/25 rounded-xl overflow-hidden">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedBd(isOpen ? null : idx)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setExpandedBd(isOpen ? null : idx); }}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left bg-sky-500/5 hover:opacity-90 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 shrink-0">
                      KONJ I
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-text-primary text-sm">{s.full}</p>
                      <p className="text-text-muted text-xs">{s.translation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <SpeakBtn text={s.full} />
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                      <ChevronDown className="w-4 h-4 text-text-muted" />
                    </motion.span>
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-5 pb-5 pt-3 bg-navy-card">
                        <p className="text-xs text-text-muted mb-3 font-medium uppercase tracking-wider">Kelime Analizi</p>
                        <div className="flex flex-wrap gap-3">
                          {s.parts.map((p, pi) => (
                            <motion.div key={pi} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: pi * 0.06 }}
                              className="flex flex-col items-center gap-1.5 bg-navy border border-navy-border rounded-xl px-4 py-3 min-w-[90px]">
                              <span className={`font-bold text-base ${p.color}`}>{p.word}</span>
                              <span className="text-[10px] font-semibold text-text-secondary text-center leading-tight">{p.role}</span>
                              <span className="text-[9px] text-text-muted text-center leading-tight">{p.detail}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── KULLANIM KURALLARI ────────────────────────────────── */}
      <motion.div {...fu(0.25)} className="bg-navy-card border border-navy-border rounded-2xl p-6">
        <SectionTitle icon={Star} title="Önemli Kurallar" subtitle="Konjunktiv I kullanırken dikkat etmen gerekenler" />
        <div className="space-y-3">
          {[
            { num: "1", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20",
              title: "Konjunktiv I = Präsens ise → Konjunktiv II kullan",
              desc: "wir laufen (Konj. I) = wir laufen (Präsens) → Karışıklık olur → wir liefen (Konj. II) kullan" },
            { num: "2", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20",
              title: "sein her zaman Konjunktiv I ile",
              desc: "sein'in Konjunktiv I formu (sei, seien) Präsens'ten tamamen farklı → her zaman Konj. I kullan" },
            { num: "3", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20",
              title: "Zaman geçmişe aktarılır",
              desc: "Präsens → Konjunktiv I Präsens: Er sagt, er sei müde. / Perfekt → Konj. I Perfekt: Er sagt, er habe es getan." },
            { num: "4", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20",
              title: "Konuşmada Konjunktiv II tercih edilir",
              desc: "Günlük dilde Konjunktiv I nadir — yazı dili ve resmi konuşmalarda kullanılır" },
          ].map((r) => (
            <div key={r.num} className={`flex items-start gap-3 border rounded-xl px-4 py-3 ${r.bg}`}>
              <span className={`font-bold text-xl leading-none ${r.color}`}>{r.num}</span>
              <div>
                <p className={`font-semibold text-sm ${r.color}`}>{r.title}</p>
                <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── TRICK KARTI ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border border-gold/30 rounded-2xl p-6">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center shrink-0">
            <Lightbulb className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 className="text-gold font-bold text-lg mb-3">Altın Hatırlatma</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">
                <FileText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-text-secondary text-sm">
                  Almanca bir gazetede gördüğün <strong className="text-blue-400">habe, sei, werde, komme</strong> gibi formlar
                  çoğunlukla <strong className="text-text-primary">Konjunktiv I</strong> — birinin sözlerini aktarıyorlar!
                </p>
              </div>
              <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-text-secondary text-sm">
                  Sınava hazırlanırken önce <strong className="text-emerald-400">sein</strong>'ın Konjunktiv I formlarını ezberle:
                  <span className="text-text-primary font-semibold"> sei, seiest, sei, seien, seiet, seien</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── HIZLI TEST ───────────────────────────────────────── */}
      <motion.div {...fu(0.35)}>
        <QuizCard />
      </motion.div>

      {/* ── PRATİK BÖLÜMÜ ────────────────────────────────────── */}
      <motion.div {...fu(0.4)}>
        <GrammarTracker topicId="konjunktiv-i" level="B2" />
        <PracticeSection />
      </motion.div>

    </div>
  );
}
