/*
  Warnings:

  - You are about to drop the column `city` on the `FoodDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FoodDetails" DROP COLUMN "city",
ADD COLUMN     "City" TEXT;
