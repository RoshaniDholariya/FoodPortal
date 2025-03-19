-- CreateTable
CREATE TABLE "Ngoconnect" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "ngoId" INTEGER NOT NULL,

    CONSTRAINT "Ngoconnect_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ngoconnect" ADD CONSTRAINT "Ngoconnect_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "NGO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
