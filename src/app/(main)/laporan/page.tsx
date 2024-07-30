import dynamic from "next/dynamic";

const Table = dynamic (()=> import ("@/app/(main)/laporan/components/table"))

export default function DaftarBarang() {
  return (
    <main className="p-10">
      <div className="p-10 rounded-lg bg-white">
        <Table />
      </div>
    </main>
  );
}
