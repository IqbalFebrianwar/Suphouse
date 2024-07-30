"use server"
import prisma from "../../../../prisma/database";

export async function getLaporan() {
    try {
        const laporan = await prisma.pP.findMany({
            where: {
                status: "dikonfirmasi",
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

        const formattedLaporan = laporan.map((permintaan) => {
            return permintaan.ppBarang.map((item) => {
                const totalHarga = item.jumlah * item.barang.harga;
                return {
                    tanggal: permintaan.createAt,
                    supplier: item.barang.user.username,
                    namaBarang: item.barang.nama_barang,
                    jumlah: item.jumlah,
                    hargaSatuan: item.barang.harga,
                    totalHarga,
                };
            });
        }).flat();

        console.log("Laporan fetched:", formattedLaporan);
        return formattedLaporan;
    } catch (error) {
        console.error("Error fetching laporan:", error);
        throw new Error("Server error");
    }
}
