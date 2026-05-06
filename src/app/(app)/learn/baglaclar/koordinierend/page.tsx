"use client";
import { saveProgress } from "@/lib/saveProgress";
import { useSession } from "next-auth/react";
import { GrammarTracker } from "@/components/learn/GrammarTracker";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Volume2, CheckCircle2, XCircle, Lightbulb, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

function speakDE(text: string) {
  if (typeof window === "undefined") return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function SpeakBtn({ text }: { text: string }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); speakDE(text); }}
      className="ml-2 p-1 rounded-full hover:bg-teal-500/20 text-teal-400 transition-colors shrink-0"
      title="Dinle"
    >
      <Volume2 size={13} />
    </button>
  );
}

const konjunktionen = [
  {
    word: "und",
    meaning: "ve",
    color: "teal",
    example: "Ich lerne Deutsch und ich lese viel.",
    translation: "Almanca öğreniyorum ve çok okuyorum.",
    tip: "İki cümleyi veya ögeyi eşit şekilde birleştirir.",
  },
  {
    word: "aber",
    meaning: "ama / fakat",
    color: "amber",
    example: "Er ist klug, aber er arbeitet nicht.",
    translation: "Zeki ama çalışmıyor.",
    tip: "Zıtlık bildirir. Beklenenin tersini ifade eder.",
  },
  {
    word: "oder",
    meaning: "veya / ya da",
    color: "blue",
    example: "Möchten Sie Tee oder Kaffee?",
    translation: "Çay mı istersiniz yoksa kahve mi?",
    tip: "Alternatifler arasında seçim sunar.",
  },
  {
    word: "denn",
    meaning: "çünkü (neden)",
    color: "purple",
    example: "Er geht nicht, denn er ist krank.",
    translation: "Gitmiyor, çünkü hasta.",
    tip: "Neden bildirir. weil'den farkı: fiil 2. pozisyonda kalır!",
  },
  {
    word: "sondern",
    meaning: "aksine / bilakis",
    color: "rose",
    example: "Er trinkt nicht Kaffee, sondern Tee.",
    translation: "Kahve değil, çay içiyor.",
    tip: "Yalnızca olumsuz cümleden sonra gelir. aber'ın yerini almaz!",
  },
];

const wordOrderExamples = [
  { conj: "und", s1: "Ich lerne Deutsch.", s2: "Ich höre Musik.", result: "Ich lerne Deutsch und ich höre Musik.", pos: 2 },
  { conj: "aber", s1: "Er ist reich.", s2: "Er ist nicht glücklich.", result: "Er ist reich, aber er ist nicht glücklich.", pos: 2 },
  { conj: "denn", s1: "Sie bleibt zu Hause.", s2: "Sie ist müde.", result: "Sie bleibt zu Hause, denn sie ist müde.", pos: 2 },
];

const aberVsSondern = [
  { sentence: "Er ist nicht jung, ___ alt.", answer: "sondern", why: "Olumsuz + zıt gerçek → sondern" },
  { sentence: "Er ist alt, ___ fit.", answer: "aber", why: "Olumlu + zıtlık → aber" },
  { sentence: "Wir fahren nicht mit dem Bus, ___ mit dem Zug.", answer: "sondern", why: "Olumsuz + düzeltme → sondern" },
  { sentence: "Sie singt gut, ___ tanzt nicht.", answer: "aber", why: "Olumlu + zıtlık → aber" },
];

const questions = [
  { q: "Ich bin müde, ___ ich schlafe nicht.", options: ["und", "aber", "denn", "sondern"], answer: "aber" },
  { q: "Er lernt Deutsch, ___ er liebt die Sprache.", options: ["oder", "aber", "denn", "sondern"], answer: "denn" },
  { q: "Möchtest du Wasser ___ Saft?", options: ["und", "aber", "oder", "denn"], answer: "oder" },
  { q: "Sie kommt nicht heute, ___ morgen.", options: ["aber", "denn", "oder", "sondern"], answer: "sondern" },
  { q: "Er ist nicht groß, ___ sehr stark.", options: ["aber", "sondern", "denn", "und"], answer: "sondern" },
  { q: "Ich esse gern Pizza ___ Pasta.", options: ["oder", "aber", "denn", "sondern"], answer: "und" },
  { q: "Wir fahren nicht mit dem Auto, ___ wir haben keins.", options: ["und", "aber", "denn", "sondern"], answer: "denn" },
  { q: "Kommst du mit ___ bleibst du hier?", options: ["und", "aber", "oder", "sondern"], answer: "oder" },
  { q: "Er arbeitet viel, ___ verdient wenig.", options: ["denn", "sondern", "aber", "und"], answer: "aber" },
  { q: "Ich trinke keinen Alkohol, ___ Wasser.", options: ["aber", "oder", "denn", "sondern"], answer: "sondern" },
];

