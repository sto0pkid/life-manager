import React, { useState } from 'react';
import { addActivity, Activity } from './fitnessSlice'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';

const Fitness: React.FC = () => {
    //const [activities, setActivities] = useState<string[]>([]);
    const { activities } = useSelector((state: RootState) => state.fitness);
    const dispatch = useDispatch();
    const [newActivity, setNewActivity] = useState({ name: '' });


    const handleAddActivity = () => {
        if (newActivity) {
            dispatch(addActivity(newActivity));
        }
    };

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
                {activities.map((act : Activity, index : number) => (
                    <li key={index}>{act.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Fitness;