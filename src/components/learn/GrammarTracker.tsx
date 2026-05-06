"use client";

import { useEffect, useRef } from "react";

/**
 * Renders nothing. Listens for the "grammar-exercise-complete" custom window
 * event (dispatched by PracticeSection / inline quiz components) and marks the
 * specified grammar topic as completed in UserGrammarProgress — once per mount.
 */
export function GrammarTracker({ topicId, level }: { topicId: string; level: string }) {
  const doneRef = useRef(false);

  useEffect(() => {
    function handler() {
      if (doneRef.current) return;
      doneRef.current = true;
      fetch("/api/grammar-progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, topicId, completed: true }),
      });
    }
    window.addEventListener("grammar-exercise-complete", handler);
    return () => window.removeEventListener("grammar-exercise-complete", handler);
  }, [topicId, level]);

  return null;
}
