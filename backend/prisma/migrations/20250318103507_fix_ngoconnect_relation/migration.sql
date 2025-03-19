/*
  Warnings:

  - You are about to drop the column `time` on the `Ngoconnect` table. All the data in the column will be lost.
  - Added the required column `Date` to the `Ngoconnect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ngoconnect" DROP COLUMN "time",
ADD COLUMN     "Date" TIMESTAMP(3) NOT NULL;
