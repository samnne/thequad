/*
  Warnings:

  - Made the column `userUid` on table `Conversation` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `latitude` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_userUid_fkey";

-- AlterTable
ALTER TABLE "Conversation" ALTER COLUMN "userUid" SET NOT NULL;

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "edited" SET DEFAULT false,
ALTER COLUMN "updated" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
