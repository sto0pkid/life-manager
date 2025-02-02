import React, { useState } from 'react';

import {
    useGetHobbiesQuery,
    useAddHobbyMutation,
    useRemoveHobbyMutation
} from './hobbiesAPI'


const Hobbies: React.FC = () => {
    const { data : hobbies } = useGetHobbiesQuery()

    const [ addHobby ] = useAddHobbyMutation()
    const [ removeHobby ] = useRemoveHobbyMutation()
    
    const [newHobby, setNewHobby] = useState<string>('');

    const handleAddHobby = () => {
        newHobby.trim()
        addHobby({id: '', name: newHobby})
    };

    const handleRemoveHobby = (hobbyToRemove: string) => {
        removeHobby(hobbyToRemove)
    };

    const formHobbies = hobbies ?? {}

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
                {
                    Object.keys(formHobbies).map(id => {
                        const hobby = formHobbies[id]

                        return (
                            <li key={id}>
                                {hobby.name}
                                <button onClick={() => handleRemoveHobby(id)}>Remove</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default Hobbies;