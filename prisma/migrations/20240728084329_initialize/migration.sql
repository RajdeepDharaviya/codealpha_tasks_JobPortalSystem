-- CreateTable
CREATE TABLE "SelectedApplication" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "SelectedApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SelectedApplication" ADD CONSTRAINT "SelectedApplication_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectedApplication" ADD CONSTRAINT "SelectedApplication_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
