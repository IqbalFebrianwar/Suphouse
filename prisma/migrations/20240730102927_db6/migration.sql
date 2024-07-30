/*
  Warnings:

  - You are about to drop the column `hargasatuan` on the `Faktur` table. All the data in the column will be lost.
  - You are about to drop the column `id_pembelian` on the `Faktur` table. All the data in the column will be lost.
  - You are about to drop the column `jumlahkirim` on the `Faktur` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Faktur` table. All the data in the column will be lost.
  - You are about to drop the `DaftarPembelian` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pembelian` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_pp` to the `Faktur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_ppbarang` to the `Faktur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_supplier` to the `Faktur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_faktur` to the `Faktur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_bayar` to the `Faktur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_harga` to the `Faktur` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DaftarPembelian" DROP CONSTRAINT "DaftarPembelian_id_pembelian_fkey";

-- DropForeignKey
ALTER TABLE "Faktur" DROP CONSTRAINT "Faktur_id_pembelian_fkey";

-- DropForeignKey
ALTER TABLE "Pembelian" DROP CONSTRAINT "Pembelian_id_ppbarang_fkey";

-- DropForeignKey
ALTER TABLE "Pembelian" DROP CONSTRAINT "Pembelian_id_supplier_fkey";

-- DropForeignKey
ALTER TABLE "Pengeluaran" DROP CONSTRAINT "Pengeluaran_id_faktur_fkey";

-- AlterTable
ALTER TABLE "Faktur" DROP COLUMN "hargasatuan",
DROP COLUMN "id_pembelian",
DROP COLUMN "jumlahkirim",
DROP COLUMN "total",
ADD COLUMN     "id_pp" TEXT NOT NULL,
ADD COLUMN     "id_ppbarang" TEXT NOT NULL,
ADD COLUMN     "id_supplier" TEXT NOT NULL,
ADD COLUMN     "no_faktur" TEXT NOT NULL,
ADD COLUMN     "total_bayar" INTEGER NOT NULL,
ADD COLUMN     "total_harga" INTEGER NOT NULL;

-- DropTable
DROP TABLE "DaftarPembelian";

-- DropTable
DROP TABLE "Pembelian";

-- DropEnum
DROP TYPE "statusDP";

-- CreateTable
CREATE TABLE "SuratPesanan" (
    "id" TEXT NOT NULL,
    "id_pp" TEXT NOT NULL,
    "id_ppbarang" TEXT NOT NULL,
    "id_supplier" TEXT NOT NULL,
    "no_pesanan" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SuratPesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormPermintaan" (
    "id" TEXT NOT NULL,
    "id_pp" TEXT NOT NULL,
    "id_ppbarang" TEXT NOT NULL,
    "no_fpp" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormPermintaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuktiKas" (
    "id" TEXT NOT NULL,
    "id_faktur" TEXT NOT NULL,
    "sejumlah" INTEGER NOT NULL,
    "terbilang" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuktiKas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SuratPesanan" ADD CONSTRAINT "SuratPesanan_id_supplier_fkey" FOREIGN KEY ("id_supplier") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuratPesanan" ADD CONSTRAINT "SuratPesanan_id_ppbarang_fkey" FOREIGN KEY ("id_ppbarang") REFERENCES "PPBarang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuratPesanan" ADD CONSTRAINT "SuratPesanan_id_pp_fkey" FOREIGN KEY ("id_pp") REFERENCES "PP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormPermintaan" ADD CONSTRAINT "FormPermintaan_id_ppbarang_fkey" FOREIGN KEY ("id_ppbarang") REFERENCES "PPBarang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormPermintaan" ADD CONSTRAINT "FormPermintaan_id_pp_fkey" FOREIGN KEY ("id_pp") REFERENCES "PP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faktur" ADD CONSTRAINT "Faktur_id_supplier_fkey" FOREIGN KEY ("id_supplier") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faktur" ADD CONSTRAINT "Faktur_id_ppbarang_fkey" FOREIGN KEY ("id_ppbarang") REFERENCES "PPBarang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuktiKas" ADD CONSTRAINT "BuktiKas_id_faktur_fkey" FOREIGN KEY ("id_faktur") REFERENCES "Faktur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
