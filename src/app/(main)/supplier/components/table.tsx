import Link from "next/link";
import { getPermintaanBarang } from "../action";

const Table = async () => {
    try {
        const permintaanList = await getPermintaanBarang();

        if (!permintaanList || permintaanList.length === 0) {
            return <div>Tidak Ada Data</div>;
        }

        return (
            <div className="overflow-x-auto my-5">
                <table className="table">
                    <thead>
                        <tr className="text-black">
                            <th>No</th>
                            <th>Nama Barang</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {permintaanList.map((permintaan, index) => (
                            <tr key={permintaan.id}>
                                <td>{index + 1}</td>
                                <td>{permintaan.ppBarang[0]?.barang.nama_barang || "Unknown"}</td>
                                <td>{permintaan.status || "Unknown"}</td>
                                <td>
                                    {permintaan.status === 'dikonfirmasi' ? (
                                        <button 
                                            className="btn bg-gray-500 cursor-not-allowed" 
                                            disabled
                                        >
                                            Dikonfirmasi
                                        </button>
                                    ) : (
                                        <Link
                                            href={`/supplier/${permintaan.id}`}
                                            className="btn bg-transparent border-2 border-red-500"
                                        >
                                            Lihat
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } catch (error) {
        return <div>Error loading data</div>;
    }
};

export default Table;
