import React from 'react';
import { Link } from 'react-router'

import { useGetAllRevenuesQuery } from '../revenues/revenuesAPI';
import { useGetAllBillsQuery } from '../bills/billsAPI';

const Budget: React.FC = () => {
    const { data : revenues } = useGetAllRevenuesQuery()
    const { data : bills } = useGetAllBillsQuery()

    const formIncome = (
        revenues
        ? Object.keys(revenues).reduce((acc, cur) => acc + revenues[cur].amount, 0)
        : undefined
    )

    const formExpenses = (
        bills
        ? Object.keys(bills).reduce((acc, cur) => acc + bills[cur].amount, 0)
        : undefined
    )

    const formSavings = (
        typeof formIncome !== 'undefined' && typeof formExpenses !== 'undefined'
        ? formIncome - formExpenses
        : undefined
    )

    const savingsClassNames = (
        typeof formSavings !== 'undefined'
        ? (
            formSavings > 0
            ? (
                "text-green"
            ) : (
                formSavings < 0
                ? (
                    "text-red"
                ) : ""
            )
        ) : ""
    )

    return (
        <div>
            <table className="table">
                <tbody>
                    <tr>
                        <td><Link to='/revenues'>Income</Link></td>
                        <td>{formIncome}</td>
                    </tr>
                    <tr>
                        <td><Link to='/bills'>Expenses</Link></td>
                        <td>{formExpenses}</td>
                    </tr>
                    <tr>
                        <td>Savings</td>
                        <td><span className={savingsClassNames}>{formSavings}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Budget;