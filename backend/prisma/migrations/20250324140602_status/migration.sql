-- AlterTable
ALTER TABLE "Ngoconnect" ADD COLUMN     "donorResponse" BOOLEAN DEFAULT false,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';
