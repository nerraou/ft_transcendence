/*
  Warnings:

  - You are about to drop the column `followerId` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `contacts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[follower_id,following_id]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `follower_id` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_id` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_followerId_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_followingId_fkey";

-- DropIndex
DROP INDEX "contacts_followerId_followingId_key";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "followerId",
DROP COLUMN "followingId",
ADD COLUMN     "follower_id" INTEGER NOT NULL,
ADD COLUMN     "following_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contacts_follower_id_following_id_key" ON "contacts"("follower_id", "following_id");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
