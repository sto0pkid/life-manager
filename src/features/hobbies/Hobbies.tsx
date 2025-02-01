import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { addHobby, removeHobby } from './hobbiesSlice'

const Hobbies: React.FC = () => {
    const dispatch = useDispatch();

    //const [hobbies, setHobbies] = useState<string[]>([]);
    const hobbies = useSelector((state : RootState) => state.hobbies)
    const [newHobby, setNewHobby] = useState<string>('');

    const handleAddHobby = () => {
        newHobby.trim()
        dispatch(addHobby(newHobby))
    };

    const handleRemoveHobby = (hobbyToRemove: string) => {
        dispatch(removeHobby(hobbyToRemove))
    };

    return (
        <div>
            <h2>Manage Your Hobbies</h2>
            <input
                type="text"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                placeholder="Add a new hobby"
            />
            <button onClick={handleAddHobby}>Add Hobby</button>
            <ul>
                {hobbies.map((hobby, index) => (
                    <li key={index}>
                        {hobby}
                        <button onClick={() => handleRemoveHobby(hobby)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Hobbies;