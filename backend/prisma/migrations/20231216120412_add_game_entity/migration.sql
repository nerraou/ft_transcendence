-- CreateEnum
CREATE TYPE "GameWinner" AS ENUM ('PLAYER', 'OPPONENT');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 400;

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "player_id" INTEGER NOT NULL,
    "opponent_id" INTEGER NOT NULL,
    "winner" "GameWinner" NOT NULL,
    "duration" INTEGER NOT NULL,
    "player_score" INTEGER NOT NULL,
    "player_old_rating" INTEGER NOT NULL,
    "player_new_rating" INTEGER NOT NULL,
    "opponent_score" INTEGER NOT NULL,
    "opponent_old_rating" INTEGER NOT NULL,
    "opponent_new_rating" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_opponent_id_fkey" FOREIGN KEY ("opponent_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
