export type Skill = "horen" | "lesen" | "schreiben" | "sprechen" | "grammatik";
export type Level = "A1" | "A2" | "B1" | "B2" | "C1";
export type UserRole = "student" | "admin";
export type ContentType = "read" | "listen" | "quiz" | "write";

export interface SkillScore {
  skill: Skill;
  score: number;
}

export interface DashboardStats {
  currentLevel: Level;
  totalXP: number;
  totalHours: number;
  examCount: number;
  streak: number;
}

export interface WeeklySession {
  date: Date | string;
  minutesWorked: number;
}

export interface ExamResult {
  id: string;
  examName: string;
  score: number;
  passed: boolean;
  attemptDate: Date | string;
}

export interface VocabularyCard {
  id: string;
  word: string;
  meaning: string;
  exampleSentence: string;
  partOfSpeech: string;
  levelName: string;
  nextReviewDate: Date;
  confidenceLevel: number;
  interval: number;
  repetitions: number;
  userVocabId: string;
}

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "fill-blank" | "listening" | "writing";
  text: string;
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
}
