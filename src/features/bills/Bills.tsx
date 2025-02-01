import React, { useState } from 'react';
import {
    useGetAllBillsQuery,
    useAddBillMutation,
    useRemoveBillMutation
} from './billsAPI';
import { uuidv4 } from '../../uuid';


const Bills: React.FC = () => {

    const { data: bills } = useGetAllBillsQuery()
    const [ addBill ] = useAddBillMutation()
    
    const [ removeBill ] = useRemoveBillMutation()

    const [newBill, setNewBill] = useState({ name: '', amount: 0, dueDate: '' });

    const handleAddBill = () => {
        const bill = { id: uuidv4(), ...newBill };
        addBill(bill)
    };

    const handleRemoveBill = (id : string) => {
        removeBill(id)
    }

    return (
        <div>
            <h2>Bill Management</h2>
            <input
                type="text"
                placeholder="Bill Name"
                value={newBill.name}
                onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Amount"
                value={newBill.amount}
                onChange={(e) => setNewBill({ ...newBill, amount: Number(e.target.value) })}
            />
            <input
                type="date"
                value={newBill.dueDate}
                onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
            />
            <button onClick={handleAddBill}>Add Bill</button>

            <ul>
                {
                    typeof bills !== 'undefined'
                    ? (
                        Object.keys(bills).map(key => {
                            const bill = bills[key]
                            return (
                                <li key={key}>
                                    {bill.name} - ${bill.amount} (Due: {bill.dueDate})
                                    <button
                                        onClick={() => {handleRemoveBill(bill.id)}}
                                    >Remove</button>
                                </li>
                            )
                        })
                    ) : (
                        <p> No bills found! Congrats!</p>
                    )
                }
            </ul>
        </div>
    );
};

export default Bills;