"use server"

import prisma from "../../../../prisma/database"

export async function UserBYID(id: string ) {
    try {
        const data = await prisma.user.findUnique({
            where : {
                id
            }
        })
        return data
    } catch (error) {
        console.error("Error fetching users:", error)
        throw new Error("Terjadi Kesalahan Pada Server")
    }
}

export async function fetchUsers() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                alamat: true,
                role: true,
            },
        })
        return users
    } catch (error) {
        console.error("Error fetching users:", error)
        throw new Error("Terjadi Kesalahan Pada Server")
    }
}
