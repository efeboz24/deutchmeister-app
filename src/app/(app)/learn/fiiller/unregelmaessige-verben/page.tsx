"use client";

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { saveProgress } from '@/lib/saveProgress';
import { GrammarTracker } from "@/components/learn/GrammarTracker";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, XCircle, RotateCcw, GraduationCap, Volume2, Search } from "lucide-react";

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
    <button onClick={e => { setA(true); speakDE(text, e); setTimeout(() => setA(false), 1200); }}
      className={`inline-flex items-center justify-center w-6 h-6 rounded-full transition-all ${a ? "bg-gold/30 text-gold" : "bg-navy-border/50 text-text-muted hover:bg-gold/20 hover:text-gold"}`}>
      <Volume2 className="w-3 h-3" />
    </button>
  );
}

type Verb = { inf: string; tr: string; präs: string; prät: string; perf: string; haben: boolean; group: string };

const verbs: Verb[] = [
  // Gruppe: sein/haben/werden
  { inf: "sein",    tr: "olmak",          präs: "ist",     prät: "war",     perf: "ist gewesen",    haben: false, group: "temel" },
  { inf: "haben",   tr: "sahip olmak",    präs: "hat",     prät: "hatte",   perf: "hat gehabt",     haben: true,  group: "temel" },
  { inf: "werden",  tr: "olmak (gelecek)",präs: "wird",    prät: "wurde",   perf: "ist geworden",   haben: false, group: "temel" },
  // Gruppe: Bewegung
  { inf: "gehen",   tr: "gitmek",         präs: "geht",    prät: "ging",    perf: "ist gegangen",   haben: false, group: "hareket" },
  { inf: "kommen",  tr: "gelmek",         präs: "kommt",   prät: "kam",     perf: "ist gekommen",   haben: false, group: "hareket" },
  { inf: "fahren",  tr: "gitmek (araç)",  präs: "fährt",   prät: "fuhr",    perf: "ist gefahren",   haben: false, group: "hareket" },
  { inf: "fliegen", tr: "uçmak",          präs: "fliegt",  prät: "flog",    perf: "ist geflogen",   haben: false, group: "hareket" },
  { inf: "laufen",  tr: "koşmak",         präs: "läuft",   prät: "lief",    perf: "ist gelaufen",   haben: false, group: "hareket" },
  // Gruppe: Alltag
  { inf: "essen",   tr: "yemek",          präs: "isst",    prät: "aß",      perf: "hat gegessen",   haben: true,  group: "günlük" },
  { inf: "trinken", tr: "içmek",          präs: "trinkt",  prät: "trank",   perf: "hat getrunken",  haben: true,  group: "günlük" },
  { inf: "schlafen",tr: "uyumak",         präs: "schläft", prät: "schlief", perf: "hat geschlafen", haben: true,  group: "günlük" },
  { inf: "sehen",   tr: "görmek",         präs: "sieht",   prät: "sah",     perf: "hat gesehen",    haben: true,  group: "günlük" },
  { inf: "lesen",   tr: "okumak",         präs: "liest",   prät: "las",     perf: "hat gelesen",    haben: true,  group: "günlük" },
  { inf: "sprechen",tr: "konuşmak",       präs: "spricht", prät: "sprach",  perf: "hat gesprochen", haben: true,  group: "günlük" },
  { inf: "schreiben",tr: "yazmak",        präs: "schreibt",prät: "schrieb", perf: "hat geschrieben",haben: true,  group: "günlük" },
  { inf: "nehmen",  tr: "almak",          präs: "nimmt",   prät: "nahm",    perf: "hat genommen",   haben: true,  group: "günlük" },
  { inf: "geben",   tr: "vermek",         präs: "gibt",    prät: "gab",     perf: "hat gegeben",    haben: true,  group: "günlük" },
  { inf: "wissen",  tr: "bilmek",         präs: "weiß",    prät: "wusste",  perf: "hat gewusst",    haben: true,  group: "günlük" },
  // Gruppe: İletişim/Düşünce
  { inf: "denken",  tr: "düşünmek",       präs: "denkt",   prät: "dachte",  perf: "hat gedacht",    haben: true,  group: "düşünce" },
  { inf: "wissen",  tr: "bilmek",         präs: "weiß",    prät: "wusste",  perf: "hat gewusst",    haben: true,  group: "düşünce" },
  { inf: "finden",  tr: "bulmak",         präs: "findet",  prät: "fand",    perf: "hat gefunden",   haben: true,  group: "düşünce" },
  { inf: "treffen", tr: "buluşmak",       präs: "trifft",  prät: "traf",    perf: "hat getroffen",  haben: true,  group: "düşünce" },
  { inf: "helfen",  tr: "yardım etmek",   präs: "hilft",   prät: "half",    perf: "hat geholfen",   haben: true,  group: "düşünce" },
  { inf: "bleiben", tr: "kalmak",         präs: "bleibt",  prät: "blieb",   perf: "ist geblieben",  haben: false, group: "düşünce" },
];

