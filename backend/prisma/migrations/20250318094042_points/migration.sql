/*
  Warnings:

  - Made the column `totalPoints` on table `Donor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "totalPoints" SET NOT NULL,
ALTER COLUMN "totalPoints" SET DEFAULT 0,
ALTER COLUMN "certificatesEarned" SET DEFAULT 0;
