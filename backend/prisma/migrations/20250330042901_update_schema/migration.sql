-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "disabledUntil" TIMESTAMP(3),
ADD COLUMN     "warning" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "FoodDetails" ADD COLUMN     "report" TEXT;
