/*
  Warnings:

  - Added the required column `city` to the `FoodDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodDetails" ADD COLUMN     "city" TEXT NOT NULL;
