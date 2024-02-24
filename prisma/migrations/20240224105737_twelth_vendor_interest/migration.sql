-- CreateTable
CREATE TABLE "VendorInterest" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorInterest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VendorInterest" ADD CONSTRAINT "VendorInterest_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorInterest" ADD CONSTRAINT "VendorInterest_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
