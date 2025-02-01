import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setHealthMetrics } from './healthSlice';
import { RootState } from '../../store'; // Import your Redux store's root state type

const Health: React.FC = () => {
    const healthMetrics = useSelector((state: RootState) => state.health);
    const dispatch = useDispatch();

    const [newHealthMetrics, setNewHealthMetrics] = useState({
        weight: 0,
        height: 0,
        bloodPressure: '',
        heartRate: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewHealthMetrics({ ...newHealthMetrics, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Dispatch the action to save health metrics
        dispatch(setHealthMetrics(newHealthMetrics));
    }

    return (
        <div>
            <h2>Health Tracker</h2>
            <div style={{display:"flex",flexDirection:"row"}}>
                <div>
                    <h3>Current Health Metrics</h3>
                    <p>Weight: {healthMetrics.weight} kg</p>
                    <p>Height: {healthMetrics.height} cm</p>
                    <p>Blood Pressure: {healthMetrics.bloodPressure}</p>
                    <p>Heart Rate: {healthMetrics.heartRate} bpm</p>
                </div>
                <form>
                    <h3>New Health Metrics</h3>
                    <div>
                        <label>
                            Weight (kg):
                            <input
                                type="number"
                                name="weight"
                                value={newHealthMetrics.weight}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Height (cm):
                            <input
                                type="number"
                                name="height"
                                value={newHealthMetrics.height}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Blood Pressure:
                            <input
                                type="text"
                                name="bloodPressure"
                                value={newHealthMetrics.bloodPressure}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Heart Rate (bpm):
                            <input
                                type="number"
                                name="heartRate"
                                value={newHealthMetrics.heartRate}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit" onClick={handleSubmit}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default Health;