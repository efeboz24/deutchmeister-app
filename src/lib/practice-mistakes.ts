export type PracticeMistakeEntry = {
  key: string;
  topicId: string;
  topicTitle: string;
  levelName: string;
  question: string;
  options: string[];
  correct: number;
  userAnswer: number;
  explanation: string;
  addedAt: number;
};

export function savePracticeMistakes(entries: Omit<PracticeMistakeEntry, "key" | "addedAt">[]) {
  if (entries.length === 0) return;

  let existing: PracticeMistakeEntry[] = [];
  try {
    const raw = localStorage.getItem("grammar-mistakes");
    if (raw) existing = JSON.parse(raw);
  } catch {
    existing = [];
  }

  const now = Date.now();
  const newEntries: PracticeMistakeEntry[] = entries.map((e, i) => ({
    ...e,
    key: `${e.topicId}-q${i}-${now}`,
    addedAt: now,
  }));

  // Deduplicate: remove same topicId+question combos from existing
  const filtered = existing.filter(
    (ex) => !entries.some((ne) => ne.topicId === ex.topicId && ne.question === ex.question)
  );

  const updated = [...filtered, ...newEntries];
  const json = JSON.stringify(updated);

  localStorage.setItem("grammar-mistakes", json);

  fetch("/api/mistakes", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: json }),
  }).catch(() => {});
}
