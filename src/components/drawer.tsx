import Image from "next/image"
import dashboard from "@/assets/dashboard.svg"
import item from "@/assets/item.svg"
import purchase from "@/assets/purchase.svg"
import truck from "@/assets/truck.svg"
import user from "@/assets/user.svg"
import Link from "next/link"

const DrawerSide = () => {
    return <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-red-500 text-white min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
                <a className="py-3 font-semibold text-3xl my-10">
                    Suphouse
                </a>
            </li>
            <li><Link href="/dasbor" className="py-3 font-semibold text-lg">
                <Image
                    src={dashboard}
                    width={20}
                    height={20}
                    alt="icon"
                />
                Dashboard</Link></li>
            <li><Link href="/pengguna" className="py-3 font-semibold text-lg">
                <Image
                    src={user}
                    width={20}
                    height={20}
                    alt="icon"
                />
                Pengguna</Link></li>
            <li><Link href="/supplier" className="py-3 font-semibold text-lg">
                <Image
                    src={truck}
                    width={20}
                    height={20}
                    alt="icon"
                />
                Supplier</Link></li>
            <li>
                <details open>
                    <summary className="py-3 font-semibold text-lg">
                        <Image
                            src={item}
                            width={20}
                            height={20}
                            alt="icon"
                        />
                        Barang</summary>
                    <ul>
                        <li><Link href="/barang" className="py-2 font-semibold text-md">Daftar Barang</Link></li>
                        <li><Link href="/permintaanpembelian" className="py-2 font-semibold text-md">Kirim Permintaan</Link></li>
                    </ul>
                </details>
            </li>
            <li>
                <details open>
                    <summary className="py-3 font-semibold text-lg">
                        <Image
                            src={purchase}
                            width={20}
                            height={20}
                            alt="icon"
                        />
                        Pembelian</summary>
                    <ul>
                        <li><Link href="/pembelian" className="py-2 font-semibold text-md">Daftar Pembelian</Link></li>
                        <li><Link href="/daftarpermintaan" className="py-2 font-semibold text-md">Daftar Permintaan</Link></li>
                        <li><Link href="/laporan" className="py-2 font-semibold text-md">Laporan</Link></li>
                    </ul>
                </details>
            </li>
        </ul>
    </div>
}
export default DrawerSide