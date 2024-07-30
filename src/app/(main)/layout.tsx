import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Suphouse",
    description: "-",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            {children}
        </main>
    );
}
