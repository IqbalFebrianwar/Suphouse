"use client"
import dynamic from "next/dynamic";
import Link from "next/link";
import { getFormPermintaanById } from "../action";

const PrintTable = dynamic(() => import("@/app/(main)/permintaanpembelian/components/print"))

const PrintPage = async ({ params }: { params: { id: string } }) => {
  try {
    const data = await getFormPermintaanById(params.id);
    if (!data) {
      throw new Error('No data found');
    }
    return (
      <main className="p-10">
        <div className="p-10 rounded-lg bg-white">
          <Link href="/permintaanpembelian" className="bg-transparent border-2 btn border-red-500 mb-5">Kembali</Link>
          <PrintTable id={data.id} />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div>Terjadi Kesalahan Saat Load Data</div>;
  }
};

export default PrintPage;
