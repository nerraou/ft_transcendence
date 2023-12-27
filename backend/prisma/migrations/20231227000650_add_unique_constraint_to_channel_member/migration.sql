/*
  Warnings:

  - A unique constraint covering the columns `[channel_id,memeber_id]` on the table `channels_members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "channels_members_channel_id_memeber_id_key" ON "channels_members"("channel_id", "memeber_id");
