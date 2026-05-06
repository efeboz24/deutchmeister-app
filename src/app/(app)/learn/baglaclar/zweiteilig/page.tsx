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

const konjunktionen = [
  {
    pair: ["sowohl", "als auch"],
    meaning: "hem … hem de",
    color: "teal",
    usage: "İki olumlu şeyi birleştirir. İkisi de geçerli.",
    examples: [
      { de: "Sie spricht sowohl Deutsch als auch Englisch.", tr: "Hem Almanca hem de İngilizce konuşuyor." },
      { de: "Er ist sowohl intelligent als auch fleißig.", tr: "Hem zeki hem de çalışkan." },
    ],
    tip: "Tekil fiil kalır çoğunlukla, ama ikisi de özne ise çoğul da olabilir.",
  },
  {
    pair: ["weder", "noch"],
    meaning: "ne … ne de",
    color: "rose",
    usage: "İki olumsuz şeyi birleştirir. İkisi de geçersiz.",
    examples: [
      { de: "Er trinkt weder Kaffee noch Tee.", tr: "Ne kahve ne de çay içiyor." },
      { de: "Sie hat weder Zeit noch Geld.", tr: "Ne zamanı ne de parası var." },
    ],
    tip: "Olumsuzluk zaten kelimede — kein/nicht kullanma!",
  },
  {
    pair: ["entweder", "oder"],
    meaning: "ya … ya da",
    color: "amber",
    usage: "İki seçenekten birini sunar. Biri zorunlu.",
    examples: [
      { de: "Entweder kommst du mit, oder ich gehe allein.", tr: "Ya benimle gelirsin ya da yalnız giderim." },
      { de: "Entweder er kommt jetzt, oder wir fangen an.", tr: "Ya şimdi gelir ya biz başlarız." },
    ],
    tip: "entweder cümle başında gelince fiil 2. pozisyonda kalır.",
  },
  {
    pair: ["nicht nur", "sondern auch"],
    meaning: "sadece … değil, aynı zamanda …",
    color: "purple",
    usage: "İki özelliği güçlendirir. İkincisi beklenmedik/önemli.",
    examples: [
      { de: "Er spricht nicht nur Deutsch, sondern auch Japanisch.", tr: "Sadece Almanca değil, aynı zamanda Japonca da konuşuyor." },
      { de: "Sie ist nicht nur schön, sondern auch klug.", tr: "Sadece güzel değil, aynı zamanda akıllı da." },
    ],
    tip: "nicht nur her zaman birinci cümlede. sondern auch ile tamamlanır.",
  },
];

const questions = [
  { q: "___ er noch sie kann kochen.", options: ["Sowohl…als auch", "Weder…noch", "Entweder…oder", "Nicht nur…sondern auch"], answer: "Weder…noch" },
  { q: "Sie ist ___ intelligent ___ fleißig.", options: ["weder…noch", "entweder…oder", "sowohl…als auch", "nicht nur…sondern auch"], answer: "sowohl…als auch" },
  { q: "___ du hilfst, ___ ich mache es selbst.", options: ["Weder…noch", "Entweder…oder", "Sowohl…als auch", "Nicht nur…sondern auch"], answer: "Entweder…oder" },
  { q: "Er trinkt ___ Alkohol ___ raucht er.", options: ["sowohl…als auch", "entweder…oder", "nicht nur…sondern auch", "weder…noch"], answer: "weder…noch" },
  { q: "Sie spricht ___ Deutsch, ___ Englisch.", options: ["weder…noch", "entweder…oder", "sowohl…als auch", "nicht nur…sondern auch"], answer: "sowohl…als auch" },
  { q: "Er ist ___ Lehrer, ___ Schriftsteller.", options: ["weder…noch", "sowohl…als auch", "entweder…oder", "ob…dass"], answer: "nicht nur…sondern auch" },
  { q: "___ er kommt ___ ich gehe.", options: ["Sowohl…als auch", "Nicht nur…sondern auch", "Entweder…oder", "Weder…noch"], answer: "Entweder…oder" },
  { q: "Sie hat ___ Zeit ___ Lust.", options: ["sowohl…als auch", "entweder…oder", "weder…noch", "nicht nur…sondern auch"], answer: "weder…noch" },
  { q: "Er lernt ___ Gitarre ___ Klavier.", options: ["weder…noch", "entweder…oder", "sowohl…als auch", "nicht nur…sondern auch"], answer: "sowohl…als auch" },
  { q: "Das ist ___ schwierig, ___ interessant.", options: ["weder…noch", "entweder…oder", "sowohl…als auch", "ob…dass"], answer: "nicht nur…sondern auch" },
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
          <p className="text-text-muted text-sm">{score >= 8 ? "Harika! Zweiteilige bağlaçlar hakimsin." : "Tekrar çalış!"}</p>
          <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="text-xs text-teal-400 underline">Yeniden Başla</button>
        </div>
      )}
    </div>
  );
}

