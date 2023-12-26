-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('PUBLIC', 'PRIVATE', 'PROTECTED');

-- CreateEnum
CREATE TYPE "ChannelMemberRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "ChannelMemberState" AS ENUM ('BANNED', 'KICKED');

-- CreateTable
CREATE TABLE "channels" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "image_path" VARCHAR(255) NOT NULL,
    "members_count" INTEGER NOT NULL DEFAULT 1,
    "type" "ChannelType" NOT NULL,
    "password" VARCHAR(72),
    "creator_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channels_members" (
    "id" SERIAL NOT NULL,
    "memeber_id" INTEGER NOT NULL,
    "channel_id" INTEGER NOT NULL,
    "role" "ChannelMemberRole" NOT NULL,
    "state" "ChannelMemberState",
    "muted_until" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "channels_members_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channels_members" ADD CONSTRAINT "channels_members_memeber_id_fkey" FOREIGN KEY ("memeber_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channels_members" ADD CONSTRAINT "channels_members_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
