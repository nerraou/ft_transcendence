/*
  Warnings:

  - You are about to drop the column `memeber_id` on the `channels_members` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[channel_id,member_id]` on the table `channels_members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `member_id` to the `channels_members` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "channels_members" DROP CONSTRAINT "channels_members_memeber_id_fkey";

-- DropIndex
DROP INDEX "channels_members_channel_id_memeber_id_key";

-- AlterTable
ALTER TABLE "channels_members" DROP COLUMN "memeber_id",
ADD COLUMN     "member_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "channels_members_channel_id_member_id_key" ON "channels_members"("channel_id", "member_id");

-- AddForeignKey
ALTER TABLE "channels_members" ADD CONSTRAINT "channels_members_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
