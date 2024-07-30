"use client"
import React, { useEffect, useState } from 'react';
import { getFormPermintaanById } from '../action';

const Print = ({ id }: { id: string }) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getFormPermintaanById(id);
            setData(result);
        };

        fetchData();
    }, [id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <main className="w-full grid items-center justify-center">
            <div className="text-center pb-5">
                <h1 className="text-2xl font-bold">PT. Selalu Sukses</h1>
                <h1>Form Permintaan Pembelian</h1>
            </div>
            <div className="py-5">
                <div className="flex space-x-2">
                    <h1 className="font-bold">
                        No. FPP :
                    </h1>
                    <h1>
                        {data.no_fpp}
                    </h1>
                </div>
                <div className="flex space-x-2">
                    <h1 className="font-bold">
                        Tanggal FPP :
                    </h1>
                    <h1>
                        {new Date(data.createAt).toLocaleDateString()}
                    </h1>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Barang</th>
                            <th>Satuan</th>
                            <th>Jumlah Minta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.ppBarang.map((item: any, index: number) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.barang.nama_barang}</td>
                                <td>{item.barang.satuan}</td>
                                <td>{item.jumlah}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Print;
