"use server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getBarang() {
    try {
        return await prisma.barang.findMany({
            include: {
                user: true // This includes supplier information
            },
            orderBy: {
                createAt: 'desc' // Order by creation date
            }
        })
    } catch (error) {
        console.error("Error fetching barang:", error)
        throw error
    }
}
