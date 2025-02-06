/*
  Warnings:

  - Added the required column `address` to the `FoodDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodDetails" ADD COLUMN     "address" TEXT NOT NULL;
