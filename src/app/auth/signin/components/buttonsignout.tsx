"use client"
import { signOut } from "next-auth/react"
import Link from "next/link"


const SignOutButton = () =>{
    const onClick = async () => {
        try {
            await signOut()
        } catch (error) {
            throw new Error("Terjadi Kesalahan Server")
        }
    }
    return (
        <li><Link className="py-2 text-md" onClick={onClick} href="/">Keluar</Link></li>

    )
}
export default SignOutButton