import dynamic from "next/dynamic"

const Form = dynamic (()=> import ("@/app/auth/signin/components/form"))

export default function Signin() {
    return (
        <main className="w-full bg-gray-100 min-h-screen justify-center items-center flex">
            <Form />
        </main>
    )
}