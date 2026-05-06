"use client";
import { saveProgress } from "@/lib/saveProgress";
import { useSession } from "next-auth/react";
import { GrammarTracker } from "@/components/learn/GrammarTracker";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Volume2, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
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

const comparison = [
  {
    word: "weil",
    type: "Nebensatz bağlacı",
    color: "amber",
    rule: "Fiil yan cümlenin SONUNA gider",
    position: "Nebensatz",
    example: "Ich bleibe zu Hause, weil ich krank bin.",
    translation: "Evde kalıyorum çünkü hastayım.",
    canStart: true,
    startExample: "Weil ich krank bin, bleibe ich zu Hause.",
    frequency: "En yaygın — sınavda %70 ihtimalle weil",
  },
  {
    word: "denn",
    type: "Koordinierende bağlaç",
    color: "teal",
    rule: "Fiil 2. pozisyonda kalır (değişmez!)",
    position: "Hauptsatz",
    example: "Ich bleibe zu Hause, denn ich bin krank.",
    translation: "Evde kalıyorum, çünkü hastayım.",
    canStart: false,
    startExample: "",
    frequency: "Yazılı dilde daha resmi — cümle başına gelemez",
  },
  {
    word: "da",
    type: "Nebensatz bağlacı",
    color: "purple",
    rule: "Fiil yan cümlenin SONUNA gider. Bilinen bir neden!",
    position: "Nebensatz",
    example: "Da er krank ist, bleibt er zu Hause.",
    translation: "Hasta olduğu için evde kalıyor. (Bunu zaten biliyoruz)",
    canStart: true,
    startExample: "Da es kalt ist, ziehe ich eine Jacke an.",
    frequency: "Resmi yazı dili. Neden zaten biliniyorsa da kullanılır",
  },
];

const tricky = [
  {
    q: "Arkadaşın neden gelmedi? — Hasta.",
    weil: "Er kommt nicht, weil er krank ist.",
    denn: "Er kommt nicht, denn er ist krank.",
    da: "Da er krank ist, kommt er nicht.",
    tip: "Üçü de doğru — ama weil en yaygın kullanım",
  },
  {
    q: "Cümle başında neden kullanılır?",
    weil: "Weil es regnet, bleibe ich drinnen. ✓",
    denn: "Denn es regnet... ✗ (YANLIŞ! Cümle başına gelemez)",
    da: "Da es regnet, bleibe ich drinnen. ✓",
    tip: "denn asla cümle başına gelemez!",
  },
];

const questions = [
  { q: "Er geht nicht zur Schule, ___ er krank ist.", options: ["denn", "weil", "da", "wenn"], answer: "weil" },
  { q: "___ es regnet, bleiben wir zu Hause.", options: ["Denn", "Weil", "Und", "Aber"], answer: "Weil" },
  { q: "Ich trinke keinen Kaffee, ___ er mir nicht schmeckt.", options: ["da", "denn", "aber", "weil"], answer: "denn" },
  { q: "___ sie Hunger hat, kocht sie etwas.", options: ["Denn", "Da", "Aber", "Oder"], answer: "Da" },
  { q: "Er lernt viel, ___ er die Prüfung bestehen möchte.", options: ["denn", "weil", "aber", "da"], answer: "weil" },
  { q: "Ich mag ihn, ___ er ehrlich ist.", options: ["weil", "denn", "da", "aber"], answer: "denn" },
  { q: "___ das Wetter schön ist, gehen wir spazieren.", options: ["Denn", "Weil", "Und", "Sondern"], answer: "Weil" },
  { q: "Sie ist müde, ___ sie lange gearbeitet hat.", options: ["denn", "da", "weil", "ob"], answer: "weil" },
  { q: "___ er kein Geld hat, kann er nicht kommen.", options: ["Weil", "Denn", "Da", "Aber"], answer: "Da" },
  { q: "Wir fahren nicht, ___ das Auto kaputt ist.", options: ["da", "weil", "denn", "ob"], answer: "denn" },
];

