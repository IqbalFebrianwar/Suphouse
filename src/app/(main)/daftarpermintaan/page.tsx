import dynamic from "next/dynamic";

const Table = dynamic(() => import("@/app/(main)/daftarpermintaan/components/table"))

export default function DaftarPermintaan() {
  return (
    <main className="p-10">
      <div className="p-10 rounded-lg bg-white">
        <Table />
      </div>
    </main>
  );
}
