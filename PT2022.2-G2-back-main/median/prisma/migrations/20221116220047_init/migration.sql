-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id_question" INTEGER NOT NULL,
    "id_user" TEXT NOT NULL,
    "content" VARCHAR(250) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id_question","content")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_id_question_fkey" FOREIGN KEY ("id_question") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
