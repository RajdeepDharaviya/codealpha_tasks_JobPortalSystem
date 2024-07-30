/*
  Warnings:

  - You are about to drop the column `Resume` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "Resume";

-- CreateTable
CREATE TABLE "Resumes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "resume" BYTEA,

    CONSTRAINT "Resumes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resumes" ADD CONSTRAINT "Resumes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
