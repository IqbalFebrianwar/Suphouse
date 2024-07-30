"use client";

import { useEffect, useState } from 'react';
import { getLaporan } from '../action';

interface LaporanItem {
    tanggal: Date;
    supplier: string;
    namaBarang: string;
    jumlah: number;
    hargaSatuan: number;
    totalHarga: number;
}

const Table = () => {
    const [laporan, setLaporan] = useState<LaporanItem[]>([]);

    useEffect(() => {
        async function fetchLaporan() {
            try {
                const data = await getLaporan();
                setLaporan(data);
            } catch (error) {
                console.error("Error fetching laporan:", error);
            }
        }
        fetchLaporan();
    }, []);

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    };

    return (
        <div className="overflow-x-auto my-5">
            <table className="table w-full">
                <thead>
                    <tr className="text-black">
                        <th>Tanggal</th>
                        <th>Supplier</th>
                        <th>Nama Barang</th>
                        <th>Jumlah</th>
                        <th>Harga Satuan</th>
                        <th>Total Harga</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {laporan.map((item, index) => (
                        <tr key={index}>
                            <td>{new Date(item.tanggal).toLocaleDateString()}</td>
                            <td>{item.supplier}</td>
                            <td>{item.namaBarang}</td>
                            <td>{item.jumlah}</td>
                            <td>{formatRupiah(item.hargaSatuan)}</td>
                            <td>{formatRupiah(item.totalHarga)}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
