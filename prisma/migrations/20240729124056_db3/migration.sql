/*
  Warnings:

  - Added the required column `noPembelian` to the `PPBarang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PPBarang" ADD COLUMN     "noPembelian" TEXT NOT NULL;
