export { default } from "next-auth/middleware"

export const config = { 
    matcher: [
        "/dasbor",
        "/pengguna/:path*",
        "/supplier/:path*",
        "/barang/:path*",
        "/pembelian/:path*"
    ]
}