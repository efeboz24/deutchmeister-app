"use client";
import { saveProgress } from "@/lib/saveProgress";
import { useSession } from "next-auth/react";
import { GrammarTracker } from "@/components/learn/GrammarTracker";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Volume2, CheckCircle2, XCircle, Lightbulb, AlertTriangle } from "lucide-react";
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
  { word: "weil", meaning: "çünkü", usage: "Neden / sebep bildirir", color: "amber",
    normal: "Er bleibt zu Hause.", normalTr: "Evde kalıyor.",
    sub: "..., weil er krank ist.", subTr: "...çünkü hasta." },
  { word: "dass", meaning: "ki / -diği", usage: "Dolaylı anlatım, düşünce", color: "blue",
    normal: "Er sagt: \u201eIch bin m\u00fcde.\u201c", normalTr: "Yorgunum diyor.",
    sub: "Er sagt, dass er müde ist.", subTr: "Yorgun olduğunu söylüyor." },
  { word: "ob", meaning: "olup olmadığını / acaba", usage: "Dolaylı soru (evet/hayır)", color: "purple",
    normal: "Kommt er morgen?", normalTr: "Yarın geliyor mu?",
    sub: "Ich weiß nicht, ob er morgen kommt.", subTr: "Yarın gelip gelmeyeceğini bilmiyorum." },
  { word: "wenn", meaning: "eğer / -diğinde", usage: "Şart veya tekrarlayan durum", color: "teal",
    normal: "Du hast Zeit. Ruf mich an!", normalTr: "Zamanın varsa ara!",
    sub: "Ruf mich an, wenn du Zeit hast.", subTr: "Zamanın olduğunda beni ara." },
  { word: "als", meaning: "-dığında (tek seferlik geçmiş)", usage: "Geçmişte tek bir olay", color: "rose",
    normal: "Ich war jung. Ich spielte Fußball.", normalTr: "Gençken futbol oynardım.",
    sub: "Als ich jung war, spielte ich Fußball.", subTr: "Genç olduğumda futbol oynardım." },
  { word: "obwohl", meaning: "her ne kadar / -e rağmen", usage: "Beklenenin aksini ifade eder", color: "green",
    normal: "Er ist müde. Er arbeitet weiter.", normalTr: "Yorgun ama çalışmaya devam ediyor.",
    sub: "Er arbeitet weiter, obwohl er müde ist.", subTr: "Yorgun olmasına rağmen çalışmaya devam ediyor." },
];

const verbEndExamples = [
  {
    main: "Ich glaube,",
    conj: "dass",
    clause: "er morgen kommt.",
    highlight: "kommt",
    note: "Fiil en sona gitti",
  },
  {
    main: "Sie bleibt zu Hause,",
    conj: "weil",
    clause: "sie krank ist.",
    highlight: "ist",
    note: "Fiil en sona gitti",
  },
  {
    main: "Ich weiß nicht,",
    conj: "ob",
    clause: "er schläft.",
    highlight: "schläft",
    note: "Fiil en sona gitti",
  },
];

const wennVsAls = [
  { sentence: "___ ich ein Kind war, mochte ich Eis.", answer: "Als", why: "Geçmişte tek bir dönem" },
  { sentence: "___ es regnet, bleibe ich zu Hause.", answer: "Wenn", why: "Şimdiki şart / tekrarlayan durum" },
  { sentence: "___ sie ankam, war ich schon da.", answer: "Als", why: "Geçmişte tek bir an" },
  { sentence: "___ du Zeit hast, komm vorbei!", answer: "Wenn", why: "Şart cümlesi" },
];

const questions = [
  { q: "Ich bleibe zu Hause, ___ es regnet.", options: ["weil", "wenn", "dass", "ob"], answer: "wenn" },
  { q: "Er sagt, ___ er müde ist.", options: ["ob", "als", "dass", "weil"], answer: "dass" },
  { q: "Sie lernt viel, ___ sie die Prüfung besteht.", options: ["weil", "damit", "ob", "als"], answer: "weil" },
  { q: "Ich weiß nicht, ___ er kommt.", options: ["dass", "ob", "als", "wenn"], answer: "ob" },
  { q: "___ ich jung war, spielte ich Fußball.", options: ["Wenn", "Ob", "Als", "Dass"], answer: "Als" },
  { q: "Er arbeitet, ___ er krank ist.", options: ["wenn", "weil", "obwohl", "dass"], answer: "obwohl" },
  { q: "Sie fragt, ___ du Zeit hast.", options: ["als", "ob", "weil", "dass"], answer: "ob" },
  { q: "Ich bin glücklich, ___ du da bist.", options: ["ob", "als", "dass", "weil"], answer: "weil" },
  { q: "___ er anruft, bin ich froh.", options: ["Als", "Ob", "Weil", "Wenn"], answer: "Wenn" },
  { q: "Er kommt nicht, ___ er keine Zeit hat.", options: ["wenn", "ob", "weil", "dass"], answer: "weil" },
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
          <p className="text-text-muted text-sm">{score >= 8 ? "Mükemmel! Subordinierende bağlaçlar hakimsin." : "Tekrar çalış, başarırsın!"}</p>
          <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="text-xs text-teal-400 underline">Yeniden Başla</button>
        </div>
      )}
    </div>
  );
}

