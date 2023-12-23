/*
  Warnings:

  - Added the required column `opponent_new_ranking` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opponent_old_ranking` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_new_ranking` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_old_ranking` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "opponent_new_ranking" INTEGER NOT NULL,
ADD COLUMN     "opponent_old_ranking" INTEGER NOT NULL,
ADD COLUMN     "player_new_ranking" INTEGER NOT NULL,
ADD COLUMN     "player_old_ranking" INTEGER NOT NULL;
