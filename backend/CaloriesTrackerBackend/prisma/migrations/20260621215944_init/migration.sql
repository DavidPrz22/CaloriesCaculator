-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('Todas las categorías', 'Productos horneados', 'Productos de carne de res', 'Bebidas', 'Cereales y pastas', 'Productos lácteos y de huevo', 'Grasas y aceites', 'Pescados y mariscos', 'Frutas y jugos de frutas', 'Productos de cordero, ternera y caza', 'Legumbres y productos de legumbres', 'Productos de nueces y semillas', 'Productos de cerdo', 'Productos de aves de corral', 'Alimentos de restaurante', 'Embutidos y carnes frías', 'Sopas, salsas y jugos de carne', 'Especias y hierbas', 'Dulces', 'Verduras y productos vegetales');

-- CreateEnum
CREATE TYPE "Medida" AS ENUM ('Gramos', 'Mililitros', 'Porciones');

-- CreateTable
CREATE TABLE "Comida" (
    "id" SERIAL NOT NULL,
    "FDCID" INTEGER NOT NULL,
    "nameES" TEXT NOT NULL,
    "nameEN" TEXT NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "medida" "Medida" NOT NULL,

    CONSTRAINT "Comida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataConsumo" (
    "id" SERIAL NOT NULL,
    "calorias_consumidas" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "meta_diaria" INTEGER NOT NULL,

    CONSTRAINT "DataConsumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataConsumoDetalle" (
    "id" SERIAL NOT NULL,
    "comidaId" INTEGER NOT NULL,
    "cantidad_consumida" INTEGER NOT NULL,
    "calorias_consumida" INTEGER NOT NULL,
    "dataConsumoId" INTEGER NOT NULL,

    CONSTRAINT "DataConsumoDetalle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "DataConsumo" ADD CONSTRAINT "DataConsumo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataConsumoDetalle" ADD CONSTRAINT "DataConsumoDetalle_comidaId_fkey" FOREIGN KEY ("comidaId") REFERENCES "Comida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataConsumoDetalle" ADD CONSTRAINT "DataConsumoDetalle_dataConsumoId_fkey" FOREIGN KEY ("dataConsumoId") REFERENCES "DataConsumo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
