"use client"
import { useFormik } from "formik"
import { string, object } from "yup"
import { signIn } from 'next-auth/react'

export interface formValue {
    username: string,
    password: string
}

const FormSignin = () => {
    const formValid = object().shape({
        username: string().required("Username Tidak Boleh Kosong!"),
        password: string().required("Password Tidak Boleh Kosong!")
    })

    const form = useFormik<formValue>({
        validationSchema: formValid,
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: async (e) => {
            try {
                await signIn("credentials", {
                    username: e.username,
                    password: e.password
                })
            } catch (error) {
            }
        }
    })
    const { handleChange, handleSubmit, errors, isSubmitting } = form
    return (
        <form onSubmit={handleSubmit} className="p-10 bg-white space-y-4 rounded-lg shadow-xl">
            <div className="space-y-1">
                <h1 className="font-bold text-xl">Sign In</h1>
                <h1 className="font-normal text-md text-gray-400 w-80">Silahkan Masukkan Akun Untuk Mengelola Suphouse</h1>
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Username" name="username" onChange={handleChange} />
                </label>
                {
                    errors.username ? <label htmlFor="" className="label">
                        <span className="label-text-alt text-error">{errors.username}</span>
                    </label> : null
                }
            </div>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow" placeholder="Password" name="password" onChange={handleChange} />
                </label>
                {
                    errors.password ? <label htmlFor="" className="label">
                        <span className="label-text-alt text-error">{errors.password}</span>
                    </label> : null
                }
            </div>
            <button className="btn bg-red-600 text-white w-full">Masuk</button>
        </form>
    )
}
export default FormSignin