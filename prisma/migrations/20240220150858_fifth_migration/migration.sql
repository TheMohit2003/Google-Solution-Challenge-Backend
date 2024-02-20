/*
  Warnings:

  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ISSUER', 'VENDOR');

-- CreateEnum
CREATE TYPE "IssuerType" AS ENUM ('INDIVIDUAL', 'COMPANY');

-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('OPEN', 'CLOSED', 'LIVE');

-- CreateEnum
CREATE TYPE "BidStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropEnum
DROP TYPE "Issuertype";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Issuer" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" INTEGER NOT NULL,
    "aadhar" TEXT NOT NULL,
    "GST" INTEGER NOT NULL,
    "OrganizationName" TEXT NOT NULL,
    "IssuerType" "IssuerType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Issuer_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "officeAddress" TEXT NOT NULL,
    "contact" INTEGER NOT NULL,
    "aadhar" TEXT NOT NULL,
    "GST" INTEGER NOT NULL,
    "OrganizationName" TEXT NOT NULL,
    "WorkDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "issuerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ServiceStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "message" TEXT,
    "status" "BidStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Issuer" ADD CONSTRAINT "Issuer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_issuerId_fkey" FOREIGN KEY ("issuerId") REFERENCES "Issuer"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
