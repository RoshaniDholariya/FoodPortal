/*
  Warnings:

  - Added the required column `donorId` to the `Ngoconnect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ngoconnect" ADD COLUMN     "donorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Ngoconnect" ADD CONSTRAINT "Ngoconnect_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
