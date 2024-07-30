"use client"

import { useFormik } from "formik";
import { useEffect, useState, useTransition } from "react";
import { string, number, object } from "yup";
import { useRouter } from "next/navigation";
import { createPermintaanBarang } from "../tambah/action";
import { getBarang } from "../tambah/action";

export interface FormValue {
    jumlah_barang: number;
    id_barang: string;
}

interface Barang {
    id: string;
    nama_barang: string;
}

const PurchaseRequestForm = () => {
    const router = useRouter();
    const [barangList, setBarangList] = useState<Barang[]>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const fetchBarang = async () => {
            try {
                const data = await getBarang(); 
                setBarangList(data);
            } catch (error) {
                console.error("Failed to fetch barang:", error);
            }
        };

        fetchBarang();
    }, []);

    const formSchema = object().shape({
        jumlah_barang: number().required("Jumlah Barang tidak boleh kosong").min(1, "Jumlah harus lebih dari 0"),
        id_barang: string().required("Barang tidak boleh kosong"),
    });

    const form = useFormik<FormValue>({
        validationSchema: formSchema,
        initialValues: {
            jumlah_barang: 1,
            id_barang: '',
        },
        onSubmit: (values, { setSubmitting }) => {
            startTransition(async () => {
                try {
                    await createPermintaanBarang(values.id_barang, values.jumlah_barang);
                    router.push("/permintaanpembelian")
                } catch (error) {
                    alert("Terjadi Kesalahan Pada Server");
                    console.error("Error submitting form:", error);
                } finally {
                    setSubmitting(false);
                }
            });
        }
    });

    const { handleChange, handleSubmit, errors, isSubmitting, values } = form;

    return (
        <form onSubmit={handleSubmit} className="my-10 grid lg:grid-cols-2 lg:gap-2">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Jumlah Barang</span>
                </div>
                <input
                    type="number"
                    name="jumlah_barang"
                    value={values.jumlah_barang}
                    onChange={handleChange}
                    placeholder="Jumlah Barang"
                    className="input input-bordered w-full max-w-xs"
                />
                {errors.jumlah_barang && <div className="text-red-500">{errors.jumlah_barang}</div>}
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Pilih Barang</span>
                </div>
                <select
                    name="id_barang"
                    value={values.id_barang}
                    onChange={handleChange}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option disabled value="">Barang</option>
                    {barangList.map((barang) => (
                        <option key={barang.id} value={barang.id}>{barang.nama_barang}</option>
                    ))}
                </select>
                {errors.id_barang && <div className="text-red-500">{errors.id_barang}</div>}
            </label>
            <button type="submit" className="btn bg-green-500 text-white w-40 my-5" disabled={isSubmitting || isPending}>
                {isSubmitting || isPending ? 'Kirim...' : 'Kirim'}
            </button>
        </form>
    );
}

export default PurchaseRequestForm;
