'use client';

import { useEffect, useState } from 'react';
import { getPurchaseRequests } from '../action';

interface PurchaseRequest {
    id: string;
    noPembelian: string;
    createAt: Date;
    status: string;
}

const Table = () => {
    const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>([]);

    useEffect(() => {
        const fetchPurchaseRequests = async () => {
            try {
                const data = await getPurchaseRequests();
                setPurchaseRequests(data);
            } catch (error) {
                console.error('Failed to fetch purchase requests:', error);
            }
        };

        fetchPurchaseRequests();
    }, []);

    return (
        <div className="overflow-x-auto my-5">
            <table className="table">
                <thead>
                    <tr className="text-black">
                        <th>No Pembelian</th>
                        <th>Tanggal</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {purchaseRequests.map((request) => (
                        <tr key={request.id}>
                            <th>{request.noPembelian}</th>
                            <td>{new Date(request.createAt).toLocaleDateString()}</td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
