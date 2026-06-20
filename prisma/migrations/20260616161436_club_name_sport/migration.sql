/*
  Warnings:

  - A unique constraint covering the columns `[assignmentId,name,sport]` on the table `clubs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "clubs_assignmentId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "clubs_assignmentId_name_sport_key" ON "clubs"("assignmentId", "name", "sport");
