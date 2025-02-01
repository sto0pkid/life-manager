import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRevenue, removeRevenue } from './revenuesSlice';
import { RootState } from '../../store'; // Import your Redux store's root state type

const Revenues: React.FC = () => {
    const {revenues} = useSelector((state : RootState) => state.revenues)
    const dispatch = useDispatch()

    const [newRevenue, setNewRevenue] = useState({ name: '', amount: 0, date: '' });

    const handleAddRevenue = () => {
        const revenue = { id: Date.now(), ...newRevenue };
        dispatch(addRevenue(revenue));
    };



    const totalRevenue = revenues.reduce((acc, curr) => acc + curr.amount, 0);

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
                {revenues.map((revenue, index) => (
                    <li key={index}>
                        {revenue.name} - ${revenue.amount} (On: {revenue.date})
                        <button onClick={() => dispatch(removeRevenue(revenue.id))}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Revenues;