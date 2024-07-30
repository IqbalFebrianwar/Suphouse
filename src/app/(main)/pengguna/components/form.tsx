"use client"

import { useFormik } from "formik"
import { string, object } from "yup"
import { createUsers } from "../tambah/action"
import { useRouter } from "next/navigation"
import { Role } from "@prisma/client" // Import the Role enum from Prisma
import SelectRole from "../components/getrole" // Import the SelectRole component

export interface FormValue {
    username: string
    password: string
    alamat: string
    role: string // Keep this as string for form handling
}

const Form = () => {
    const router = useRouter()

    const formSchema = object().shape({
        username: string().required("Username tidak boleh kosong"),
        password: string().required("Password tidak boleh kosong"),
        alamat: string().required("Alamat tidak boleh kosong"),
        role: string().required("Role tidak boleh kosong"),
    })

    const form = useFormik<FormValue>({
        validationSchema: formSchema,
        initialValues: {
            username: "",
            password: "",
            alamat: "",
            role: "",
        },
        onSubmit: async (values) => {
            try {
                // Convert role from string to Role enum
                const userValues = {
                    ...values,
                    role: values.role as Role, // Cast role to Role enum
                }
                await createUsers(userValues)
                router.push("/pengguna")
            } catch (error) {
                alert("Terjadi Kesalahan Pada Server")
            }
        },
    })

    const { handleChange, handleSubmit, errors, isSubmitting } = form

    return (
        <form
            onSubmit={handleSubmit}
            className="my-10 grid lg:grid-cols-2 lg:gap-2"
        >
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Username</span>
                </div>
                <input
                    type="text"
                    name="username"
                    value={form.values.username}
                    onChange={handleChange}
                    placeholder="username"
                    className="input input-bordered w-full max-w-xs"
                />
                {errors.username && (
                    <div className="text-red-500">{errors.username}</div>
                )}
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Password</span>
                </div>
                <input
                    type="password"
                    name="password"
                    value={form.values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs"
                />
                {errors.password && (
                    <div className="text-red-500">{errors.password}</div>
                )}
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Alamat</span>
                </div>
                <input
                    type="text"
                    name="alamat"
                    value={form.values.alamat}
                    onChange={handleChange}
                    placeholder="alamat"
                    className="input input-bordered w-full max-w-xs"
                />
                {errors.alamat && (
                    <div className="text-red-500">{errors.alamat}</div>
                )}
            </label>
            {/* Use the SelectRole component */}
            <SelectRole
                name="role"
                value={form.values.role}
                onChange={handleChange}
                error={errors.role}
            />
            <button
                type="submit"
                className="btn bg-green-500 text-white w-40 my-5"
            >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
        </form>
    )
}

export default Form
