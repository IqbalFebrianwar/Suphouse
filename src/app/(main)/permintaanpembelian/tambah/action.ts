"use server"

import prisma from '../../../../../prisma/database';

export async function createPermintaanBarang(id_barang: string, jumlah_barang: number) {
    try {
        const pp = await prisma.pP.create({
            data: {
                id: `PP${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
                status: 'prosses',
                ppBarang: {
                    create: {
                        id_barang: id_barang,
                        noPembelian: `BSP${Date.now()}`,
                        jumlah: jumlah_barang,
                    },
                },
            },
            include: {
                ppBarang: true,
            },
        });
        console.log(pp)
        return pp;
    } catch (error) {
        console.error('Failed to create purchase request:', error);
        throw new Error('Server error');
    }
}

export async function getBarang() {
    try {
      const barangList = await prisma.barang.findMany();
      return barangList;
    } catch (error) {
      console.error('Error fetching barang:', error);
      throw error;
    }
}
