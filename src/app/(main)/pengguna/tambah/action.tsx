"use server"

import prisma from "../../../../../prisma/database"
import { Prisma } from "@prisma/client"

export async function createUsers(data: Prisma.UserCreateInput) {
    try {
        const getData = await prisma.user.create({
            select: {
                username : true,
                password : true,
                alamat : true,
                role : true
            },
            data: {
                username : data.username,
                password : data.password,
                alamat : data.alamat,
                role : data.role
            }
        })
        return getData
    } catch (error) {
        throw new Error("Terjadi Kesalahan Pada Server")
    }
}