"use client";

import { useState, useCallback } from "react";
import {
  CheckCircle, RefreshCw, ChevronRight, BookOpen,
  Volume2, Layers, ListChecks, XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { saveProgress } from "@/lib/saveProgress";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function speakGerman(text: string, e?: React.MouseEvent) {
  e?.stopPropagation();
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.rate = 0.85;
  window.speechSynthesis.speak(utter);
}

interface CardData {
  id: string;
  vocabulary: {
    word: string;
    meaning: string;
    exampleSentence: string;
    partOfSpeech: string;
    level: { name: string };
  };
}

interface FlashcardSessionProps {
  initialCards: CardData[];
  levelFilter: string;
  initialLearnedCount: number;
  totalInLevel: number;
  totalInDB: number;
  dueCount: number;
}

type Mode = "flashcard" | "quiz";

function buildQuizOptions(cards: CardData[], currentIdx: number): string[] {
  const correct = cards[currentIdx].vocabulary.meaning;
  const pool = cards
    .filter((_, i) => i !== currentIdx)
    .map((c) => c.vocabulary.meaning)
    .filter((m) => m !== correct);

  // shuffle pool
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const options = [correct, ...pool.slice(0, 3)];
  // shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

export function FlashcardSession({
  initialCards,
  levelFilter,
  initialLearnedCount,
  totalInLevel,
  totalInDB,
  dueCount,
}: FlashcardSessionProps) {
  const router = useRouter();
  const { update } = useSession();

  const [cards] = useState<CardData[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [learnedCount, setLearnedCount] = useState(initialLearnedCount);

  // Mode
  const [mode, setMode] = useState<Mode>("flashcard");

  // Quiz state
  const [quizOptions, setQuizOptions] = useState<string[]>(() =>
    cards.length > 0 ? buildQuizOptions(cards, 0) : []
  );
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);

  const currentCard = cards[currentIndex];
  const total = cards.length;
  const progress = total > 0 ? (doneCount / total) * 100 : 0;
  const levelLabel = levelFilter === "all" ? "Tüm Seviyeler" : levelFilter;

  const advance = useCallback(
    (nextIndex: number, currentMode: Mode) => {
      setDoneCount((d) => d + 1);
      if (nextIndex >= cards.length) {
        setSessionDone(true);
      } else {
        setCurrentIndex(nextIndex);
        if (currentMode === "quiz") {
          setQuizOptions(buildQuizOptions(cards, nextIndex));
          setQuizSelected(null);
          setQuizCorrect(null);
        }
      }
      setIsFlipped(false);
      setIsAnimating(false);
      setIsSubmitting(false);
    },
    [cards]
  );

  const submitReview = useCallback(
    async (quality: 0 | 1 | 2 | 3 | 4 | 5, currentMode: Mode) => {
      if (isSubmitting || !currentCard) return;
      setIsSubmitting(true);

      if (quality >= 4) setLearnedCount((c) => c + 1);

      try {
        await fetch("/api/vocabulary/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userVocabularyId: currentCard.id, quality }),
        });
        await saveProgress({
          xp: quality >= 4 ? 15 : 5,
          skill: "horen",
          skillScore: quality * 20,
          minutes: 2,
        });
        if (quality >= 4) {
          toast.success(`"${currentCard.vocabulary.word}" öğrenildi! +15 XP`);
        }
        update();
      } catch {
        toast.error("Kart kaydedilemedi");
      }

      setIsAnimating(true);
      const delay = currentMode === "quiz" ? 1000 : 350;
      setTimeout(() => advance(currentIndex + 1, currentMode), delay);
    },
    [isSubmitting, currentCard, currentIndex, advance, update]
  );

  const flip = useCallback(() => {
    if (isAnimating || isSubmitting) return;
    setIsFlipped((p) => !p);
  }, [isAnimating, isSubmitting]);

  const handleQuizAnswer = useCallback(
    (option: string) => {
      if (quizSelected || isSubmitting) return;
      const correct = currentCard.vocabulary.meaning;
      const isCorrect = option === correct;
      setQuizSelected(option);
      setQuizCorrect(isCorrect);
      submitReview(isCorrect ? 4 : 1, "quiz");
    },
    [quizSelected, isSubmitting, currentCard, submitReview]
  );

  const switchMode = (next: Mode) => {
    if (isSubmitting) return;
    setMode(next);
    setIsFlipped(false);
    if (next === "quiz" && cards.length > 0) {
      setQuizOptions(buildQuizOptions(cards, currentIndex));
      setQuizSelected(null);
      setQuizCorrect(null);
    }
  };

  const StatsRow = () => (
    <div className="grid grid-cols-2 gap-3 mb-2">
      <div className="bg-navy-card border border-navy-border rounded-xl p-3 text-center">
        <p className="text-lg font-bold text-gold">{dueCount}</p>
        <p className="text-xs text-text-muted mt-0.5">bugün tekrar edilecek</p>
      </div>
      <button
        onClick={() => router.push("/vocabulary/learned")}
        className="bg-navy-card border border-navy-border rounded-xl p-3 text-center hover:border-gold/40 transition-colors"
      >
        <p className="text-lg font-bold text-emerald-400">{learnedCount}</p>
        <p className="text-xs text-text-muted mt-0.5">toplam öğrenilen</p>
      </button>
      <div className="bg-navy-card border border-navy-border rounded-xl p-3 text-center">
        <p className="text-lg font-bold text-text-primary">{totalInDB}</p>
        <p className="text-xs text-text-muted mt-0.5">toplam kelime</p>
      </div>
      <div className="bg-navy-card border border-navy-border rounded-xl p-3 text-center">
        <p className="text-lg font-bold text-blue-400">{totalInLevel}</p>
        <p className="text-xs text-text-muted mt-0.5">{levelLabel} kelimesi</p>
      </div>
    </div>
  );

  if (cards.length === 0) {
    return (
      <div className="space-y-4">
        <StatsRow />
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-gold" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Bugün tamamlandı!</h2>
          <p className="text-text-secondary mb-1">Vadesi gelen kart bulunmuyor.</p>
          <p className="text-text-muted text-sm mb-8">SM-2 algoritması bir sonraki tekrar tarihini ayarladı.</p>
          <Button onClick={() => window.location.reload()}>Tekrar Kontrol Et</Button>
        </div>
      </div>
    );
  }

  if (sessionDone) {
    return (
      <div className="space-y-4">
        <StatsRow />
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-gold" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Harika iş!</h2>
          <p className="text-text-secondary mb-1">Bugünkü {doneCount} kartı tamamladın.</p>
          <p className="text-text-muted text-sm mb-8">SM-2 algoritması bir sonraki tekrar tarihini hesapladı.</p>
          <Button onClick={() => window.location.reload()}>Tekrar Kontrol Et</Button>
        </div>
      </div>
    );
  }

  const card = currentCard.vocabulary;

  return (
    <div className="flex flex-col gap-4 w-full">
      <StatsRow />

      {/* Mode toggle */}
      <div className="flex gap-1 p-1 bg-navy-card border border-navy-border rounded-xl">
        <button
          onClick={() => switchMode("flashcard")}
          disabled={isSubmitting}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200",
            mode === "flashcard"
              ? "bg-gold text-navy shadow-sm"
              : "text-text-secondary hover:text-text-primary hover:bg-navy-light"
          )}
        >
          <Layers className="w-3.5 h-3.5" />
          Flashcard
        </button>
        <button
          onClick={() => switchMode("quiz")}
          disabled={isSubmitting}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200",
            mode === "quiz"
              ? "bg-gold text-navy shadow-sm"
              : "text-text-secondary hover:text-text-primary hover:bg-navy-light"
          )}
        >
          <ListChecks className="w-3.5 h-3.5" />
          Quiz
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full">
        <div className="flex justify-between text-xs text-text-muted mb-1.5">
          <span>{doneCount} / {total} kart</span>
          <span>{levelLabel}</span>
        </div>
        <div className="h-1.5 bg-navy-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ── FLASHCARD MODE ── */}
      {mode === "flashcard" && (
        <>
          <div
            className="w-full cursor-pointer select-none"
            style={{ perspective: "1200px" }}
            onClick={flip}
          >
            <div
              className="relative w-full transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                minHeight: "260px",
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 bg-navy-card border border-navy-border rounded-2xl p-8 flex flex-col items-center justify-center gap-4"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="flex items-center gap-2">
                  <Badge variant="level">{card.level.name}</Badge>
                  {card.partOfSpeech && <Badge>{card.partOfSpeech}</Badge>}
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-bold text-text-primary tracking-wide">{card.word}</h2>
                  <button
                    onClick={(e) => speakGerman(card.word, e)}
                    className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors flex-shrink-0"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-text-muted text-sm flex items-center gap-1.5 mt-2">
                  <ChevronRight className="w-4 h-4" />
                  Görmek için kartı çevir
                </p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 bg-navy-card border border-gold/30 rounded-2xl p-8 flex flex-col items-center justify-center gap-4"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="flex items-center gap-2">
                  <Badge variant="level">{card.level.name}</Badge>
                  {card.partOfSpeech && <Badge>{card.partOfSpeech}</Badge>}
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-bold text-gold">{card.word}</h2>
                  <button
                    onClick={(e) => speakGerman(card.word, e)}
                    className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors flex-shrink-0"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xl text-text-primary font-medium">{card.meaning}</p>
                {card.exampleSentence && (
                  <p className="text-sm text-text-secondary italic text-center mt-1 px-4 border-t border-navy-border pt-4 w-full">
                    „{card.exampleSentence}"
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            className="w-full grid grid-cols-2 gap-3 transition-opacity duration-300"
            style={{ opacity: isFlipped ? 1 : 0, pointerEvents: isFlipped ? "auto" : "none" }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); submitReview(1, "flashcard"); }}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-400 font-semibold hover:bg-blue-500/20 transition-colors disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4" />
              Tekrar Gerekli
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); submitReview(4, "flashcard"); }}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-semibold hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              Biliyorum
            </button>
          </div>

          {!isFlipped && (
            <p className="text-text-muted text-xs flex items-center gap-1 justify-center">
              <BookOpen className="w-3.5 h-3.5" />
              Kartı çevirdikten sonra değerlendirme butonları belirir
            </p>
          )}
        </>
      )}

      {/* ── QUIZ MODE ── */}
      {mode === "quiz" && (
        <>
          {/* Question card */}
          <div
            className="bg-navy-card border border-navy-border rounded-2xl p-8 flex flex-col items-center gap-4"
            style={{ minHeight: "200px", justifyContent: "center" }}
          >
            <div className="flex items-center gap-2">
              <Badge variant="level">{card.level.name}</Badge>
              {card.partOfSpeech && <Badge>{card.partOfSpeech}</Badge>}
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-bold text-text-primary tracking-wide">{card.word}</h2>
              <button
                onClick={(e) => speakGerman(card.word, e)}
                className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors flex-shrink-0"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-text-muted text-sm">Bu kelimenin Türkçe anlamı nedir?</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2">
            {quizOptions.map((option, i) => {
              const isCorrectOption = option === card.meaning;
              const isSelected = option === quizSelected;
              let cls =
                "border-navy-border text-text-secondary hover:border-gold/40 hover:text-text-primary";
              if (quizSelected) {
                if (isCorrectOption)
                  cls = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                else if (isSelected)
                  cls = "border-red-500/50 bg-red-500/10 text-red-300";
                else cls = "border-navy-border text-text-muted opacity-40";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleQuizAnswer(option)}
                  disabled={!!quizSelected}
                  className={cn(
                    "flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150",
                    cls
                  )}
                >
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {quizSelected && isCorrectOption && (
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  )}
                  {quizSelected && isSelected && !isCorrectOption && (
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {quizSelected && (
            <div
              className={cn(
                "px-4 py-3 rounded-xl text-sm flex items-center gap-2 border",
                quizCorrect
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-red-500/10 border-red-500/30 text-red-300"
              )}
            >
              {quizCorrect ? (
                <>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  Doğru! Sonraki karta geçiliyor...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 flex-shrink-0" />
                  Yanlış — doğru cevap:{" "}
                  <strong className="text-emerald-300">{card.meaning}</strong>
                </>
              )}
            </div>
          )}

          {quizSelected && card.exampleSentence && (
            <p className="text-xs text-text-muted italic text-center px-4">
              „{card.exampleSentence}"
            </p>
          )}
        </>
      )}
    </div>
  );
}
