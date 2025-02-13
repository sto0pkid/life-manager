import React from 'react';
import { useFetchGoalsQuery } from './api';

const Planning: React.FC = () => {
    const { data : goals } = useFetchGoalsQuery()

    return (
        <div>
            {
                goals
                ? (
                    <table className="table">
                        <thead>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Complete By</th>
                            <th>Depends On</th>
                        </thead>
                        <tbody>
                            {
                                Object.keys(goals).map(goalId => {
                                    const goal = goals[goalId]
                                    return (
                                        <tr key={goalId}>
                                            <td>{goal.name}</td>
                                            <td>{goal.description}</td>
                                            <td>{goal.completeBy}</td>
                                            <td>
                                                <ul>
                                                    {
                                                        goal.dependsOn.map(dependency => {
                                                            return (
                                                                <li key={dependency.id}>
                                                                    {dependency.name}
                                                                    <button className="btn btn-secondary">Remove</button>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </td>
                                            <td>
                                                <button className="btn btn-secondary">Delete Goal</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) : (
                    <span className="loading loading-spinner loading-md"></span>
                )
            }
        </div>
    );
};

export default Planning;