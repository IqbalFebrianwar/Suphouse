import dynamic from "next/dynamic";
import Link from "next/link";

const Table = dynamic (()=> import ("@/app/(main)/permintaanpembelian/components/table"))

export default function Permintaan() {
  return (
    <main className="p-10">
      <div className="p-10 rounded-lg space-x-3 bg-white">
        <Link href="/permintaanpembelian/tambah" className="btn bg-red-500 text-white">Kirim Permintaan</Link>
        <Link href="/permintaanpembelian/print" className="btn bg-blue-500 text-white">Print</Link>
        <Table />
      </div>
    </main>
  );
}
