-- AlterTable
ALTER TABLE "Donor" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Active',
ADD COLUMN     "warning" INTEGER;

-- AlterTable
ALTER TABLE "NGO" ADD COLUMN     "report" TEXT;
