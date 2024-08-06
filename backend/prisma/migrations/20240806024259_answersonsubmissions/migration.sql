/*
  Warnings:

  - You are about to drop the column `submissionId` on the `Answer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_submissionId_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "submissionId";

-- CreateTable
CREATE TABLE "AnswersOnSubmissions" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,

    CONSTRAINT "AnswersOnSubmissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnswersOnSubmissions" ADD CONSTRAINT "AnswersOnSubmissions_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswersOnSubmissions" ADD CONSTRAINT "AnswersOnSubmissions_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