const groupColors: Record<string, { label: string; text: string; bg: string; border: string }> = {
  temel:    { label: "Temel",    text: "text-gold",        bg: "bg-gold/15",        border: "border-gold/40" },
  hareket:  { label: "Hareket",  text: "text-blue-400",    bg: "bg-blue-500/15",    border: "border-blue-500/40" },
  günlük:   { label: "Günlük",   text: "text-green-400",   bg: "bg-green-500/15",   border: "border-green-500/40" },
  düşünce:  { label: "Düşünce",  text: "text-violet-400",  bg: "bg-violet-500/15",  border: "border-violet-500/40" },
};

const questions = [
  { q: "Er ___ gestern nach Berlin. (fahren, Perfekt)", answer: "ist gefahren", options: ["hat gefahren", "ist gefahren", "ist gefährt", "hat gefährt"], tip: "fahren = Beweget → sein: ist gefahren" },
  { q: "Ich ___ das Buch. (lesen, Präteritum)", answer: "las", options: ["lesete", "las", "gelesen", "liest"], tip: "lesen → Präteritum: las" },
  { q: "Sie ___ gestern nicht. (schlafen, Perfekt)", answer: "hat geschlafen", options: ["ist geschlafen", "hat geschlafen", "hat geschlaft", "ist geschlafen"], tip: "schlafen = Bewegetsiz → haben: hat geschlafen" },
  { q: "Er ___ ihr das Buch. (geben, Präteritum)", answer: "gab", options: ["gabte", "gab", "gegeben", "gibt"], tip: "geben → Präteritum: gab" },
  { q: "Wir ___ viel. (essen, Perfekt)", answer: "haben gegessen", options: ["sind gegessen", "haben gegessen", "haben geessen", "sind geessen"], tip: "essen = Bewegetsiz → haben: haben gegessen" },
  { q: "Das Kind ___ sehr schnell. (laufen, Perfekt)", answer: "ist gelaufen", options: ["hat gelaufen", "ist gelaufen", "ist lief", "hat gelaufen"], tip: "laufen = Beweget → sein: ist gelaufen" },
  { q: "Er ___ die Antwort nicht. (wissen, Präteritum)", answer: "wusste", options: ["wissete", "wusste", "weiß", "gewusst"], tip: "wissen → Präteritum: wusste" },
  { q: "Ich ___ meine Freunde. (treffen, Perfekt)", answer: "habe getroffen", options: ["bin getroffen", "habe getroffen", "habe getrieffen", "bin getroffen"], tip: "treffen = Bewegetsiz → haben: habe getroffen" },
  { q: "Sie ___ in Berlin. (bleiben, Perfekt)", answer: "ist geblieben", options: ["hat geblieben", "ist geblieben", "ist blieb", "hat blieb"], tip: "bleiben = yer/durum → sein: ist geblieben" },
  { q: "Er ___ ihm. (helfen, Präteritum)", answer: "half", options: ["helfete", "half", "geholfen", "hilft"], tip: "helfen → Präteritum: half" },
];

