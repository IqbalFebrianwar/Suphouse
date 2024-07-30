"use client";

import { useEffect, useState, useTransition } from 'react';
import { getPermintaanBarang, updatePermintaanStatusDiterima,updatePermintaanStatusDitolak, getSuppliers } from '../action';
import { useRouter } from 'next/navigation';

interface PermintaanBarang {
    id: string;
    status: string;
    createAt: Date;
    ppBarang: {
        id: string;
        noPembelian: string;
        jumlah: number;
        barang: {
            nama_barang: string;
            user: {
                id: string;
                username: string;
            };
        };
    }[];
}

interface Supplier {
    id: string;
    username: string;
}

const PurchaseRequestTable = () => {
    const [permintaanList, setPermintaanList] = useState<PermintaanBarang[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [selectedSupplier, setSelectedSupplier] = useState<string>('');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [permintaan, suppliers] = await Promise.all([getPermintaanBarang(), getSuppliers()]);
                const mappedSuppliers = suppliers.map((supplier) => ({
                    id: supplier.id,
                    username: supplier.username
                }));

                setPermintaanList(permintaan);
                setSuppliers(mappedSuppliers);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    const handleStatusDiterimaChange = async (id: string, status: string) => {
        startTransition(async () => {
            try {
                await updatePermintaanStatusDiterima(id, status);
                router.refresh();
            } catch (error) {
                console.error("Failed to update status:", error);
            }
        });
    };
    const handleStatusDitolakChange = async (id: string, status: string) => {
        startTransition(async () => {
            try {
                await updatePermintaanStatusDitolak(id, status);
                router.refresh();
            } catch (error) {
                console.error("Failed to update status:", error);
            }
        });
    };

    const filteredPermintaan = permintaanList.filter(
        (permintaan) => !selectedSupplier || permintaan.ppBarang.some(p => p.barang.user.id === selectedSupplier)
    );

    return (
        <div>
            <select
                className="select select-bordered w-full max-w-xs my-4"
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
            >
                <option value="">Semua Supplier</option>
                {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                        {supplier.username}
                    </option>
                ))}
            </select>
            <div className="overflow-x-auto my-5">
                <table className="table">
                    <thead>
                        <tr className="text-black">
                            <th></th>
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Supplier</th>
                            <th>Nama Barang</th>
                            <th>Jumlah</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPermintaan.map((permintaan, index) => (
                            <tr key={permintaan.id}>
                                <th>{index + 1}</th>
                                <td>{permintaan.ppBarang[0].noPembelian}</td>
                                <td>{new Date(permintaan.createAt).toLocaleDateString()}</td>
                                <td>{permintaan.ppBarang[0].barang.user.username}</td>
                                <td>{permintaan.ppBarang[0].barang.nama_barang}</td>
                                <td>{permintaan.ppBarang[0].jumlah}</td>
                                <td>{permintaan.status}</td>
                                <td>
                                    <div className="space-x-2">
                                        <button
                                            className="btn bg-blue-500 text-white"
                                            onClick={() => handleStatusDiterimaChange(permintaan.id, 'diterima')}
                                            disabled={isPending || permintaan.status !== 'prosses'}
                                        >
                                            Terima
                                        </button>
                                        <button
                                            className="btn bg-red-700 text-white"
                                            onClick={() => handleStatusDitolakChange(permintaan.id, 'ditolak')}
                                            disabled={isPending || permintaan.status !== 'prosses'}
                                        >
                                            Tolak
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PurchaseRequestTable;
