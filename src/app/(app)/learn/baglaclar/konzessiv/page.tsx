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

const konzessiv = [
  {
    word: "obwohl",
    type: "Nebensatz bağlacı",
    meaning: "-e rağmen / her ne kadar",
    color: "amber",
    rule: "Fiil yan cümlenin SONUNA gider",
    example: "Er arbeitet, obwohl er krank ist.",
    translation: "Hasta olmasına rağmen çalışıyor.",
    tip: "obwohl → Nebensatz → fiil sona!",
  },
  {
    word: "trotzdem",
    type: "Konjunktionaladverb",
    meaning: "yine de / buna rağmen",
    color: "teal",
    rule: "Fiil 2. pozisyonda kalır. Cümle başında fiil+özne yer değiştirir!",
    example: "Er ist krank. Trotzdem arbeitet er.",
    translation: "Hasta. Yine de çalışıyor.",
    tip: "trotzdem → Hauptsatz → cümle başına gelince fiil önce!",
  },
  {
    word: "wenn",
    type: "Nebensatz bağlacı",
    meaning: "eğer / -se/-sa (şart)",
    color: "blue",
    rule: "Fiil yan cümlenin SONUNA gider",
    example: "Wenn es regnet, nimmst du einen Schirm.",
    translation: "Yağmur yağarsa şemsiye alırsın.",
    tip: "Şart cümlesi: wenn + Nebensatz → Hauptsatz",
  },
  {
    word: "falls",
    type: "Nebensatz bağlacı",
    meaning: "eğer / -diği takdirde (olasılık)",
    color: "purple",
    rule: "Fiil yan cümlenin SONUNA gider",
    example: "Falls du kommst, sage mir Bescheid.",
    translation: "Gelirsen bana haber ver.",
    tip: "falls = wenn'den daha belirsiz, düşük ihtimal",
  },
  {
    word: "damit",
    type: "Nebensatz bağlacı (final)",
    meaning: "böylece / -mesi için",
    color: "rose",
    rule: "Fiil yan cümlenin SONUNA gider. Amaç bildirir!",
    example: "Er lernt viel, damit er die Prüfung besteht.",
    translation: "Sınavı geçmesi için çok çalışıyor.",
    tip: "damit = amaç. Özne farklıysa damit, aynıysa um…zu kullan!",
  },
  {
    word: "sodass",
    type: "Nebensatz bağlacı (konsekutiv)",
    meaning: "öyle ki / bu yüzden",
    color: "green",
    rule: "Fiil yan cümlenin SONUNA gider. Sonuç bildirir!",
    example: "Er spricht so laut, sodass alle ihn hören.",
    translation: "Öyle yüksek sesle konuşuyor ki herkes duyuyor.",
    tip: "sodass = sonuç. so + Adjektiv, sodass + Nebensatz kalıbıyla gelir.",
  },
];

const obwohlVsTrotzdem = [
  { s: "Er ist müde. ___ geht er ins Kino.", answer: "Trotzdem", why: "İki ayrı Hauptsatz" },
  { s: "Er geht ins Kino, ___ er müde ist.", answer: "obwohl", why: "Nebensatz gerekiyor" },
  { s: "Sie hat kein Geld. ___ kauft sie ein.", answer: "Trotzdem", why: "Hauptsatz + Hauptsatz" },
  { s: "Sie kauft ein, ___ sie kein Geld hat.", answer: "obwohl", why: "Fiil sona gidiyor" },
];

const damitVsUmZu = [
  { s: "Er lernt, ___ er die Prüfung besteht.", hint: "Özneler farklı", answer: "damit" },
  { s: "Er lernt, ___ die Prüfung zu bestehen.", hint: "Özneler aynı", answer: "um … zu" },
  { s: "Sie spart, ___ sie ein Auto kaufen kann.", hint: "Modal fiil var → damit", answer: "damit" },
  { s: "Sie spart, ___ ein Auto zu kaufen.", hint: "Özneler aynı, modal yok", answer: "um … zu" },
];

const questions = [
  { q: "Er ist krank, ___ er arbeitet weiter.", options: ["trotzdem", "obwohl", "damit", "falls"], answer: "obwohl" },
  { q: "Sie ist müde. ___ lernt sie noch.", options: ["Obwohl", "Trotzdem", "Damit", "Sodass"], answer: "Trotzdem" },
  { q: "Er lernt viel, ___ er die Prüfung besteht.", options: ["sodass", "obwohl", "damit", "falls"], answer: "damit" },
  { q: "___ du Zeit hast, komm bitte vorbei.", options: ["Obwohl", "Trotzdem", "Falls", "Damit"], answer: "Falls" },
  { q: "Er spricht so laut, ___ alle ihn hören.", options: ["obwohl", "damit", "sodass", "falls"], answer: "sodass" },
  { q: "Sie kommt nicht, ___ sie eingeladen ist.", options: ["trotzdem", "damit", "falls", "obwohl"], answer: "obwohl" },
  { q: "Er spart Geld, ___ er reisen kann.", options: ["obwohl", "sodass", "damit", "trotzdem"], answer: "damit" },
  { q: "Das Wetter ist schlecht. ___ gehen wir spazieren.", options: ["Obwohl", "Trotzdem", "Falls", "Damit"], answer: "Trotzdem" },
  { q: "___ es kalt ist, zieh eine Jacke an.", options: ["Obwohl", "Sodass", "Falls", "Trotzdem"], answer: "Falls" },
  { q: "Er hat so viel gegessen, ___ er krank wurde.", options: ["damit", "obwohl", "falls", "sodass"], answer: "sodass" },
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
          <p className="text-text-muted text-sm">{score >= 8 ? "Bravo! Konzessive bağlaçlar artık senin için kolay." : "Devam et, yakında hakimsin!"}</p>
          <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="text-xs text-teal-400 underline">Yeniden Başla</button>
        </div>
      )}
    </div>
  );
}

