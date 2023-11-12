/*
  Warnings:

  - A unique constraint covering the columns `[forty_two_account_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[google_account_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_forty_two_account_id_key" ON "users"("forty_two_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_account_id_key" ON "users"("google_account_id");
