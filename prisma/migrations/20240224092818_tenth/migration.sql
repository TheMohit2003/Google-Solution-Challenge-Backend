/*
  Warnings:

  - The `filePath` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "filePath",
ADD COLUMN     "filePath" BYTEA;
