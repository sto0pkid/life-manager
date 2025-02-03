import React, { useState } from 'react';

import { Button } from '../../components/ui/button'

import {
    useGetBudgetQuery,
    useSetBudgetMutation
} from './budgetAPI'

const Budget: React.FC = () => {
    const { data: budget } = useGetBudgetQuery();

    const [ setBudget ] = useSetBudgetMutation();

    const [formIncome, setFormIncome] = useState(budget?.income || 0);
    const [formExpenses, setFormExpenses] = useState(budget?.expenses || 0);

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormIncome(Number(e.target.value));
    };

    const handleExpensesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormExpenses(Number(e.target.value));
    };

    const handleSave = () => {
        setBudget({ income: formIncome, expenses: formExpenses })
    };

    return (
        <div>
            <div>
                <label>
                    Income:
                    <input type="number" value={formIncome} onChange={handleIncomeChange} />
                </label>
            </div>
            <div>
                <label>
                    Expenses:
                    <input type="number" value={formExpenses} onChange={handleExpensesChange} />
                </label>
            </div>
            <div>
                <Button onClick={handleSave}>Save Budget</Button>
            </div>
            <h3>Savings: {formIncome - formExpenses}</h3>
        </div>
    );
};

export default Budget;