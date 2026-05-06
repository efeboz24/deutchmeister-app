-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserVocabulary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "vocabularyId" TEXT NOT NULL,
    "confidenceLevel" REAL NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "nextReviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewedAt" DATETIME,
    "learned" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "UserVocabulary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserVocabulary_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "Vocabulary" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserVocabulary" ("confidenceLevel", "id", "interval", "lastReviewedAt", "nextReviewDate", "repetitions", "userId", "vocabularyId") SELECT "confidenceLevel", "id", "interval", "lastReviewedAt", "nextReviewDate", "repetitions", "userId", "vocabularyId" FROM "UserVocabulary";
DROP TABLE "UserVocabulary";
ALTER TABLE "new_UserVocabulary" RENAME TO "UserVocabulary";
CREATE UNIQUE INDEX "UserVocabulary_userId_vocabularyId_key" ON "UserVocabulary"("userId", "vocabularyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