function MiniPractice() {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const { update } = useSession();
  useEffect(() => {
    if (!done) return;
    const xp = Math.max(10, score * 5);
    const pct = Math.round((score / questions.length) * 100);
    saveProgress({ xp, skill: 'grammatik', skillScore: pct, minutes: 8 }).then(() => { update(); window.dispatchEvent(new CustomEvent("grammar-exercise-complete")); });
  }, [done]);

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
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-4">
      <div className="text-4xl">{score >= 8 ? "🏆" : score >= 6 ? "👍" : "💪"}</div>
      <div className="text-2xl font-black text-text-primary">{score} / {questions.length}</div>
      <div className="w-full bg-navy rounded-full h-2 max-w-xs mx-auto">
        <motion.div className="bg-gold h-2 rounded-full" initial={{ width: 0 }} animate={{ width: `${(score / questions.length) * 100}%` }} transition={{ duration: 0.8 }} />
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
      <div className="bg-navy/60 rounded-xl p-4">
        <p className="text-text-primary font-semibold text-sm">{q.q}</p>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {q.options.map(opt => {
          const picked = sel === opt, correct = opt === q.answer;
          return (
            <motion.button key={opt} whileTap={{ scale: 0.98 }} onClick={() => pick(opt)}
              className={`py-2.5 px-4 rounded-xl text-sm text-left font-semibold border transition-all ${sel
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
        {sel && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`p-3 rounded-xl text-xs border ${sel === q.answer ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-amber-500/10 border-amber-500/30 text-amber-400"}`}>
            💡 {q.tip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function UnregelmaessigeVerbenPage() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [practiceOpen, setPracticeOpen] = useState(false);

  const uniqueVerbs = verbs.filter((v, i, arr) => arr.findIndex(x => x.inf === v.inf) === i);

  const filtered = uniqueVerbs.filter(v => {
    const q = search.toLowerCase();
    const matchSearch = !q || v.inf.includes(q) || v.tr.includes(q) || v.prät.includes(q) || v.perf.includes(q);
    const matchGroup = !activeGroup || v.group === activeGroup;
    return matchSearch && matchGroup;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-navy-border p-7"
        style={{ background: "linear-gradient(135deg, #1A2940 0%, #152236 60%, #0D1B2A 100%)" }}>
        <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse at 50% 50%, #f5a62315 0%, transparent 55%)" }} />
        <div className="relative">
          <div className="flex gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-skill-grammatik/15 text-skill-grammatik text-xs font-bold border border-skill-grammatik/30">
              <GraduationCap className="w-3 h-3" /> A1 – B2
            </span>
            <span className="px-2.5 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold border border-gold/30">Ezber Şart!</span>
          </div>
          <h1 className="text-2xl font-black text-text-primary mb-2">Unregelmäßige Verben</h1>
          <p className="text-text-secondary text-sm max-w-xl">
            Sınavlarda en çok sorulan düzensiz fiiller — <strong className="text-gold">Infinitiv · Präsens · Präteritum · Perfekt</strong>.
            Ara veya kategoriye göre filtrele.
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Fiil ara (gehen, war, gelesen…)"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-navy border border-navy-border text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-gold/50 transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(groupColors).map(([key, c]) => (
            <button key={key} onClick={() => setActiveGroup(activeGroup === key ? null : key)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${activeGroup === key ? `${c.bg} ${c.border} ${c.text}` : "bg-navy-card border-navy-border text-text-muted hover:border-navy-border/80"}`}>
              {c.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Verb table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45 }}
        className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-navy-border bg-navy/40">
                <th className="text-left px-4 py-3 text-text-muted font-semibold">Infinitiv</th>
                <th className="text-left px-3 py-3 text-text-muted font-semibold hidden sm:table-cell">Türkçe</th>
                <th className="text-left px-3 py-3 text-amber-400 font-bold">Präsens (er)</th>
                <th className="text-left px-3 py-3 text-purple-400 font-bold">Präteritum (er)</th>
                <th className="text-left px-3 py-3 text-green-400 font-bold">Perfekt</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((v, i) => {
                  const gc = groupColors[v.group];
                  return (
                    <motion.tr key={v.inf}
                      initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }} transition={{ delay: i * 0.02, duration: 0.2 }}
                      className="border-b border-navy-border/30 last:border-0 hover:bg-navy/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${gc.text.replace("text-", "bg-")}`} />
                          <span className={`font-black ${gc.text}`}>{v.inf}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-text-muted hidden sm:table-cell">{v.tr}</td>
                      <td className="px-3 py-3 text-amber-400 font-semibold">{v.präs}</td>
                      <td className="px-3 py-3 text-purple-400 font-semibold">{v.prät}</td>
                      <td className="px-3 py-3">
                        <span className={`text-[10px] font-bold mr-1 ${v.haben ? "text-text-muted" : "text-blue-400"}`}>{v.haben ? "hat" : "ist"}</span>
                        <span className="text-green-400 font-semibold">{v.perf.split(" ").slice(1).join(" ")}</span>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-text-muted text-sm">"{search}" için sonuç bulunamadı</div>
          )}
        </div>
      </motion.div>

      {/* haben vs sein reminder */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <div className="text-blue-400 font-bold text-sm mb-2">sein ile → Perfekt</div>
          <div className="text-text-secondary text-xs leading-relaxed">Hareket/yer değişimi: gehen, kommen, fahren, fliegen, laufen, reisen…<br />Durum değişimi: werden, bleiben, sterben</div>
        </div>
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
          <div className="text-green-400 font-bold text-sm mb-2">haben ile → Perfekt</div>
          <div className="text-text-secondary text-xs leading-relaxed">Diğer tüm fiiller: essen, trinken, schlafen, lesen, arbeiten, spielen…<br />Modalverben de haben alır!</div>
        </div>
      </motion.div>

      {/* Practice */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.45 }}
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
              <div className="p-4 border-t border-navy-border"><MiniPractice /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <GrammarTracker topicId="a2-starke-verben" level="A2" />
    </div>
  );
}
