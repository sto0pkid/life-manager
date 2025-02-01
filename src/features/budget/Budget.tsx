import React, { useState } from 'react';

import { useSelector, useDispatch} from 'react-redux'
import { setIncome, setExpenses } from './budgetSlice'
import { RootState } from '../../store'; // Import your Redux store's root state type



const Budget: React.FC = () => {
    const {income, expenses} = useSelector((state : RootState) => state.budget)
    const dispatch = useDispatch()
    //const [income, setIncome] = useState<number>(0);
    //const [expenses, setExpenses] = useState<number>(0);
    const [savings, setSavings] = useState<number>(0);

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setIncome(Number(e.target.value)));
    };

    const handleExpensesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setExpenses(Number(e.target.value)));
    };

    const calculateSavings = () => {
        setSavings(income - expenses);
    };

    return (
        <div>
            <h2>Budget Management</h2>
            <div>
                <label>
                    Income:
                    <input type="number" value={income} onChange={handleIncomeChange} />
                </label>
            </div>
            <div>
                <label>
                    Expenses:
                    <input type="number" value={expenses} onChange={handleExpensesChange} />
                </label>
            </div>
            <button onClick={calculateSavings}>Calculate Savings</button>
            <h3>Savings: {savings}</h3>
        </div>
    );
};

export default Budget;