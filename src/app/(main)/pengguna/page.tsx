import dynamic from "next/dynamic";
import Link from "next/link";

const Table = dynamic (()=> import ("@/app/(main)/pengguna/components/table"))

export default function DaftarBarang() {
  return (
    <main className="p-10">
      <div className="p-10 rounded-lg bg-white">
        <Link href="/pengguna/tambah" className="btn bg-red-500 text-white">+ Tambah Pengguna</Link>
        <Table />
      </div>
    </main>
  );
}