export default function SubordinirendPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-gradient-to-br from-teal-900/40 via-navy-card to-navy border border-teal-500/20 p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 text-xs font-bold mb-3">A2–B2</div>
            <h1 className="text-3xl font-extrabold text-text-primary mb-2">Subordinierende Bağlaçlar</h1>
            <p className="text-text-muted max-w-lg">weil · dass · ob · wenn · als · obwohl — Fiili cümlenin <strong className="text-teal-300">sonuna</strong> gönderen bağlaçlar!</p>
          </div>
          <div className="text-5xl">📎</div>
        </div>
        <div className="mt-5 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20">
          <div className="flex items-center gap-2 text-teal-300 font-semibold text-sm mb-1"><Lightbulb size={15}/> Altın Kural</div>
          <p className="text-text-secondary text-sm">Subordinierende bağlaçlar <strong className="text-gold">Nebensatz</strong> (yan cümle) oluşturur. Fiil yan cümlenin <strong className="text-teal-300">en sonuna</strong> gider!</p>
        </div>
      </motion.div>

      <CollapsibleSection title="6 Temel Subordinierende Bağlaç">
        <div className="grid gap-4">
          {konjunktionen.map((k, i) => (
            <motion.div key={k.word} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
              className="rounded-xl border border-navy-border bg-navy p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className={cn("px-3 py-1 rounded-full text-sm font-bold",
                  k.color === "amber" && "bg-amber-500/15 text-amber-300",
                  k.color === "blue" && "bg-blue-500/15 text-blue-300",
                  k.color === "purple" && "bg-purple-500/15 text-purple-300",
                  k.color === "teal" && "bg-teal-500/15 text-teal-300",
                  k.color === "rose" && "bg-rose-500/15 text-rose-300",
                  k.color === "green" && "bg-green-500/15 text-green-300",
                )}>{k.word}</span>
                <span className="text-text-muted text-sm">= {k.meaning}</span>
                <span className="text-xs text-text-muted border border-navy-border rounded px-2 py-0.5 ml-auto">{k.usage}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-navy-border/30 p-3">
                  <p className="text-xs text-text-muted mb-1">Normal cümle:</p>
                  <p className="text-text-secondary">{k.normal}</p>
                  <p className="text-xs text-text-muted italic">{k.normalTr}</p>
                </div>
                <div className="rounded-lg bg-teal-500/8 border border-teal-500/20 p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-xs text-teal-400">Nebensatz ile:</p>
                    <SpeakBtn text={k.sub} />
                  </div>
                  <p className="text-text-secondary">{k.sub}</p>
                  <p className="text-xs text-text-muted italic">{k.subTr}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Fiil Sona Gider — Görsel Gösterim">
        <div className="space-y-4">
          {verbEndExamples.map((ex, i) => (
            <div key={i} className="rounded-xl border border-navy-border bg-navy p-4">
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span className="text-text-secondary">{ex.main}</span>
                <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">{ex.conj}</span>
                <span className="text-text-secondary">{ex.clause.replace(ex.highlight, "")}</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">{ex.highlight} ← {ex.note}</span>
              </div>
            </div>
          ))}
          <div className="flex items-start gap-2 bg-rose-500/8 border border-rose-500/20 rounded-xl p-3">
            <AlertTriangle size={15} className="text-rose-400 mt-0.5 shrink-0"/>
            <p className="text-sm text-text-muted">Modal fiil varsa yardımcı fiil <strong className="text-rose-300">en sona</strong> gider: <em>„..., weil er kommen <strong>muss</strong>."</em></p>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="wenn vs als — Sınavın En Büyük Tuzağı">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl border border-teal-500/30 bg-teal-500/8 p-3">
            <p className="text-teal-300 font-bold text-sm mb-1">wenn</p>
            <ul className="text-xs text-text-muted space-y-1">
              <li>• Şimdiki / gelecek şart</li>
              <li>• Tekrarlayan geçmiş olaylar</li>
              <li>= "her ne zaman"</li>
            </ul>
          </div>
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/8 p-3">
            <p className="text-rose-300 font-bold text-sm mb-1">als</p>
            <ul className="text-xs text-text-muted space-y-1">
              <li>• Geçmişte TEK bir olay</li>
              <li>• Geçmişte belirli bir dönem</li>
              <li>= "o zaman ki"</li>
            </ul>
          </div>
        </div>
        <div className="space-y-2">
          {wennVsAls.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-navy-border bg-navy p-3">
              <p className="flex-1 text-text-secondary text-sm">{item.sentence}</p>
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold shrink-0",
                item.answer === "Als" ? "bg-rose-500/15 text-rose-300" : "bg-teal-500/15 text-teal-300"
              )}>{item.answer}</span>
              <p className="text-xs text-text-muted hidden sm:block">{item.why}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <GrammarTracker topicId="a2-nebensaetze-weil-dass" level="A2" />
      <PracticeSection />
    </div>
  );
}
