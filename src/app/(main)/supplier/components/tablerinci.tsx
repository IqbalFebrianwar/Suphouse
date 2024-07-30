"use client";

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPermintaanById, updatePermintaanStatusDiterima, updatePermintaanStatusDitolak } from '../action';

interface PermintaanBarang {
    id: string;
    status: string;
    createAt: Date;
    ppBarang: {
        id: string;
        noPembelian: string;
        jumlah: number;
        barang: {
            id: string;
            nama_barang: string;
            harga: number;
            user: {
                id: string;
                username: string;
            };
        };
    }[];
}

const Rinci = ({ id }: { id: string }) => {
    const [permintaan, setPermintaan] = useState<PermintaanBarang | null>(null);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("Fetching data for ID:", id);
                const data: PermintaanBarang | null = await getPermintaanById(id);
                console.log('Fetched Data:', data);
                setPermintaan(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleStatusDiterimaChange = async () => {
        startTransition(async () => {
            try {
                await updatePermintaanStatusDiterima(id);
                router.push("/supplier");
            } catch (error) {
                console.error("Failed to update status:", error);
            }
        });
    };

    const handleStatusDitolakChange = async () => {
        startTransition(async () => {
            try {
                await updatePermintaanStatusDitolak(id);
                router.push("/supplier");
            } catch (error) {
                console.error("Failed to update status:", error);
            }
        });
    };

    if (!permintaan) return <div>No data found</div>;

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    };

    return (
        <div className="overflow-x-auto my-5">
            <Link href="/supplier" className="btn bg-transparent border-2 border-red-500 mb-10">Kembali</Link>
            <table className="table">
                <thead>
                    <tr className="text-black">
                        <th>No Pembelian</th>
                        <th>Tanggal</th>
                        <th>Nama Barang</th>
                        <th>Jumlah</th>
                        <th>Harga Satuan</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {permintaan.ppBarang.map((item) => (
                        <tr key={item.id}>
                            <td>{item.noPembelian}</td>
                            <td>{new Date(permintaan.createAt).toLocaleDateString()}</td>
                            <td>{item.barang.nama_barang}</td>
                            <td>{item.jumlah}</td>
                            <td>{formatRupiah(item.barang.harga)}</td>
                            <td>{permintaan.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="space-x-5 py-5">
                <button 
                    className="btn bg-blue-500 text-white"
                    onClick={handleStatusDiterimaChange}
                    disabled={isPending}
                >
                    Konfirmasi
                </button>
                <button 
                    className="btn bg-red-700 text-white"
                    onClick={handleStatusDitolakChange}
                    disabled={isPending}
                >
                    Tolak
                </button>
            </div>
        </div>
    );
};

export default Rinci;
