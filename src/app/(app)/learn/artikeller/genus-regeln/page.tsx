"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, CheckCircle2, XCircle, RotateCcw, Lightbulb, GraduationCap, Volume2 } from "lucide-react";

function speakDE(text: string, e?: React.MouseEvent) {
  e?.stopPropagation();
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE"; u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

function Speak({ text }: { text: string }) {
  const [a, setA] = useState(false);
  return (
    <button onClick={(e) => { setA(true); speakDE(text, e); setTimeout(() => setA(false), 1200); }}
      className={`inline-flex items-center justify-center w-6 h-6 rounded-full transition-all ${a ? "bg-gold/30 text-gold" : "bg-navy-border/50 text-text-muted hover:bg-gold/20 hover:text-gold"}`}>
      <Volume2 className="w-3 h-3" />
    </button>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const suffixGroups = [
  {
    g: "maskulin", label: "DER", text: "text-blue-400", bg: "bg-blue-500/15", border: "border-blue-500/40",
    note: "~%90 doğruluk",
    suffixes: [
      { s: "-er", ex: "der Lehrer", tr: "öğretmen" },
      { s: "-el", ex: "der Schlüssel", tr: "anahtar" },
      { s: "-ling", ex: "der Frühling", tr: "ilkbahar", star: true },
      { s: "-ismus", ex: "der Tourismus", tr: "turizm", star: true },
      { s: "-ist", ex: "der Tourist", tr: "turist", star: true },
      { s: "-or", ex: "der Motor", tr: "motor" },
      { s: "-ig", ex: "der Honig", tr: "bal" },
    ],
  },
  {
    g: "feminin", label: "DIE", text: "text-pink-400", bg: "bg-pink-500/15", border: "border-pink-500/40",
    note: "%100 garanti",
    suffixes: [
      { s: "-ung", ex: "die Zeitung", tr: "gazete", star: true },
      { s: "-heit", ex: "die Freiheit", tr: "özgürlük", star: true },
      { s: "-keit", ex: "die Möglichkeit", tr: "olasılık", star: true },
      { s: "-schaft", ex: "die Freundschaft", tr: "arkadaşlık", star: true },
      { s: "-tion", ex: "die Station", tr: "istasyon", star: true },
      { s: "-tät", ex: "die Qualität", tr: "kalite", star: true },
      { s: "-ie", ex: "die Energie", tr: "enerji", star: true },
      { s: "-ik", ex: "die Musik", tr: "müzik", star: true },
      { s: "-in", ex: "die Lehrerin", tr: "öğretmen (k.)", star: true },
    ],
  },
  {
    g: "neutrum", label: "DAS", text: "text-violet-400", bg: "bg-violet-500/15", border: "border-violet-500/40",
    note: "%100 garanti",
    suffixes: [
      { s: "-chen", ex: "das Mädchen", tr: "kız çocuğu", star: true },
      { s: "-lein", ex: "das Büchlein", tr: "kitapçık", star: true },
      { s: "-ment", ex: "das Dokument", tr: "belge" },
      { s: "-um", ex: "das Museum", tr: "müze" },
      { s: "-tum", ex: "das Wachstum", tr: "büyüme", star: true },
      { s: "-tel", ex: "das Viertel", tr: "çeyrek", star: true },
      { s: "Ge-", ex: "das Gebäude", tr: "bina" },
    ],
  },
];

const categoryGroups = [
  {
    g: "maskulin", text: "text-blue-400", dot: "bg-blue-400",
    cats: [
      { icon: "📅", name: "Günler", ex: "der Montag, Dienstag…" },
      { icon: "🗓️", name: "Aylar", ex: "der Januar, Februar…" },
      { icon: "🌸", name: "Mevsimler", ex: "der Frühling, Sommer, Herbst, Winter" },
      { icon: "🌧️", name: "Hava olayları", ex: "der Regen, Schnee, Wind" },
      { icon: "🍷", name: "Alkol (Bier hariç)", ex: "der Wein, Whisky, Rum" },
    ],
  },
  {
    g: "feminin", text: "text-pink-400", dot: "bg-pink-400",
    cats: [
      { icon: "🔢", name: "Rakamlar (isim)", ex: "die Eins, Zwei, Drei" },
      { icon: "🌳", name: "Ağaçlar", ex: "die Eiche, Birke, Kiefer" },
      { icon: "🌹", name: "Çiçekler", ex: "die Rose, Tulpe, Orchidee" },
      { icon: "🌊", name: "Alman nehirleri", ex: "die Elbe, Donau (der Rhein!)" },
      { icon: "🚢", name: "Gemiler", ex: "die Titanic, Hamburg" },
    ],
  },
  {
    g: "neutrum", text: "text-violet-400", dot: "bg-violet-400",
    cats: [
      { icon: "⚗️", name: "Metaller", ex: "das Gold, Silber, Eisen" },
      { icon: "🎨", name: "Renkler (isim)", ex: "das Rot, Blau, Grün" },
      { icon: "🗣️", name: "Diller", ex: "das Deutsch, Englisch" },
      { icon: "🏃", name: "Mastar isimler", ex: "das Laufen, Essen, Schlafen" },
      { icon: "📏", name: "Ölçü birimleri", ex: "das Meter, Kilogramm" },
    ],
  },
];

const questions = [
  { q: "die Zeitung", answer: "DIE", options: ["DER", "DIE", "DAS"], tip: "-ung → her zaman die" },
  { q: "das Mädchen", answer: "DAS", options: ["DER", "DIE", "DAS"], tip: "-chen → her zaman das" },
  { q: "der Frühling", answer: "DER", options: ["DER", "DIE", "DAS"], tip: "-ling → der" },
  { q: "die Möglichkeit", answer: "DIE", options: ["DER", "DIE", "DAS"], tip: "-keit → her zaman die" },
  { q: "das Museum", answer: "DAS", options: ["DER", "DIE", "DAS"], tip: "-um → genellikle das" },
  { q: "die Gesellschaft", answer: "DIE", options: ["DER", "DIE", "DAS"], tip: "-schaft → her zaman die" },
  { q: "der Motor", answer: "DER", options: ["DER", "DIE", "DAS"], tip: "-or → genellikle der" },
  { q: "das Wachstum", answer: "DAS", options: ["DER", "DIE", "DAS"], tip: "-tum → der/das → Wachstum = das" },
  { q: "die Energie", answer: "DIE", options: ["DER", "DIE", "DAS"], tip: "-ie → her zaman die" },
  { q: "der Januar", answer: "DER", options: ["DER", "DIE", "DAS"], tip: "Aylar → her zaman der" },
];

function MiniPractice() {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[idx];

  function pick(opt: string) {
    if (sel) return;
    setSel(opt);
    if (opt === q.answer) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true);
      else { setIdx(i => i + 1); setSel(null); }
    }, 1100);
  }

  function restart() { setIdx(0); setSel(null); setScore(0); setDone(false); }

  if (done) return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8 space-y-4">
      <div className="text-4xl">{score >= 8 ? "🏆" : score >= 6 ? "👍" : "💪"}</div>
      <div className="text-2xl font-black text-text-primary">{score} / {questions.length}</div>
      <div className="w-full bg-navy rounded-full h-2 max-w-xs mx-auto">
        <motion.div className="bg-gold h-2 rounded-full" initial={{ width: 0 }}
          animate={{ width: `${(score / questions.length) * 100}%` }} transition={{ duration: 0.8 }} />
      </div>
      <button onClick={restart} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/15 text-gold font-bold text-sm border border-gold/30 hover:bg-gold/25 transition-colors">
        <RotateCcw className="w-4 h-4" /> Tekrar Dene
      </button>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs text-text-muted">
        <span>{idx + 1} / {questions.length}</span>
        <span className="text-gold font-bold">{score} puan</span>
      </div>
      <div className="w-full bg-navy rounded-full h-1.5">
        <motion.div className="bg-gold h-1.5 rounded-full" animate={{ width: `${(idx / questions.length) * 100}%` }} transition={{ duration: 0.3 }} />
      </div>
      <div className="bg-navy/60 rounded-xl p-4 flex items-center gap-3">
        <Speak text={q.q} />
        <p className="text-text-primary font-bold text-lg">{q.q}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {q.options.map(opt => {
          const picked = sel === opt, correct = opt === q.answer;
          return (
            <motion.button key={opt} whileTap={{ scale: 0.96 }} onClick={() => pick(opt)}
              className={`py-3 rounded-xl text-sm font-black border transition-all ${sel
                ? correct ? "bg-green-500/20 border-green-500/50 text-green-400" : picked ? "bg-red-500/20 border-red-500/50 text-red-400" : "opacity-40 bg-navy border-navy-border text-text-muted"
                : "bg-navy border-navy-border text-text-primary hover:border-gold/50"}`}>
              {sel && correct && <CheckCircle2 className="inline w-3.5 h-3.5 mr-1" />}
              {sel && picked && !correct && <XCircle className="inline w-3.5 h-3.5 mr-1" />}
              {opt}
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {sel && <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className={`p-3 rounded-xl text-xs border ${sel === q.answer ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-amber-500/10 border-amber-500/30 text-amber-400"}`}>
          💡 {q.tip}
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function GenusRegelnPage() {
  const [showCats, setShowCats] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-blue-500/20 p-7"
        style={{ background: "linear-gradient(135deg, #1A2940 0%, #152236 60%, #0D1B2A 100%)" }}>
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 20% 50%, #3b82f620 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, #ec489920 0%, transparent 60%)" }} />
        <div className="relative">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-skill-grammatik/15 text-skill-grammatik text-xs font-bold border border-skill-grammatik/30">
              <GraduationCap className="w-3 h-3" /> A1 – A2
            </span>
            <span className="px-2.5 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold border border-gold/30">Temel Konu</span>
          </div>
          <h1 className="text-2xl font-black text-text-primary mb-2">Genus-Regeln</h1>
          <p className="text-text-secondary text-sm max-w-xl">
            Almancada her ismin cinsiyeti (Genus) var. Sonek kurallarını ve kategori ipuçlarını öğrenerek artikeli tahmin etmeyi öğren.
          </p>
        </div>
      </motion.div>

      {/* Suffix cards */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }}>
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-gold" />
          <h2 className="font-bold text-text-primary text-sm">Sonek → Artikel</h2>
          <span className="text-text-muted text-xs">Sınavda en çok çıkan kurallar</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {suffixGroups.map((g, gi) => (
            <motion.div key={g.g} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + gi * 0.08, duration: 0.4 }}
              className={`rounded-xl border ${g.border} overflow-hidden`}>
              <div className={`${g.bg} px-4 py-3 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-black ${g.text}`}>{g.label}</span>
                  <span className="text-text-secondary text-sm font-semibold capitalize">{g.g}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy/40 ${g.text}`}>{g.note}</span>
              </div>
              <div className="p-3 space-y-1.5 bg-navy-card">
                {g.suffixes.map(s => (
                  <div key={s.s} className="flex items-center gap-2 p-2 rounded-lg bg-navy/50 hover:bg-navy/70 transition-colors">
                    <code className={`text-sm font-black ${g.text} min-w-[3.5rem]`}>{s.s}</code>
                    <div className="flex-1 min-w-0">
                      <div className="text-text-secondary text-[11px]">{s.ex}</div>
                      <div className="text-text-muted text-[10px]">{s.tr}</div>
                    </div>
                    {s.star && <span className="text-gold text-[10px] font-black">★</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-text-muted text-[10px]">
          <span className="text-gold font-black">★</span>
          <span>= İstisna yok, %100 güvenilir kural</span>
        </div>
      </motion.div>

      {/* Category rules */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div role="button" tabIndex={0} onClick={() => setShowCats(!showCats)}
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setShowCats(!showCats); }}
          className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-navy/20 transition-colors">
          <div>
            <div className="text-text-primary font-bold text-sm">Kategori Kuralları</div>
            <div className="text-text-muted text-xs mt-0.5">Kelime grubundan cinsiyet tahmini</div>
          </div>
          <motion.div animate={{ rotate: showCats ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-text-muted" />
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          {showCats && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="px-4 pb-4 border-t border-navy-border pt-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
                {categoryGroups.map(cg => (
                  <div key={cg.g}>
                    <div className={`text-xs font-bold ${cg.text} flex items-center gap-1.5 mb-2`}>
                      <span className={`w-2 h-2 rounded-full ${cg.dot}`} />
                      {cg.g.toUpperCase()}
                    </div>
                    <div className="space-y-1.5">
                      {cg.cats.map(cat => (
                        <div key={cat.name} className="flex items-start gap-2 p-2.5 rounded-lg bg-navy/60">
                          <span className="text-sm leading-none mt-0.5">{cat.icon}</span>
                          <div>
                            <div className="text-text-primary text-xs font-semibold">{cat.name}</div>
                            <div className="text-text-muted text-[10px] mt-0.5">{cat.ex}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Exam tip */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.45 }}
        className="flex gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
        <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-amber-400 font-bold text-sm">Sınav Taktiği</div>
          <div className="text-text-secondary text-xs mt-1 leading-relaxed">
            <strong className="text-amber-400">%54</strong> feminin · <strong className="text-amber-400">%30</strong> maskulin · <strong className="text-amber-400">%16</strong> neutrum — bilmiyorsan <strong>die</strong> de, istatistiksel avantajın var!
            <br />Ama -chen/-lein görürsen kesinlikle <strong>das</strong>, -ung/-heit/-keit/-schaft görürsen kesinlikle <strong>die</strong>.
          </div>
        </div>
      </motion.div>

      {/* Practice */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <button onClick={() => setPracticeOpen(!practiceOpen)}
          className="w-full flex items-center justify-between p-4 hover:bg-navy/20 transition-colors">
          <div className="font-bold text-text-primary text-sm">10 Pratik Soru</div>
          <motion.div animate={{ rotate: practiceOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-5 h-5 text-text-muted" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {practiceOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="p-4 border-t border-navy-border">
                <MiniPractice />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
