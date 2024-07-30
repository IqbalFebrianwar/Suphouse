import dynamic from "next/dynamic";
import { getPermintaanById } from "../action";

const Table = dynamic(() => import("@/app/(main)/supplier/components/tablerinci"));

const SupplierRinci = async ({ params }: { params: { id: string } }) => {
    try {
        const data = await getPermintaanById(params.id);
        if (!data) {
            throw new Error('No data found');
        }
        return (
            <main className="p-10">
                <div className="p-10 rounded-lg bg-white">
                    <Table
                        id={params.id}
                    />
                </div>
            </main>
        );
    } catch (error) {
        console.error("Error fetching product:", error);
        return <div>Terjadi Kesalahan Saat Load Data</div>;
    }
};

export default SupplierRinci;
