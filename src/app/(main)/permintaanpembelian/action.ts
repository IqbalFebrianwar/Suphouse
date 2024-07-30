'use server';

import prisma from '../../../../prisma/database';

export async function getPurchaseRequests() {
    try {
        const purchaseRequests = await prisma.pP.findMany({
            include: {
                ppBarang: true,
            },
            orderBy: {
                createAt: 'desc',
            },
        });

        return purchaseRequests.map((request) => ({
            id: request.id,
            noPembelian: request.ppBarang[0]?.noPembelian || 'N/A',
            createAt: request.createAt,
            status: request.status,
        }));
    } catch (error) {
        console.error('Error fetching purchase requests:', error);
        throw error;
    }
}

export async function getFormPermintaanById(id: string) {
    return await prisma.formPermintaan.findUnique({
        where: { id },
        include: {
            ppBarang: {
                include: {
                    barang: true,
                },
            },
            pp: true,
        },
    });
}

