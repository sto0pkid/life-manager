import React, { useState } from 'react';
import {
    useGetAllRevenuesQuery,
    useAddRevenueMutation,
    useRemoveRevenueMutation
} from './revenuesAPI'
import { Revenue } from './revenueTypes'
import { uuidv4 } from '../../uuid';

const Revenues: React.FC = () => {

    const { data: revenues } = useGetAllRevenuesQuery()
    const [addRevenue] = useAddRevenueMutation();
    const [removeRevenue] = useRemoveRevenueMutation();


    const [newRevenue, setNewRevenue] = useState({ name: '', amount: 0, date: '' } as Revenue);

    const handleAddRevenue = () => {
        const revenue = { ...newRevenue, id: uuidv4() };
        addRevenue(revenue)
    };

    const handleRemoveRevenue = (id : string) => {
        removeRevenue(id)
    }

    const formRevenues = revenues ? Object.keys(revenues).map(key => revenues[key]) : []

    const totalRevenue = formRevenues.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div>
            <table className="table">
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th></th>
                </tr>
                <tr>
                    <td>
                        <input
                            className="input input-bordered"
                            type="text"
                            placeholder="Name"
                            value={newRevenue.name}
                            onChange={(e) => setNewRevenue({ ...newRevenue, name: e.target.value })}
                        />
                    </td>
                    <td>
                        <input
                            className="input input-bordered"
                            type="number"
                            placeholder="Amount"
                            value={newRevenue.amount}
                            onChange={(e) => setNewRevenue({ ...newRevenue, amount: Number(e.target.value) })}
                        />
                    </td>
                    <td>
                        <input
                            className="input input-bordered"
                            type="date"
                            value={newRevenue.date}
                            onChange={(e) => setNewRevenue({ ...newRevenue, date: e.target.value })}
                        />
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick={handleAddRevenue}>Add Revenue</button>
                    </td>
                </tr>
                {formRevenues.map((revenue, index) => (
                    <tr key={index}>
                        <td>{revenue.name}</td>
                        <td>{revenue.amount}</td>
                        <td>{revenue.date}</td>
                        <td>
                            <button
                                className="btn btn-secondary"
                                onClick={() => handleRemoveRevenue(revenue.id)}
                            >
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <th>
                        Total
                    </th>
                    <th>
                        {totalRevenue}
                    </th>
                </tr>
            </table>
        </div>
    );
};

export default Revenues;