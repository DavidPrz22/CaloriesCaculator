/*
  Warnings:

  - You are about to drop the column `categoria` on the `Comida` table. All the data in the column will be lost.
  - Added the required column `categoriaId` to the `Comida` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comida" DROP COLUMN "categoria",
ADD COLUMN     "categoriaId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Categoria";

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nameES" TEXT NOT NULL,
    "nameEN" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comida" ADD CONSTRAINT "Comida_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
