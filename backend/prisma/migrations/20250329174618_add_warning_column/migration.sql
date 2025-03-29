/*
  Warnings:

  - You are about to drop the column `status` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `warning` on the `Donor` table. All the data in the column will be lost.
  - You are about to drop the column `report` on the `NGO` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "status",
DROP COLUMN "warning";

-- AlterTable
ALTER TABLE "NGO" DROP COLUMN "report";
