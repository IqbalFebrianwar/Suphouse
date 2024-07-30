const Table = () => {
    return (
        <div className="overflow-x-auto my-5">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="text-black">
                        <th></th>
                        <th>Tanggal</th>
                        <th>Nama Barang</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <th></th>
                        <td>10/12/2003</td>
                        <td>Barang</td>
                        <td>Diterima</td>
                        <td>
                            <div className="space-x-2">
                                <button className="btn bg-green-500 text-white">Edit</button>
                                <button className="btn bg-red-700 text-white">Hapus</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Table