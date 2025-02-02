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
            <h2>Fitness Activities</h2>
            <input
                type="text"
                value={newActivity.name}
                onChange={(e) => setNewActivity({name: e.target.value})}
                placeholder="Add a new activity"
            /> 
            <button onClick={handleAddActivity}>Add Activity</button>
            <ul>
                {
                    Object.keys(formActivities).map(id => {
                        const activity = formActivities[id]
                        return (
                            <li key={id}>
                                {activity.name}
                                <button onClick={() => handleRemoveActivity(id)}>Remove</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default Fitness;