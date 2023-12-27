-- CreateTable
CREATE TABLE "channels_messages" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "channel_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "channels_messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "channels_messages" ADD CONSTRAINT "channels_messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "channels_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channels_messages" ADD CONSTRAINT "channels_messages_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
