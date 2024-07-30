/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Resumes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Resumes_user_id_key" ON "Resumes"("user_id");
