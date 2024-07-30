import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { getServerSession, Session } from "next-auth";
import { authConfig } from "./api/auth/[...nextauth]/auth";

const mulish = Mulish({ subsets: ["latin"] });
const AuthProvider = dynamic(() => import('@/components/authProvider'))

export const metadata: Metadata = {
  title: "Suphouse",
  description: "-",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {
    session: Session
  }
}>) {
  console.log(params.session)
  const session = await getServerSession(authConfig)

  return (
    <html lang="en" data-theme="light">
      <body className={mulish.className}>
      <AuthProvider session={params.session}>
        {children}
      </AuthProvider>
      </body>
    </html>
  );
}
