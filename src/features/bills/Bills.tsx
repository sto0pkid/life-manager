import React, { useState } from 'react';
import {
    useGetAllBillsQuery,
    useAddBillMutation,
    useRemoveBillMutation
} from './billsAPI';


const Bills: React.FC = () => {
    const { data : bills } = useGetAllBillsQuery()

    const [ addBill ] = useAddBillMutation()
    const [ removeBill ] = useRemoveBillMutation()

    const [newBill, setNewBill] = useState({ name: '', amount: 0, dueDate: '' });

    const handleAddBill = () => {
        const bill = { id: '', ...newBill };
        addBill(bill)
    };

    const handleRemoveBill = (id : string) => {
        removeBill(id)
    }



    return (
        <div>
            <table className="table">
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th></th>
            </tr>
                <tr>
                    <td>
                        <input
                            className="input input-bordered"
                            type="text"
                            placeholder="Bill Name"
                            value={newBill.name}
                            onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
                        />
                    </td>
                    <td>
                        <input
                            className="input input-bordered"
                            type="number"
                            placeholder="Amount"
                            value={newBill.amount}
                            onChange={(e) => setNewBill({ ...newBill, amount: Number(e.target.value) })}
                        />
                    </td>
                    <td>
                        <input
                            className="input input-bordered"
                            type="date"
                            value={newBill.dueDate}
                            onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
                        />
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick={handleAddBill}>Add Bill</button>
                    </td>
                </tr>
                {
                    typeof bills !== 'undefined'
                    ? (
                        <>
                            {
                                Object.keys(bills).map(key => {
                                    const bill = bills[key]
                                    return (

                                        <tr key={key} className="border border-gray-200">
                                            <td>
                                                {bill.name}
                                            </td>
                                            <td>
                                                {bill.amount}
                                            </td>
                                            <td>
                                                {bill.dueDate}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => {handleRemoveBill(bill.id)}}
                                                >Remove</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <th>Total</th>
                                <th>
                                    {
                                        Object.keys(bills).reduce(
                                            (acc, cur) => acc + bills[cur].amount,
                                            0
                                        )
                                    }
                                </th>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td colSpan={4} rowSpan={4}>
                                No bills yet, congrats!
                            </td>
                        </tr>
                    )
                }
            </table>
        </div>
    );
};

export default Bills;