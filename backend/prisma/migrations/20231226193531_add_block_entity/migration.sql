-- CreateTable
CREATE TABLE "blockes" (
    "user_id" INTEGER NOT NULL,
    "blocked_by" INTEGER NOT NULL,

    CONSTRAINT "blockes_pkey" PRIMARY KEY ("user_id","blocked_by")
);

-- AddForeignKey
ALTER TABLE "blockes" ADD CONSTRAINT "blockes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blockes" ADD CONSTRAINT "blockes_blocked_by_fkey" FOREIGN KEY ("blocked_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
