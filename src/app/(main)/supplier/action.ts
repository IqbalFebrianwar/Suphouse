"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../prisma/database";

export async function getPermintaanById(id: string){
    try {
        const permintaan = await prisma.pP.findUnique({
            where: { id },
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
        console.log("Permintaan fetched:", permintaan);
        return permintaan;
    } catch (error) {
        console.error("Error fetching request by ID:", error);
        throw new Error("Server error");
    }
}


export async function updatePermintaanStatusDiterima(id: string) {
    try {
        const permintaan = await prisma.pP.findUnique({
            where: { id },
            include: {
                ppBarang: {
                    include: {
                        barang: true,
                    },
                },
            },
        });

        if (!permintaan) throw new Error("Permintaan not found");

        for (const item of permintaan.ppBarang) {
            await prisma.barang.update({
                where: { id: item.barang.id },
                data: {
                    stok: {
                        increment: item.jumlah,
                    },
                },
            });
        }

        const updatedPermintaan = await prisma.pP.update({
            where: { id },
            data: { status: "dikonfirmasi" },
        });

        revalidatePath("/");
        return updatedPermintaan;
    } catch (error) {
        console.error("Error updating request status:", error);
        throw new Error("Server error");
    }
}

export async function updatePermintaanStatusDitolak(id: string) {
    try {
        const updatedPermintaan = await prisma.pP.update({
            where: { id },
            data: { status: "ditolak"  },
        });
        revalidatePath("/");
        return updatedPermintaan;
    } catch (error) {
        console.error("Error updating request status:", error);
        throw new Error("Server error");
    }
}

export async function getPermintaanBarang() {
    try {
        const permintaanList = await prisma.pP.findMany({
            where: {
                status: {
                    notIn: ["ditolak","dibatalkan","prosses",]
                }
            },
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
        console.error("Error fetching purchase requests:", error);
        throw new Error("Server error");
    }
}