function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-navy-border bg-navy-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-navy-border/20 transition-colors">
        <span className="font-semibold text-text-primary">{title}</span>
        <ChevronDown size={18} className={cn("text-teal-400 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
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
                <button key={opt} disabled={submitted} onClick={() => setAnswers((prev) => ({ ...prev, [i]: opt }))}
                  className={cn("px-3 py-1.5 rounded-lg text-sm border transition-colors",
                    !submitted && chosen && "border-teal-500 bg-teal-500/15 text-teal-300",
                    !submitted && !chosen && "border-navy-border text-text-muted hover:border-teal-500/40",
                    submitted && chosen && correct && "border-green-500 bg-green-500/15 text-green-300",
                    submitted && chosen && !correct && "border-red-500 bg-red-500/15 text-red-300",
                    submitted && !chosen && correct && "border-green-500/50 bg-green-500/5 text-green-400",
                    submitted && !chosen && !correct && "border-navy-border text-text-muted opacity-50"
                  )}>
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && (
            <p className="text-xs text-text-muted flex items-center gap-1">
              {answers[i] === q.answer ? <><CheckCircle2 size={12} className="text-green-400" /> Doğru!</> : <><XCircle size={12} className="text-red-400" /> Doğrusu: <strong className="text-teal-300">{q.answer}</strong></>}
            </p>
          )}
        </div>
      ))}
      {!submitted ? (
        <button onClick={async () => { setSubmitted(true); const sc = Object.entries(answers).filter(([i, a]) => questions[Number(i)].answer === a).length; await saveProgress({ xp: Math.max(10, sc * 5), skill: "grammatik", skillScore: Math.round((sc / questions.length) * 100), minutes: 8 }); update(); window.dispatchEvent(new CustomEvent("grammar-exercise-complete")); }} disabled={Object.keys(answers).length < questions.length} className="w-full py-2.5 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-400 disabled:opacity-40 transition-colors">Kontrol Et</button>
      ) : (
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-teal-400">{score}/{questions.length}</p>
          <p className="text-text-muted text-sm">{score >= 8 ? "Süper! weil/denn/da farkını kavradın." : "Tekrar çalış, iyi olacaksın!"}</p>
          <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="text-xs text-teal-400 underline">Yeniden Başla</button>
        </div>
      )}
    </div>
  );
}

