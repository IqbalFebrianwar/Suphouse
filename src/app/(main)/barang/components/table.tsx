"use client";

import { useEffect, useState } from "react";
import { getBarang } from "../action";

const Table = () => {
    const [barang, setBarang] = useState<any[]>([]);

    useEffect(() => {
        const fetchBarang = async () => {
            try {
                const data = await getBarang();
                setBarang(data);
            } catch (error) {
                alert("Terjadi Kesalahan Saat Mengambil Data Barang");
                console.error("Error fetching barang:", error);
            }
        };
        fetchBarang();
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
                {/* head */}
                <thead>
                    <tr className="text-black">
                        <th></th>
                        <th>Tanggal</th>
                        <th>Nama Barang</th>
                        <th>Stok</th>
                        <th>Satuan</th>
                        <th>Harga Satuan</th>
                        <th>Supplier</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {barang.map((item) => (
                        <tr key={item.id}>
                            <th></th>
                            <td>{new Date(item.createAt).toLocaleDateString()}</td>
                            <td>{item.nama_barang}</td>
                            <td>{item.stok}</td>
                            <td>{item.satuan}</td>
                            <td>{formatRupiah(item.harga)}</td>
                            <td>{item.user.username}</td>
                            <td>
                                <div className="space-x-2">
                                    <button className="btn bg-green-500 text-white">Edit</button>
                                    <button className="btn bg-red-700 text-white">Hapus</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
