-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "currentLevel" TEXT NOT NULL DEFAULT 'A1',
    "streak" INTEGER NOT NULL DEFAULT 0,
    "totalXP" INTEGER NOT NULL DEFAULT 0,
    "role" TEXT NOT NULL DEFAULT 'student',
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "studyHoursPerDay" INTEGER NOT NULL DEFAULT 1,
    "targetLevel" TEXT NOT NULL DEFAULT 'B1',
    "weakSkills" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "currentLevel", "email", "id", "name", "password", "role", "streak", "totalXP", "updatedAt") SELECT "createdAt", "currentLevel", "email", "id", "name", "password", "role", "streak", "totalXP", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
