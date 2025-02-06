-- CreateTable
CREATE TABLE "FoodDetails" (
    "id" SERIAL NOT NULL,
    "donorId" INTEGER NOT NULL,
    "foodType" TEXT NOT NULL,
    "foodCategory" TEXT NOT NULL,
    "noOfDishes" INTEGER NOT NULL,
    "preparationDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "ngoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoodDetails" ADD CONSTRAINT "FoodDetails_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodDetails" ADD CONSTRAINT "FoodDetails_ngoId_fkey" FOREIGN KEY ("ngoId") REFERENCES "NGO"("id") ON DELETE SET NULL ON UPDATE CASCADE;
