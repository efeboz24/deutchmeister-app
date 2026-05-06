/**
 * SM-2 Spaced Repetition Algoritması
 * quality: 0-5 (0=tamamen unutuldu, 5=mükemmel hatırlama)
 */
export function calculateNextReview(
  quality: 0 | 1 | 2 | 3 | 4 | 5,
  confidenceLevel: number,
  interval: number,
  repetitions: number
): { newInterval: number; newConfidenceLevel: number; nextReviewDate: Date; newRepetitions: number } {
  let newInterval: number;
  let newConfidenceLevel = confidenceLevel;
  let newRepetitions = repetitions;

  if (quality < 3) {
    // Yanlış cevap - baştan başla
    newRepetitions = 0;
    newInterval = 1;
  } else {
    // Doğru cevap
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * confidenceLevel);
    }
    newRepetitions = repetitions + 1;
  }

  // SM-2 easiness factor güncelleme
  newConfidenceLevel =
    confidenceLevel + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newConfidenceLevel < 1.3) newConfidenceLevel = 1.3;
  if (newConfidenceLevel > 2.5) newConfidenceLevel = 2.5;

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return { newInterval, newConfidenceLevel, nextReviewDate, newRepetitions };
}
