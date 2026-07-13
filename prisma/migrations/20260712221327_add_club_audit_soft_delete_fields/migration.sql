/*
  Warnings:

  - You are about to drop the column `available` on the `clubs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "clubs_available_idx";

-- AlterTable
ALTER TABLE "clubs" DROP COLUMN "available",
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedBy" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- CreateIndex
CREATE INDEX "clubs_assignmentId_status_idx" ON "clubs"("assignmentId", "status");

-- CreateIndex
CREATE INDEX "clubs_deletedAt_idx" ON "clubs"("deletedAt");
