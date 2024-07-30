-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'supplier', 'purchasing', 'warehouse');

-- CreateEnum
CREATE TYPE "Satuan" AS ENUM ('unit', 'rim');

-- CreateEnum
CREATE TYPE "StatusPP" AS ENUM ('diterima', 'ditolak', 'dibatalkan');

-- CreateEnum
CREATE TYPE "StatusSup" AS ENUM ('menunggu', 'terima', 'tolak', 'batal');

-- CreateEnum
CREATE TYPE "statusDP" AS ENUM ('diterima', 'ditolak', 'dibatalkan');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "alamat" TEXT,
    "role" "Role" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barang" (
    "id" TEXT NOT NULL,
    "id_supplier" TEXT NOT NULL,
    "nama_barang" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "satuan" "Satuan" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PP" (
    "id" TEXT NOT NULL,
    "status" "StatusPP" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PPBarang" (
    "id" TEXT NOT NULL,
    "id_pp" TEXT NOT NULL,
    "id_barang" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,

    CONSTRAINT "PPBarang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pembelian" (
    "id" TEXT NOT NULL,
    "id_supplier" TEXT NOT NULL,
    "id_ppbarang" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pembelian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DaftarPembelian" (
    "id" TEXT NOT NULL,
    "id_pembelian" TEXT NOT NULL,
    "status" "statusDP" NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DaftarPembelian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faktur" (
    "id" TEXT NOT NULL,
    "id_pembelian" TEXT NOT NULL,
    "jumlahkirim" INTEGER NOT NULL,
    "hargasatuan" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Faktur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengeluaran" (
    "id" TEXT NOT NULL,
    "id_faktur" TEXT NOT NULL,
    "id_supplier" TEXT NOT NULL,
    "sejumlah" INTEGER NOT NULL,
    "terbilang" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pengeluaran_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_id_supplier_fkey" FOREIGN KEY ("id_supplier") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPBarang" ADD CONSTRAINT "PPBarang_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "Barang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PPBarang" ADD CONSTRAINT "PPBarang_id_pp_fkey" FOREIGN KEY ("id_pp") REFERENCES "PP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembelian" ADD CONSTRAINT "Pembelian_id_supplier_fkey" FOREIGN KEY ("id_supplier") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembelian" ADD CONSTRAINT "Pembelian_id_ppbarang_fkey" FOREIGN KEY ("id_ppbarang") REFERENCES "PPBarang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaftarPembelian" ADD CONSTRAINT "DaftarPembelian_id_pembelian_fkey" FOREIGN KEY ("id_pembelian") REFERENCES "Pembelian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faktur" ADD CONSTRAINT "Faktur_id_pembelian_fkey" FOREIGN KEY ("id_pembelian") REFERENCES "Pembelian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengeluaran" ADD CONSTRAINT "Pengeluaran_id_faktur_fkey" FOREIGN KEY ("id_faktur") REFERENCES "Faktur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengeluaran" ADD CONSTRAINT "Pengeluaran_id_supplier_fkey" FOREIGN KEY ("id_supplier") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
