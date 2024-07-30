import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "../../../../../prisma/database"

export const authConfig: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',

            async authorize(credentials, req) {
                const { username, password } = req.body as {
                    username: string
                    password: string
                }

                const getData = await prisma.user.findFirst({
                    where: {
                        username: username
                    },
                    select: {
                        id: true,
                        role: true,
                        alamat: true,
                        username: true,
                        password: true
                    }
                })

                if (getData) {
                    if (password == getData.password) {
                        return {
                            id: getData.id,
                            email: getData.username,
                            name: getData.role
                        }
                    } else {
                        throw new Error("Password Salah!")
                    }
                }
                else {
                    throw new Error("User Tidak Ada!")
                }
            },
            credentials: {},
        })
    ],
    callbacks : {
        async session({ session, user, token }) {
            if (token) {
                session.user = token
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email
            }
            return token
        },
        async redirect ({baseUrl}) {
        return `${baseUrl}/dasbor`
        }
    },
    pages: {
        signIn : '/auth/signin',
        signOut : '/auth/signin',
    }
}