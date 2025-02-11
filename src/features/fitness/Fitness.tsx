import React, { useState } from 'react';
import { 
    useGetActivitiesQuery,
    useAddActivityMutation,
    useRemoveActivityMutation
} from './fitnessAPI'

const Fitness: React.FC = () => {
    const { data : activities} = useGetActivitiesQuery()

    const [ addActivity ] = useAddActivityMutation()
    const [ removeActivity ] = useRemoveActivityMutation()

    const [newActivity, setNewActivity] = useState({ name: '' });


    const handleAddActivity = () => {
        addActivity(newActivity)
    };

    const handleRemoveActivity = (id : string) => {
        removeActivity(id)
    }

    const formActivities = activities ?? {}

    return (
        <div>
            
            <table className="table">
                <tr>
                    <th>Activity Name</th>
                    <th></th>
                </tr>
                <tr>
                    <td>
                        <input
                            className="input input-bordered"
                            type="text"
                            value={newActivity.name}
                            onChange={(e) => setNewActivity({name: e.target.value})}
                            placeholder="Add a new activity"
                        />
                    </td>
                    <td>
                        <button
                            className="btn btn-primary"
                            onClick={handleAddActivity}
                        >
                            Add Activity
                        </button>
                    </td>
                </tr>
                {
                    Object.keys(formActivities).map(id => {
                        const activity = formActivities[id]
                        return (
                            <tr className="border-gray-500" key={id}>
                                <td>
                                    {activity.name}
                                </td>
                                <td>
                                    <button className="btn btn-secondary" onClick={() => handleRemoveActivity(id)}>Remove</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    );
};

export default Fitness;