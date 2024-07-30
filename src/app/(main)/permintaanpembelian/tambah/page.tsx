import dynamic from "next/dynamic";
import Link from "next/link";

const Form = dynamic (()=> import ("@/app/(main)/permintaanpembelian/components/form"))

export default function TambahBarang() {
  return (
    <main className="p-10">
      <div className="p-10 rounded-lg bg-white">
        <Link href="/permintaanpembelian" className="bg-transparent border-2 btn border-red-500 mb-5">Kembali</Link>
        <h1 className="font-semibold text-gray-950 text-xl">Kirim Permintaan</h1>
        <Form />
      </div>
    </main>
  );
}
