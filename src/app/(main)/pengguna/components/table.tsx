"use client"

import { useState, useEffect } from "react"
import { fetchUsers } from "../action" // Import the fetchUsers function
import { Role } from "@prisma/client" // Import Role if needed

interface User {
    id: string
    username: string
    alamat: string | null
    role: Role
}

const Table = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userData: User[] = await fetchUsers()
                setUsers(userData)
            } catch (error) {
                console.error("Error loading users:", error)
            }
        }

        loadUsers()
    }, [])

    return (
        <div className="overflow-x-auto my-5">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="text-black">
                        <th>Username</th>
                        <th>Alamat</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.alamat}</td>
                            <td>{user.role}</td>
                            <td>
                                <div className="space-x-2">
                                    <button className="btn bg-green-500 text-white">Edit</button>
                                    <button className="btn bg-red-700 text-white">Hapus</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
