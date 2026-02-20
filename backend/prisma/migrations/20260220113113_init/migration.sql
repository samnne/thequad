-- CreateTable
CREATE TABLE "Listing" (
    "lid" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrls" TEXT[],
    "sellerId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("lid")
);

-- CreateTable
CREATE TABLE "User" (
    "uid" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileURL" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "cid" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "listingId" UUID NOT NULL,
    "userUid" UUID,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "Message" (
    "mid" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "read" TIMESTAMP(3),
    "edited" BOOLEAN NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,
    "conversationID" UUID NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("mid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationID_fkey" FOREIGN KEY ("conversationID") REFERENCES "Conversation"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;
