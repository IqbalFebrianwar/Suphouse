import dynamic from "next/dynamic";

const Table = dynamic (()=> import ("@/app/(main)/supplier/components/table"))

export default function Supplier() {
  return (
    <main className="p-10">
      <div className="p-10 rounded-lg bg-white">
        <Table />
      </div>
    </main>
  );
}
