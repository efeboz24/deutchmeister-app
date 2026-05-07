"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Mic, MicOff, Send, CheckCircle2, AlertCircle,
  Lightbulb, RotateCcw, Star, Loader2, Volume2,
} from "lucide-react";
import { getSprechenAufgabe, saveSprechenProgress, TYPE_LABELS } from "@/lib/sprechen-data";
import { SprechenEvalResult } from "@/app/api/sprechen/evaluate/route";

const LEVEL_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  a1: { label: "A1", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  a2: { label: "A2", color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/30" },
  b1: { label: "B1", color: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/30" },
  b2: { label: "B2", color: "text-orange-400",  bg: "bg-orange-500/10",  border: "border-orange-500/30" },
  c1: { label: "C1", color: "text-gold",        bg: "bg-gold/10",        border: "border-gold/30" },
};

type Phase = "idle" | "recording" | "recorded" | "evaluating" | "done";

function ScoreRing({ score }: { score: number }) {
  const color = score >= 70 ? "#4ade80" : score >= 50 ? "#facc15" : "#f87171";
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="96" height="96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#1e2a3a" strokeWidth="8" />
        <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <span className="text-2xl font-bold text-text-primary z-10">{score}</span>
    </div>
  );
}

export default function SprechenAufgabePage() {
  const params = useParams();
  const level = (params.level as string)?.toLowerCase();
  const id = params.id as string;

  const aufgabe = getSprechenAufgabe(id);
  const meta = LEVEL_META[level];

  const [phase, setPhase] = useState<Phase>("idle");
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [result, setResult] = useState<SprechenEvalResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
    if (!w.SpeechRecognition && !w.webkitSpeechRecognition) setSpeechSupported(false);
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startRecording = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SR) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition: any = new SR();
    recognition.lang = "de-DE";
    recognition.continuous = true;
    recognition.interimResults = true;

    let finalTranscript = transcript;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalTranscript += (finalTranscript ? " " : "") + t;
          setTranscript(finalTranscript);
          setInterimText("");
        } else {
          interim += t;
        }
      }
      if (interim) setInterimText(interim);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (e: any) => {
      if (e.error !== "no-speech") setError("Mikrofon hatası: " + e.error);
    };

    recognition.onend = () => {
      if (phase === "recording") setPhase("recorded");
    };

    recognitionRef.current = recognition;
    recognition.start();
    setPhase("recording");
    setElapsed(0);
    setError(null);

    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
  }, [transcript, phase]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    setInterimText("");
    setPhase("recorded");
  }, []);

  const evaluate = useCallback(async () => {
    if (!aufgabe || !transcript.trim()) return;
    setPhase("evaluating");
    setError(null);
    try {
      const res = await fetch("/api/sprechen/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level,
          aufgabeId: aufgabe.id,
          type: aufgabe.type,
          prompt: aufgabe.prompt,
          transcript: transcript.trim(),
          xp: aufgabe.xp,
        }),
      });
      const data = (await res.json()) as SprechenEvalResult;
      setResult(data);
      saveSprechenProgress(level, aufgabe.id, data.score, transcript.trim());
      setPhase("done");
    } catch {
      setError("Değerlendirme sırasında hata oluştu.");
      setPhase("recorded");
    }
  }, [aufgabe, level, transcript]);

  const speakPrompt = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking]);

  const reset = useCallback(() => {
    recognitionRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    window.speechSynthesis?.cancel();
    setPhase("idle");
    setTranscript("");
    setInterimText("");
    setResult(null);
    setError(null);
    setElapsed(0);
    setIsSpeaking(false);
  }, []);

  if (!aufgabe || !meta) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-text-muted">Görev bulunamadı.</p>
        <Link href={`/practice/speaking/${level}`} className="text-gold hover:underline mt-4 inline-block">Geri dön</Link>
      </div>
    );
  }

  const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
  const isLong = elapsed > aufgabe.maxSeconds;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <Link href={`/practice/speaking/${level}`} className="hover:text-text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Sprechen {meta.label}
        </Link>
        <span>/</span>
        <span className="text-text-primary">{aufgabe.title}</span>
      </div>

      {/* Task card */}
      <div className={`bg-navy-card border ${meta.border} rounded-2xl p-6`}>
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-10 h-10 ${meta.bg} rounded-xl flex items-center justify-center border ${meta.border} shrink-0`}>
            <Mic className={`w-5 h-5 ${meta.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-xs font-bold ${meta.color} uppercase tracking-wider`}>{meta.label}</span>
              <span className="text-xs text-text-muted">{TYPE_LABELS[aufgabe.type]}</span>
              <div className="flex gap-0.5">
                {[1, 2, 3].map((n) => (
                  <Star key={n} className={`w-3 h-3 ${n <= aufgabe.difficulty ? "text-gold fill-gold" : "text-navy-border"}`} />
                ))}
              </div>
            </div>
            <h1 className="text-xl font-bold text-text-primary">{aufgabe.title}</h1>
          </div>
        </div>

        <div className="bg-navy rounded-xl border border-navy-border mb-4 overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-navy-border">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Aufgabe</span>
            <button
              onClick={() => speakPrompt(aufgabe.prompt)}
              title={isSpeaking ? "Durdur" : "Sesli dinle (Almanca)"}
              className={`flex items-center gap-1.5 text-xs font-medium rounded-lg px-2.5 py-1.5 transition-all border ${
                isSpeaking
                  ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                  : "bg-navy-card border-navy-border text-text-muted hover:text-blue-400 hover:border-blue-500/40"
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? "animate-pulse" : ""}`} />
              {isSpeaking ? "Durdurmak için tıkla" : "Sesli Dinle"}
            </button>
          </div>
          <p className="text-text-primary text-sm leading-relaxed whitespace-pre-line px-4 py-3">{aufgabe.prompt}</p>
        </div>

        {/* Hints */}
        <div className="bg-gold/5 border border-gold/20 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">Redemittel</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {aufgabe.hints.map((h, i) => (
              <span key={i} className="text-xs bg-navy border border-navy-border rounded-lg px-2.5 py-1 text-text-secondary italic">{h}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Browser warning */}
      {!speechSupported && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-400">Tarayıcı desteği yok</p>
            <p className="text-xs text-text-secondary mt-0.5">Web Speech API sadece Chrome ve Edge'de çalışır. Metni aşağıya yazarak da değerlendirme alabilirsin.</p>
          </div>
        </div>
      )}

      {/* Recording area */}
      {phase !== "done" && (
        <div className="bg-navy-card border border-navy-border rounded-2xl p-6 space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {phase === "idle" || phase === "recorded" ? (
                <button
                  onClick={startRecording}
                  disabled={!speechSupported}
                  className="flex items-center gap-2 bg-purple-500 hover:bg-purple-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-5 py-2.5 transition-colors text-sm"
                >
                  <Mic className="w-4 h-4" />
                  {phase === "recorded" ? "Tekrar Kaydet" : "Kaydı Başlat"}
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-xl px-5 py-2.5 transition-colors text-sm animate-pulse"
                >
                  <MicOff className="w-4 h-4" />
                  Kaydı Durdur
                </button>
              )}
              {phase === "recording" && (
                <span className={`text-sm font-mono ${isLong ? "text-red-400" : "text-text-muted"}`}>
                  {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")} / {Math.floor(aufgabe.maxSeconds / 60)}:{String(aufgabe.maxSeconds % 60).padStart(2, "0")}
                </span>
              )}
            </div>
            {(phase === "recorded" || transcript) && (
              <button onClick={reset} className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors">
                <RotateCcw className="w-3.5 h-3.5" />
                Sıfırla
              </button>
            )}
          </div>

          {/* Transcript */}
          <div className="min-h-[100px] bg-navy border border-navy-border rounded-xl p-4">
            {transcript || interimText ? (
              <p className="text-sm text-text-primary leading-relaxed">
                {transcript}
                {interimText && <span className="text-text-muted italic"> {interimText}</span>}
              </p>
            ) : (
              <p className="text-sm text-text-muted italic">
                {phase === "recording" ? "Konuşmaya başlayın... transkripsiyon burada görünecek" : "Transkripsiyon burada görünecek"}
              </p>
            )}
          </div>

          {/* Manual edit hint */}
          {phase === "recorded" && transcript && (
            <textarea
              className="w-full bg-navy border border-navy-border rounded-xl p-3 text-sm text-text-primary resize-none focus:outline-none focus:border-purple-500/50 transition-colors"
              rows={3}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Transkripsiyonu düzenleyebilirsin..."
            />
          )}

          {/* Manual input when no speech support */}
          {!speechSupported && phase === "idle" && (
            <textarea
              className="w-full bg-navy border border-navy-border rounded-xl p-3 text-sm text-text-primary resize-none focus:outline-none focus:border-purple-500/50 transition-colors"
              rows={5}
              value={transcript}
              onChange={(e) => { setTranscript(e.target.value); if (e.target.value) setPhase("recorded"); }}
              placeholder="Almanca cevabınızı buraya yazın..."
            />
          )}

          {/* Word count + submit */}
          {(phase === "recorded" || (!speechSupported && transcript)) && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-text-muted">
                <Volume2 className="w-3.5 h-3.5" />
                {wordCount} kelime
              </div>
              <button
                onClick={evaluate}
                disabled={!transcript.trim() || wordCount < 3}
                className="flex items-center gap-2 bg-gold hover:bg-gold/90 disabled:opacity-40 disabled:cursor-not-allowed text-navy font-bold rounded-xl px-5 py-2.5 transition-colors text-sm"
              >
                <Send className="w-4 h-4" />
                Değerlendir
              </button>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
        </div>
      )}

      {/* Evaluating */}
      {phase === "evaluating" && (
        <div className="bg-navy-card border border-purple-500/30 rounded-2xl p-8 flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          <p className="text-text-secondary text-sm">Claude konuşmanızı değerlendiriyor...</p>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {phase === "done" && result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* Score */}
            <div className={`bg-navy-card border ${result.score >= 70 ? "border-green-500/40" : result.score >= 50 ? "border-yellow-500/40" : "border-red-500/40"} rounded-2xl p-6`}>
              <div className="flex items-center gap-6">
                <ScoreRing score={result.score} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className={`w-5 h-5 ${result.score >= 70 ? "text-green-400" : "text-yellow-400"}`} />
                    <span className="font-bold text-text-primary">
                      {result.score >= 70 ? "Sehr gut!" : result.score >= 50 ? "Gut!" : "Weiter üben!"}
                    </span>
                    <span className="text-gold font-bold text-sm ml-auto">+{result.earnedXP} XP</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{result.summaryTr}</p>
                </div>
              </div>
            </div>

            {/* Criteria */}
            <div className="bg-navy-card border border-navy-border rounded-2xl p-5">
              <h3 className="text-sm font-bold text-text-primary mb-4">Değerlendirme Kriterleri</h3>
              <div className="grid grid-cols-2 gap-3">
                {(Object.entries(result.criteriaScores) as [string, number][]).map(([key, val]) => {
                  const labels: Record<string, string> = { aufgabe: "Aufgabe", inhalt: "Inhalt", grammatik: "Grammatik", wortschatz: "Wortschatz" };
                  const color = val >= 70 ? "bg-green-400" : val >= 50 ? "bg-yellow-400" : "bg-red-400";
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary">{labels[key] ?? key}</span>
                        <span className="font-bold text-text-primary">{val}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-navy overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Corrections */}
            {result.corrections.length > 0 && (
              <div className="bg-navy-card border border-navy-border rounded-2xl p-5">
                <h3 className="text-sm font-bold text-text-primary mb-3">Düzeltmeler</h3>
                <div className="space-y-3">
                  {result.corrections.map((c, i) => (
                    <div key={i} className="bg-navy rounded-xl p-3 space-y-1">
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-red-400 line-through shrink-0">{c.original}</span>
                        <span className="text-text-muted">→</span>
                        <span className="text-green-400 font-medium">{c.corrected}</span>
                      </div>
                      <p className="text-xs text-text-muted">{c.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transcript used */}
            <div className="bg-navy-card border border-navy-border rounded-2xl p-5">
              <h3 className="text-sm font-bold text-text-primary mb-2">Konuşmanız (transkripsiyon)</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{transcript}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex items-center gap-2 bg-navy-card border border-navy-border hover:border-purple-500/40 text-text-primary font-semibold rounded-xl px-5 py-2.5 transition-colors text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Tekrar Dene
              </button>
              <Link
                href={`/practice/speaking/${level}`}
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-xl px-5 py-2.5 transition-colors text-sm"
              >
                Listeye Dön
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