export default function KonzessivPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-gradient-to-br from-teal-900/40 via-navy-card to-navy border border-teal-500/20 p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 text-xs font-bold mb-3">B1–B2</div>
            <h1 className="text-3xl font-extrabold text-text-primary mb-2">Konzessiv & Konditional</h1>
            <p className="text-text-muted max-w-lg">obwohl · trotzdem · wenn · falls · damit · sodass — Zıtlık, şart ve amaç bağlaçları!</p>
          </div>
          <div className="text-5xl">🌀</div>
        </div>
        <div className="mt-5 p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20">
          <div className="flex items-center gap-2 text-teal-300 font-semibold text-sm mb-1"><Lightbulb size={15}/> Altın Kural</div>
          <p className="text-text-secondary text-sm"><strong className="text-gold">obwohl</strong> → Nebensatz (fiil sona) | <strong className="text-teal-300">trotzdem</strong> → Hauptsatz (cümle başında fiil+özne yer değiştirir)</p>
        </div>
      </motion.div>

      <CollapsibleSection title="6 Temel Bağlaç">
        <div className="grid gap-4">
          {konzessiv.map((k, i) => (
            <motion.div key={k.word} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
              className="rounded-xl border border-navy-border bg-navy p-4">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={cn("px-3 py-1 rounded-full text-sm font-bold",
                  k.color === "amber" && "bg-amber-500/15 text-amber-300",
                  k.color === "teal" && "bg-teal-500/15 text-teal-300",
                  k.color === "blue" && "bg-blue-500/15 text-blue-300",
                  k.color === "purple" && "bg-purple-500/15 text-purple-300",
                  k.color === "rose" && "bg-rose-500/15 text-rose-300",
                  k.color === "green" && "bg-green-500/15 text-green-300",
                )}>{k.word}</span>
                <span className="text-text-muted text-xs">= {k.meaning}</span>
                <span className="ml-auto text-xs border border-navy-border rounded px-2 py-0.5 text-text-muted">{k.type}</span>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <p className="text-text-primary text-sm">{k.example}</p>
                <SpeakBtn text={k.example} />
              </div>
              <p className="text-text-muted text-xs italic mb-2">{k.translation}</p>
              <div className="flex items-start gap-2 bg-teal-500/8 border border-teal-500/15 rounded-lg p-2">
                <Lightbulb size={12} className="text-teal-400 mt-0.5 shrink-0"/>
                <p className="text-xs text-text-muted">{k.tip}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="obwohl vs trotzdem — Sınavın En Önemli Farkı">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/8 p-3">
            <p className="text-amber-300 font-bold text-sm mb-1">obwohl</p>
            <ul className="text-xs text-text-muted space-y-1">
              <li>• Nebensatz bağlacı</li>
              <li>• Fiil EN SONA gider</li>
              <li>• „, obwohl er … <strong>ist</strong>."</li>
            </ul>
          </div>
          <div className="rounded-xl border border-teal-500/30 bg-teal-500/8 p-3">
            <p className="text-teal-300 font-bold text-sm mb-1">trotzdem</p>
            <ul className="text-xs text-text-muted space-y-1">
              <li>• Konjunktionaladverb</li>
              <li>• Fiil 2. pozisyonda</li>
              <li>• „Trotzdem <strong>arbeitet er</strong>."</li>
            </ul>
          </div>
        </div>
        <div className="space-y-2">
          {obwohlVsTrotzdem.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-navy-border bg-navy p-3">
              <p className="flex-1 text-text-secondary text-sm">{item.s}</p>
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold shrink-0",
                item.answer === "obwohl" ? "bg-amber-500/15 text-amber-300" : "bg-teal-500/15 text-teal-300"
              )}>{item.answer}</span>
              <p className="text-xs text-text-muted hidden sm:block">{item.why}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="damit vs um…zu — Amaç Cümleleri">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/8 p-3">
            <p className="text-rose-300 font-bold text-sm mb-1">damit</p>
            <ul className="text-xs text-text-muted space-y-1">
              <li>• Özneler <strong>farklı</strong></li>
              <li>• Modal fiil varsa damit kullan</li>
              <li>• Fiil sona gider</li>
            </ul>
          </div>
          <div className="rounded-xl border border-purple-500/30 bg-purple-500/8 p-3">
            <p className="text-purple-300 font-bold text-sm mb-1">um … zu</p>
            <ul className="text-xs text-text-muted space-y-1">
              <li>• Özneler <strong>aynı</strong></li>
              <li>• Infinitiv kullanılır</li>
              <li>• Daha kısa ve doğal</li>
            </ul>
          </div>
        </div>
        <div className="space-y-2">
          {damitVsUmZu.map((item, i) => (
            <div key={i} className="rounded-lg border border-navy-border bg-navy p-3">
              <p className="text-text-secondary text-sm mb-1">{item.s}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">{item.hint}</span>
                <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold",
                  item.answer === "damit" ? "bg-rose-500/15 text-rose-300" : "bg-purple-500/15 text-purple-300"
                )}>{item.answer}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 bg-amber-500/8 border border-amber-500/20 rounded-xl p-3">
          <AlertTriangle size={14} className="text-amber-400 mt-0.5 shrink-0"/>
          <p className="text-sm text-text-muted">Özneler aynı ise <strong className="text-amber-300">um…zu</strong> tercih edilir ama damit da hatalı sayılmaz. Sınavda damit her zaman güvenli seçenek!</p>
        </div>
      </CollapsibleSection>

      <GrammarTracker topicId="konzessiv" level="B1" />
      <PracticeSection />
    </div>
  );
}
