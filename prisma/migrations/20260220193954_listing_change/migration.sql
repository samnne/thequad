/*
  Warnings:

  - Added the required column `archived` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sold` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "archived" BOOLEAN NOT NULL,
ADD COLUMN     "sold" BOOLEAN NOT NULL;