export default function KausalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-gradient-to-br from-teal-900/40 via-navy-card to-navy border border-teal-500/20 p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 text-xs font-bold mb-3">A2–B1</div>
            <h1 className="text-3xl font-extrabold text-text-primary mb-2">Kausalangaben</h1>
            <p className="text-text-muted max-w-lg">weil · denn · da — Hepsi "çünkü" demek ama <strong className="text-teal-300">çok farklı kullanımları var!</strong></p>
          </div>
          <div className="text-5xl">❓</div>
        </div>
        <div className="mt-5 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20">
          <div className="flex items-center gap-2 text-teal-300 font-semibold text-sm mb-1"><Lightbulb size={15}/> Sınav İpucu</div>
          <p className="text-text-secondary text-sm"><strong className="text-gold">weil</strong> → fiil sona | <strong className="text-teal-300">denn</strong> → fiil 2. pozisyonda, cümle başına gelemez | <strong className="text-purple-300">da</strong> → fiil sona, resmi + bilinen neden</p>
        </div>
      </motion.div>

      <CollapsibleSection title="weil / denn / da — Karşılaştırma Tablosu">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-left px-3 py-2 text-text-muted font-medium border-b border-navy-border">Özellik</th>
                {comparison.map(c => (
                  <th key={c.word} className={cn("text-center px-3 py-2 font-bold border-b border-navy-border",
                    c.color === "amber" ? "text-amber-300" : c.color === "teal" ? "text-teal-300" : "text-purple-300"
                  )}>{c.word}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-navy-border/10">
                <td className="px-3 py-2 text-text-muted border-b border-navy-border/50">Tür</td>
                {comparison.map(c => <td key={c.word} className="px-3 py-2 text-center text-text-secondary text-xs border-b border-navy-border/50">{c.type}</td>)}
              </tr>
              <tr className="hover:bg-navy-border/10">
                <td className="px-3 py-2 text-text-muted border-b border-navy-border/50">Fiil pozisyonu</td>
                {comparison.map(c => <td key={c.word} className="px-3 py-2 text-center text-xs border-b border-navy-border/50">
                  <span className={cn("px-2 py-0.5 rounded font-bold",
                    c.position === "Nebensatz" ? "bg-amber-500/15 text-amber-300" : "bg-teal-500/15 text-teal-300"
                  )}>{c.rule}</span>
                </td>)}
              </tr>
              <tr className="hover:bg-navy-border/10">
                <td className="px-3 py-2 text-text-muted border-b border-navy-border/50">Cümle başı</td>
                {comparison.map(c => <td key={c.word} className="px-3 py-2 text-center border-b border-navy-border/50">
                  {c.canStart ? <span className="text-green-400 font-bold">✓</span> : <span className="text-red-400 font-bold">✗</span>}
                </td>)}
              </tr>
              <tr>
                <td className="px-3 py-2 text-text-muted">Kullanım sıklığı</td>
                {comparison.map(c => <td key={c.word} className="px-3 py-2 text-center text-text-muted text-xs">{c.frequency}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Aynı Cümle — 3 Farklı Bağlaç">
        <div className="space-y-5">
          {comparison.map((c) => (
            <div key={c.word} className={cn("rounded-xl border p-4",
              c.color === "amber" ? "border-amber-500/30 bg-amber-500/5" :
              c.color === "teal" ? "border-teal-500/30 bg-teal-500/5" :
              "border-purple-500/30 bg-purple-500/5"
            )}>
              <div className="flex items-center gap-2 mb-2">
                <span className={cn("font-bold text-sm px-2 py-0.5 rounded",
                  c.color === "amber" ? "bg-amber-500/20 text-amber-300" :
                  c.color === "teal" ? "bg-teal-500/20 text-teal-300" :
                  "bg-purple-500/20 text-purple-300"
                )}>{c.word}</span>
                <span className="text-xs text-text-muted">{c.type}</span>
                <SpeakBtn text={c.example} />
              </div>
              <p className="text-text-primary text-sm mb-1 font-medium">{c.example}</p>
              <p className="text-text-muted text-xs italic mb-2">{c.translation}</p>
              {c.canStart && c.startExample && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-navy-border">
                  <span className="text-xs text-text-muted">Cümle başında:</span>
                  <p className="text-text-secondary text-xs">{c.startExample}</p>
                  <SpeakBtn text={c.startExample} />
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Yaygın Hatalar ve Tuzaklar">
        <div className="space-y-5">
          {tricky.map((t, i) => (
            <div key={i} className="rounded-xl border border-navy-border bg-navy p-4">
              <p className="text-teal-300 font-semibold text-sm mb-3">{t.q}</p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2"><span className="text-amber-300 w-8 shrink-0">weil:</span><span className="text-text-secondary">{t.weil}</span></div>
                <div className="flex gap-2"><span className="text-teal-300 w-8 shrink-0">denn:</span><span className="text-text-secondary">{t.denn}</span></div>
                <div className="flex gap-2"><span className="text-purple-300 w-8 shrink-0">da:</span><span className="text-text-secondary">{t.da}</span></div>
              </div>
              <div className="mt-3 flex items-start gap-2 bg-gold/10 border border-gold/20 rounded-lg p-2">
                <Lightbulb size={13} className="text-gold mt-0.5 shrink-0"/>
                <p className="text-xs text-text-muted">{t.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <GrammarTracker topicId="kausale-nebensaetze" level="B1" />
      <PracticeSection />
    </div>
  );
}
