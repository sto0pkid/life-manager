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
        //dispatch(addRevenue(revenue));
    };

    const handleRemoveRevenue = (id : string) => {
        removeRevenue(id)
    }

    const formRevenues = revenues ? Object.keys(revenues).map(key => revenues[key]) : []

    const totalRevenue = formRevenues.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div>
            <h2>Revenues</h2>
            <input
                type="text"
                placeholder="Name"
                value={newRevenue.name}
                onChange={(e) => setNewRevenue({ ...newRevenue, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Amount"
                value={newRevenue.amount}
                onChange={(e) => setNewRevenue({ ...newRevenue, amount: Number(e.target.value) })}
            />
            <input
                type="date"
                value={newRevenue.date}
                onChange={(e) => setNewRevenue({ ...newRevenue, date: e.target.value })}
            />
            <button onClick={handleAddRevenue}>Add Revenue</button>
            <h3>Total Revenue: ${totalRevenue}</h3>
            <ul>
                {formRevenues.map((revenue, index) => (
                    <li key={index}>
                        {revenue.name} - ${revenue.amount} (On: {revenue.date})
                        <button onClick={() => handleRemoveRevenue(revenue.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Revenues;