-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(32),
    "email" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(64),
    "last_name" VARCHAR(64),
    "password" VARCHAR(72) NOT NULL,
    "avatar_path" VARCHAR(255) NOT NULL,
    "forty_two_account_id" VARCHAR(255),
    "google_account_id" VARCHAR(255),
    "is_2fa_enabled" BOOLEAN NOT NULL DEFAULT false,
    "verify_email_token" VARCHAR(255),
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_verify_email_token_key" ON "users"("verify_email_token");
