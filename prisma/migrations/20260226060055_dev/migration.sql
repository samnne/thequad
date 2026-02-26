/*
  Warnings:

  - You are about to alter the column `price` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;
