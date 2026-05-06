"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface WritingInputProps {
  questionId: string;
  currentValue: string;
  teil: number;
  onSave: (text: string) => void;
  onNext: () => void;
}

export default function WritingInput({ questionId, currentValue, teil, onSave, onNext }: WritingInputProps) {
  const [localValue, setLocalValue] = useState(currentValue);
  const isLong = teil >= 2;

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setLocalValue(e.target.value);
    onSave(e.target.value);
  }

  function handleNext() {
    onSave(localValue);
    onNext();
  }

  return (
    <div className="space-y-3" key={questionId}>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-emerald-400/70 uppercase tracking-wide">
            {isLong ? "Cevabınızı yazın" : "Cevabı yazın"}
          </p>
          {isLong && (
            <p className="text-xs text-text-muted">En az 3-4 kelime</p>
          )}
        </div>
        <textarea
          value={localValue}
          onChange={handleChange}
          placeholder={isLong ? "Almanca cevabınızı buraya yazın..." : "Cevabınızı buraya yazın..."}
          className={`w-full bg-navy border border-navy-border rounded-xl p-3 text-text-primary text-sm resize-none focus:border-emerald-400/40 focus:outline-none transition-colors placeholder:text-text-muted ${
            isLong ? "min-h-[140px]" : "min-h-[72px]"
          }`}
          autoFocus
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleNext}
          disabled={!localValue.trim()}
          className="flex-1 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold text-sm hover:bg-emerald-500/25 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Kaydet ve Devam Et <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            onSave("");
            onNext();
          }}
          className="px-4 py-3 rounded-xl border border-navy-border text-text-muted text-sm hover:text-text-secondary hover:border-gold/20 transition-colors"
        >
          Atla
        </button>
      </div>
    </div>
  );
}
