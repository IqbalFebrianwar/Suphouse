import NextAuth from "next-auth/next"
import { authConfig } from "./auth"

const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }