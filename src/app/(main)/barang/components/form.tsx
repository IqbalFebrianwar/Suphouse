"use client"

import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { string, object, number } from "yup"
import { createBarang, getSuppliers } from "../tambah/action"
import { useRouter } from "next/navigation"

export interface FormValue {
    nama_barang: string,
    id_supplier: string,
    satuan: string,
    stok: number,
    harga : number,
}

const Form = () => {
    const [suppliers, setSuppliers] = useState<{ id: string, username: string }[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const supplierList = await getSuppliers()
                setSuppliers(supplierList)
            } catch (error) {
                alert("Terjadi Kesalahan Saat Mengambil Data Supplier")
                console.error("Error fetching suppliers:", error)
            }
        }
        fetchSuppliers()
    }, [])

    const formSchema = object().shape({
        nama_barang: string().required("Nama Barang tidak boleh kosong"),
        id_supplier: string().required("Supplier tidak boleh kosong"),
        satuan: string().required("Satuan Barang tidak boleh kosong"),
        stok: number().required("Stok tidak boleh kosong").min(0, "Stok harus lebih besar dari atau sama dengan 0"),
        harga: string().required("Harga tidak boleh kosong"),
    })

    const form = useFormik<FormValue>({
        validationSchema: formSchema,
        initialValues: {
            nama_barang: '',
            id_supplier: '',
            satuan: '',
            stok: 0,
            harga: 0,
        },
        onSubmit: async (values) => {
            try {
                console.log("Form values:", values);
                await createBarang(values.nama_barang, values.id_supplier, values.stok, values.harga, values.satuan)
                router.push("/barang")
            } catch (error) {
                alert("Terjadi Kesalahan Pada Server")
                console.error("Error submitting form:", error);
            }
        }
    })

    const { handleChange, handleSubmit, errors, isSubmitting, values } = form

    return (
        <form onSubmit={handleSubmit} className="my-10 grid lg:grid-cols-2 lg:gap-2">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Nama Barang</span>
                </div>
                <input
                    type="text"
                    name="nama_barang"
                    value={values.nama_barang}
                    onChange={handleChange}
                    placeholder="Nama Barang"
                    className="input input-bordered w-full max-w-xs"
                />
                {errors.nama_barang && <div className="text-red-500">{errors.nama_barang}</div>}
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Nama Supplier</span>
                </div>
                <select
                    name="id_supplier"
                    value={values.id_supplier}
                    onChange={handleChange}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option disabled value="">Supplier</option>
                    {suppliers.map(supplier => (
                        <option key={supplier.id} value={supplier.id}>
                            {supplier.username}
                        </option>
                    ))}
                </select>
                {errors.id_supplier && <div className="text-red-500">{errors.id_supplier}</div>}
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Satuan Barang</span>
                </div>
                <select
                    name="satuan"
                    value={values.satuan}
                    onChange={handleChange}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option disabled value="">Satuan</option>
                    <option value="unit">Unit</option>
                    <option value="rim">Rim</option>
                </select>
                {errors.satuan && <div className="text-red-500">{errors.satuan}</div>}
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Stok</span>
                </div>
                <input
                    type="number"
                    name="stok"
                    value={values.stok}
                    onChange={handleChange}
                    placeholder="Stok"
                    className="input input-bordered w-full max-w-xs"
                />
                {errors.stok && <div className="text-red-500">{errors.stok}</div>}
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Harga Satuan</span>
                </div>
                <input
                    type="number"
                    name="harga"
                    value={values.harga}
                    onChange={handleChange}
                    placeholder="Harga Satuan"
                    className="input input-bordered w-full max-w-xs"
                />
                {errors.harga && <div className="text-red-500">{errors.harga}</div>}
            </label>
            <button type="submit" className="btn bg-green-500 text-white w-40 my-5">
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
        </form>
    )
}

export default Form
