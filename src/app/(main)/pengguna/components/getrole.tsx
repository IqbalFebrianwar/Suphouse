import React from "react"

interface SelectRoleProps {
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    error?: string
}

const SelectRole: React.FC<SelectRoleProps> = ({ name, value, onChange, error }) => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Role</span>
            </div>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="select select-bordered w-full max-w-xs"
            >
                <option disabled value="">
                    role
                </option>
                <option value="admin">admin</option>
                <option value="supplier">supplier</option>
                <option value="purchasing">purchasing</option>
                <option value="warehouse">warehouse</option>
            </select>
            {error && <div className="text-red-500">{error}</div>}
        </label>
    )
}

export default SelectRole
