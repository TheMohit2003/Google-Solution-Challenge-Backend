/*
  Warnings:

  - Added the required column `amount` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `biddingDate` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectStartDate` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "biddingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "projectStartDate" TIMESTAMP(3) NOT NULL;