function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-navy-border bg-navy-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-navy-border/20 transition-colors"
      >
        <span className="font-semibold text-text-primary">{title}</span>
        <ChevronDown size={18} className={cn("text-teal-400 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PracticeSection() {
  const { update } = useSession();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = Object.entries(answers).filter(([i, a]) => questions[Number(i)].answer === a).length;

  return (
    <div className="rounded-2xl border border-navy-border bg-navy-card p-6 space-y-5">
      <h2 className="font-bold text-lg text-text-primary">Pratik — 10 Soru</h2>
      {questions.map((q, i) => (
        <div key={i} className="space-y-2">
          <p className="text-text-secondary text-sm font-medium">{i + 1}. {q.q}</p>
          <div className="flex flex-wrap gap-2">
            {q.options.map((opt) => {
              const chosen = answers[i] === opt;
              const correct = opt === q.answer;
              return (
                <button
                  key={opt}
                  disabled={submitted}
                  onClick={() => setAnswers((prev) => ({ ...prev, [i]: opt }))}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm border transition-colors",
                    !submitted && chosen && "border-teal-500 bg-teal-500/15 text-teal-300",
                    !submitted && !chosen && "border-navy-border text-text-muted hover:border-teal-500/40",
                    submitted && chosen && correct && "border-green-500 bg-green-500/15 text-green-300",
                    submitted && chosen && !correct && "border-red-500 bg-red-500/15 text-red-300",
                    submitted && !chosen && correct && "border-green-500/50 bg-green-500/5 text-green-400",
                    submitted && !chosen && !correct && "border-navy-border text-text-muted opacity-50"
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && (
            <p className="text-xs text-text-muted flex items-center gap-1">
              {answers[i] === q.answer
                ? <><CheckCircle2 size={12} className="text-green-400" /> Doğru!</>
                : <><XCircle size={12} className="text-red-400" /> Doğrusu: <strong className="text-teal-300">{q.answer}</strong></>}
            </p>
          )}
        </div>
      ))}
      {!submitted ? (
        <button
          onClick={async () => { setSubmitted(true); const sc = Object.entries(answers).filter(([i, a]) => questions[Number(i)].answer === a).length; await saveProgress({ xp: Math.max(10, sc * 5), skill: "grammatik", skillScore: Math.round((sc / questions.length) * 100), minutes: 8 }); update(); window.dispatchEvent(new CustomEvent("grammar-exercise-complete")); }}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full py-2.5 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-400 disabled:opacity-40 transition-colors"
        >
          Kontrol Et
        </button>
      ) : (
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-teal-400">{score}/{questions.length}</p>
          <p className="text-text-muted text-sm">{score >= 8 ? "Harika! Koordinierende bağlaçlar hakimsin." : "Tekrar et ve dene."}</p>
          <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="text-xs text-teal-400 underline">Yeniden Başla</button>
        </div>
      )}
    </div>
  );
}

export default function KoordinirendPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-gradient-to-br from-teal-900/40 via-navy-card to-navy border border-teal-500/20 p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 text-xs font-bold mb-3">A1–A2</div>
            <h1 className="text-3xl font-extrabold text-text-primary mb-2">Koordinierende Bağlaçlar</h1>
            <p className="text-text-muted max-w-lg">und · aber · oder · denn · sondern — Kelime sırasını değiştirmeyen bağlaçlar. Sınavda en sık karşılaşılan 5 bağlaç!</p>
          </div>
          <div className="text-5xl">🔗</div>
        </div>
        <div className="mt-5 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20">
          <div className="flex items-center gap-2 text-teal-300 font-semibold text-sm mb-1"><Lightbulb size={15}/> Altın Kural</div>
          <p className="text-text-secondary text-sm">Koordinierende bağlaçlar <strong className="text-teal-300">kelime sırasını değiştirmez</strong> — fiil hâlâ <strong className="text-gold">2. pozisyonda</strong> kalır.</p>
        </div>
      </motion.div>

      {/* Cards */}
      <CollapsibleSection title="5 Temel Koordinierende Bağlaç">
        <div className="grid gap-4">
          {konjunktionen.map((k, i) => (
            <motion.div key={k.word} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-navy-border bg-navy p-4 flex gap-4">
              <div className={cn("w-14 h-14 shrink-0 rounded-xl flex flex-col items-center justify-center font-extrabold text-sm",
                k.color === "teal" && "bg-teal-500/15 text-teal-300 border border-teal-500/30",
                k.color === "amber" && "bg-amber-500/15 text-amber-300 border border-amber-500/30",
                k.color === "blue" && "bg-blue-500/15 text-blue-300 border border-blue-500/30",
                k.color === "purple" && "bg-purple-500/15 text-purple-300 border border-purple-500/30",
                k.color === "rose" && "bg-rose-500/15 text-rose-300 border border-rose-500/30",
              )}>
                {k.word}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-text-primary font-bold">{k.word}</span>
                  <span className="text-text-muted text-xs">= {k.meaning}</span>
                  <SpeakBtn text={k.example} />
                </div>
                <p className="text-sm text-text-secondary italic mb-1">„{k.example}"</p>
                <p className="text-xs text-text-muted mb-2">{k.translation}</p>
                <div className="flex items-start gap-1.5 bg-teal-500/8 rounded-lg p-2">
                  <ArrowRight size={12} className="text-teal-400 mt-0.5 shrink-0"/>
                  <p className="text-xs text-text-muted">{k.tip}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Word Order */}
      <CollapsibleSection title="Kelime Sırası — Fiil Hep 2. Pozisyonda">
        <div className="space-y-4">
          {wordOrderExamples.map((ex, i) => (
            <div key={i} className="rounded-xl border border-navy-border bg-navy p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 text-xs font-bold">{ex.conj}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-text-muted mb-2">
                <span className="px-2 py-1 rounded bg-navy-border/40">{ex.s1}</span>
                <span>+</span>
                <span className="px-2 py-1 rounded bg-navy-border/40">{ex.s2}</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight size={14} className="text-teal-400 shrink-0"/>
                <p className="text-text-primary text-sm font-medium">{ex.result}</p>
                <SpeakBtn text={ex.result}/>
              </div>
              <p className="text-xs text-teal-400 mt-1">✓ Fiil 2. pozisyonda — kelime sırası değişmedi</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* aber vs sondern */}
      <CollapsibleSection title="aber vs sondern — Sınavda Tuzak!">
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/8 p-3">
            <p className="text-amber-300 font-bold text-sm mb-1">aber</p>
            <p className="text-text-muted text-xs">Olumlu veya olumsuz cümleden sonra gelir. Sadece zıtlık bildirir.</p>
            <p className="text-xs italic text-text-secondary mt-2">"Er ist alt, aber fit."</p>
          </div>
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/8 p-3">
            <p className="text-rose-300 font-bold text-sm mb-1">sondern</p>
            <p className="text-text-muted text-xs">SADECE olumsuz cümleden sonra! Yanlışı düzelterek doğruyu söyler.</p>
            <p className="text-xs italic text-text-secondary mt-2">"Nicht jung, sondern alt."</p>
          </div>
        </div>
        <div className="space-y-2">
          {aberVsSondern.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-navy-border bg-navy p-3">
              <p className="flex-1 text-text-secondary text-sm">{item.sentence}</p>
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold shrink-0",
                item.answer === "sondern" ? "bg-rose-500/15 text-rose-300" : "bg-amber-500/15 text-amber-300"
              )}>{item.answer}</span>
              <p className="text-xs text-text-muted hidden sm:block">{item.why}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <GrammarTracker topicId="koordinierende-konjunktionen" level="A1" />
      <PracticeSection />
    </div>
  );
}
