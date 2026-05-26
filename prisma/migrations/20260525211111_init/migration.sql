-- CreateEnum
CREATE TYPE "SportType" AS ENUM ('FOOTBALL', 'FUTSAL', 'BASKETBALL', 'VOLLEYBALL', 'SWIMMING', 'TENNIS', 'ATHLETICS', 'RUGBY', 'BOXING', 'WRESTLING', 'HOCKEY', 'BASEBALL', 'GOLF', 'CYCLING', 'MARTIAL_ARTS', 'AMERICAN_FOOTBALL');

-- CreateEnum
CREATE TYPE "ClubStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateTable
CREATE TABLE "clubs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "sport" "SportType" NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "status" "ClubStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "clubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club_events" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "club_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sport_levels" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "levelOrder" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sport_levels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "clubs_sport_idx" ON "clubs"("sport");

-- CreateIndex
CREATE INDEX "clubs_assignmentId_idx" ON "clubs"("assignmentId");

-- CreateIndex
CREATE INDEX "clubs_status_idx" ON "clubs"("status");

-- CreateIndex
CREATE INDEX "clubs_available_idx" ON "clubs"("available");

-- CreateIndex
CREATE UNIQUE INDEX "clubs_assignmentId_name_key" ON "clubs"("assignmentId", "name");

-- CreateIndex
CREATE INDEX "club_events_eventId_idx" ON "club_events"("eventId");

-- CreateIndex
CREATE INDEX "club_events_available_idx" ON "club_events"("available");

-- CreateIndex
CREATE UNIQUE INDEX "club_events_eventId_clubId_key" ON "club_events"("eventId", "clubId");

-- CreateIndex
CREATE INDEX "sport_levels_clubId_idx" ON "sport_levels"("clubId");

-- CreateIndex
CREATE INDEX "sport_levels_available_idx" ON "sport_levels"("available");

-- CreateIndex
CREATE UNIQUE INDEX "sport_levels_clubId_levelOrder_key" ON "sport_levels"("clubId", "levelOrder");

-- AddForeignKey
ALTER TABLE "club_events" ADD CONSTRAINT "club_events_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sport_levels" ADD CONSTRAINT "sport_levels_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
