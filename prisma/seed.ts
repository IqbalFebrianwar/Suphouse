import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const main = async () => {
    await prisma.user.create({
        select : {
            username : true,
            password : true,
            alamat : true
        },
        data: {
            username : 'admin',
            password : 'admin123',
            alamat : 'Jl Tebet Mas',
            role : 'admin'
        }
    })
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        await prisma.$disconnect()
        console.log(e)
    })