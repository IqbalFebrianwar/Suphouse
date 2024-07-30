"use server";

import { revalidatePath } from 'next/cache';
import prisma from '../../../../prisma/database';

export async function getPermintaanBarang() {
    try {
        const permintaanList = await prisma.pP.findMany({
            include: {
                ppBarang: {
                    include: {
                        barang: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
        return permintaanList;
    } catch (error) {
        console.error('Error fetching purchase requests:', error);
        throw new Error('Server error');
    }
}

export async function updatePermintaanStatusDiterima(id: string, status: string) {
    try {
        const updatedPermintaan = await prisma.pP.update({
            where: { id },
            data: { status: 'diterima' },
        });
        revalidatePath("/", "layout")
        return updatedPermintaan;
    } catch (error) {
        console.error('Error updating request status:', error);
        throw new Error('Server error');
    }
}
export async function updatePermintaanStatusDitolak(id: string, status: string) {
    try {
        const updatedPermintaan = await prisma.pP.update({
            where: { id },
            data: { status: 'ditolak' },
        });
        revalidatePath("/", "layout")
        return updatedPermintaan;
    } catch (error) {
        console.error('Error updating request status:', error);
        throw new Error('Server error');
    }
}

export async function getSuppliers() {
    try {
        const suppliers = await prisma.user.findMany({
            where: {
                role: 'supplier',
            },
        });
        return suppliers;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw new Error('Server error');
    }
}
