import type { Metadata } from "next";
import dynamic from "next/dynamic";

const DrawerSide = dynamic(() => import('@/components/drawer'))
const NavbarComponents = dynamic(() => import('@/components/navbar'))

export const metadata: Metadata = {
    title: "Suphouse",
    description: "-",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="drawer bg-gray-100 lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
            <NavbarComponents />
                {children}
                
            </div>
            <DrawerSide />
        </div>
    );
}