export default function ZweiteiligPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-gradient-to-br from-teal-900/40 via-navy-card to-navy border border-teal-500/20 p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 text-xs font-bold mb-3">A2–B1</div>
            <h1 className="text-3xl font-extrabold text-text-primary mb-2">Zweiteilige Bağlaçlar</h1>
            <p className="text-text-muted max-w-lg">sowohl…als auch · weder…noch · entweder…oder · nicht nur…sondern auch — İkili bağlaçlar!</p>
          </div>
          <div className="text-5xl">⚡</div>
        </div>
        <div className="mt-5 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20">
          <div className="flex items-center gap-2 text-teal-300 font-semibold text-sm mb-1"><Lightbulb size={15}/> Altın Kural</div>
          <p className="text-text-secondary text-sm">Zweiteilige bağlaçlar <strong className="text-gold">çift parçalı</strong> — iki bölümü birlikte öğren. Kelime sırası değişmez!</p>
        </div>
      </motion.div>

      <CollapsibleSection title="4 Temel İkili Bağlaç">
        <div className="grid gap-5">
          {konjunktionen.map((k, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={cn("rounded-xl border p-5",
                k.color === "teal" && "border-teal-500/30 bg-teal-500/5",
                k.color === "rose" && "border-rose-500/30 bg-rose-500/5",
                k.color === "amber" && "border-amber-500/30 bg-amber-500/5",
                k.color === "purple" && "border-purple-500/30 bg-purple-500/5",
              )}>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <span className={cn("px-2 py-1 rounded font-extrabold text-sm",
                    k.color === "teal" && "bg-teal-500/20 text-teal-300",
                    k.color === "rose" && "bg-rose-500/20 text-rose-300",
                    k.color === "amber" && "bg-amber-500/20 text-amber-300",
                    k.color === "purple" && "bg-purple-500/20 text-purple-300",
                  )}>{k.pair[0]}</span>
                  <span className="text-text-muted text-xs">…</span>
                  <span className={cn("px-2 py-1 rounded font-extrabold text-sm",
                    k.color === "teal" && "bg-teal-500/20 text-teal-300",
                    k.color === "rose" && "bg-rose-500/20 text-rose-300",
                    k.color === "amber" && "bg-amber-500/20 text-amber-300",
                    k.color === "purple" && "bg-purple-500/20 text-purple-300",
                  )}>{k.pair[1]}</span>
                </div>
                <span className="text-text-muted text-sm">= {k.meaning}</span>
              </div>
              <p className="text-xs text-text-muted mb-3">{k.usage}</p>
              <div className="space-y-2">
                {k.examples.map((ex, j) => (
                  <div key={j} className="rounded-lg bg-navy-border/30 p-3">
                    <div className="flex items-center gap-1">
                      <p className="text-text-primary text-sm">{ex.de}</p>
                      <SpeakBtn text={ex.de} />
                    </div>
                    <p className="text-text-muted text-xs italic">{ex.tr}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-start gap-2 bg-navy-border/20 rounded-lg p-2">
                <Lightbulb size={12} className="text-gold mt-0.5 shrink-0"/>
                <p className="text-xs text-text-muted">{k.tip}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Hızlı Karşılaştırma">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-left px-3 py-2 text-text-muted border-b border-navy-border">Bağlaç</th>
                <th className="text-left px-3 py-2 text-text-muted border-b border-navy-border">Anlam</th>
                <th className="text-left px-3 py-2 text-text-muted border-b border-navy-border">Kullanım</th>
              </tr>
            </thead>
            <tbody>
              {[
                { pair: "sowohl … als auch", meaning: "hem … hem de", use: "İkisi de olumlu ✓✓" },
                { pair: "weder … noch", meaning: "ne … ne de", use: "İkisi de olumsuz ✗✗" },
                { pair: "entweder … oder", meaning: "ya … ya da", use: "Biri seçilmeli →" },
                { pair: "nicht nur … sondern auch", meaning: "sadece … değil, aynı zamanda", use: "İkincisi sürpriz ★" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-navy-border/10">
                  <td className="px-3 py-2 text-teal-300 font-mono text-xs border-b border-navy-border/50">{row.pair}</td>
                  <td className="px-3 py-2 text-text-secondary border-b border-navy-border/50">{row.meaning}</td>
                  <td className="px-3 py-2 text-text-muted text-xs border-b border-navy-border/50">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      <GrammarTracker topicId="zweiteilige-konjunktionen" level="B1" />
      <PracticeSection />
    </div>
  );
}
