"use server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createBarang(nama_barang: string, id_supplier: string, stok: number, harga: number, satuan: string) {
    try {
        console.log("Creating barang with:", { nama_barang, id_supplier, stok, satuan });
        return await prisma.barang.create({
            data: {
                nama_barang,
                id_supplier,
                stok,
                harga,
                satuan: satuan as any
            }
        })
    } catch (error) {
        console.error("Error creating barang:", error);
        throw error;
    }
}

export async function getSuppliers() {
    try {
        return await prisma.user.findMany({
            where: {
                role: 'supplier'
            }
        })
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        throw error;
    }
}
